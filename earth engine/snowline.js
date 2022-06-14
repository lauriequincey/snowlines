/* Info
 * Algorithm to resolve snowlines from Landsats 4-9.
 */

/** Dependencies **/
var module_transect = require("users/lauriequincey/snowlines:transect.js");

/** Transect Geometry **/
var transect = module_transect.transect;

/** Date Range **/
function get_date(start_date, advance_days) {
  
  return ee.DateRange(
    ee.Date(start_date),
    ee.Date(start_date).advance(advance_days, 'day')
  );

}
var date_range = get_date("2020-07-01", 16);

/** Import Imagery **/
// Generate dictionary of landsats which have uniform bandnames
var collections = ee.Dictionary([
  'Landsat_4', ee.ImageCollection('LANDSAT/LT04/C02/T1_L2')
    .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
            ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
  'Landsat_5', ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
    .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
            ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
  'Landsat_7', ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
    .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'], 
            ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
  'Landsat_8', ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
            ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
  'Landsat_9', ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
    .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
            ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
]);

/* Pick a Satellite
 * Info:  Match satellite date to the previously picked date range.
 *        There will always be two choices of satellite for any satellite post 1984.
 *        Dates:  Landsat 4: '1982-08-22', '1993-12-14'
 *                Landsat 5: '1984-01-01', '2012-05-05'
 *                Landsat 7: '1999-01-01', '2021-07-31'
 *                Landsat 8: '2013-04-11', '2021-08-14'
 */
var satellite_name = 'Landsat_8';

var imagery = ee.ImageCollection(collections.get(satellite_name))
  .filterBounds(transect)
  .filterDate(date_range);

/** Glacier and Water Masks **/

// Glacer Mask
var glacier_mask = ee.FeatureCollection("GLIMS/current")
  .filterBounds(transect)
  .select('area')
  
  // Rasterise
  .reduceToImage({
    properties: ['area'],
    reducer: ee.Reducer.mean()})
  .rename('glacier_mask')
  
  // Buffer area (after rasterisation is quicker)
  .focal_max({
    radius: 180,
    kernelType: 'square',
    units: 'meters', 
    iterations: 1
  })
  
  // Invert mask so non-glaciers are white
  .eq(1)
  .unmask(1);

// Water Mask
var water_mask = ee.Image("JRC/GSW1_3/GlobalSurfaceWater")
  .select(['max_extent'], ['Water_Mask'])
  .focal_max({
    radius: 100,
    kernelType: 'square',
    units: 'meters', 
    iterations: 1
  })
  
  // Invert mask so non-waters are white
  .eq(0);

/** Metrics **/
// Terrain Data
var altitude = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
  .filterBounds(transect)
  .select(['DSM'], ['altitude'])
  .mosaic()
  .reproject({
    crs: 'EPSG:4326',
    scale: 30
  }); // Reproject so the mosaic is uniform for the terrain calculations. Necessary, see: https://developers.google.com/earth-engine/guides/projections#reprojecting

// Imagery Translation Error
// "All L1TP Tier-1 products are expected to be consistent to within 12-m." https://www.usgs.gov/landsat-missions/landsat-levels-processing
// Written like this in case of future use with satellites with different errors.
var translation_error = ee.Number(ee.Dictionary([
  'Landsat_4', 12,
  'Landsat_5', 12,
  'Landsat_7', 12,
  'Landsat_8', 12,
  'Landsat_9', 12,
  ])
  // Select relevant error from dictionary
  .get(satellite_name));

// Generate Metrics Image
var metrics = 

  // Elevation
  altitude.addBands([
    
  // Altitudinal Base Error
  // +- 5m https://www.mdpi.com/2072-4292/13/22/4653/pdf. See: https://www.mdpi.com/2072-4292/13/22/4653/pdf for a good comparisons in error of some DEMs over the arctic.
  ee.Image.constant(5).rename('altitude_base_error'),
  
  // Altitudinal Translation Error
  // Trigonometry using slope of pixel and offset distance from satellite translation error
  ee.Terrain.slope(altitude)
    .multiply(Math.PI)
    .divide(180)
    .tan()
    .multiply(ee.Image.constant(translation_error))
    .rename('altitude_translation_error'),
  
  // Coordinates
  ee.Image.pixelLonLat()
    .rename(['longitude', 'latitude']),
    
  // Aspect
  ee.Terrain.aspect(altitude)
    .rename('aspect'),
    
  // Slope Angle
  ee.Terrain.slope(altitude)
  .rename('slope')
  ])
  
  // Convert to Double
  .double();
  
/** Endmembers **/

// Cloud and Cloud Shadows Mask
var imagery = imagery.map(function(image) {
  return image.addBands([
    
    // Add cloud and cloud shadow masks to each image
    ee.Image.constant(1).updateMask(
      // Cloud
      image.select('QA_PIXEL')
           .bitwiseAnd(1 << 3)
           .eq(0)
      .and(
      // Cloud Shadows
      image.select('QA_PIXEL')
           .bitwiseAnd(1 << 4)
           .eq(0)))
    .rename('cloud_mask').unmask(),
    
    // Add Unix Time bands to each image
    ee.Image.constant(ee.Date(image
      .get('DATE_ACQUIRED'))
      .millis()
      )
      .int64()
      .rename('aqcuisition_time')
  ]);
});

// Cloudless Mosaic
var quality_mosaic = imagery.qualityMosaic('cloud_mask');
var cloudless_mosaic = quality_mosaic.updateMask(quality_mosaic.select('cloud_mask'));

// Land Surface Indices
var indices = ee.List([
  
  // Snow (SWI)
  cloudless_mosaic.expression('((Green * (NIR - SWIR)) / ((Green + NIR) * (NIR + SWIR)))',
    {'Green': cloudless_mosaic.select('Green'),
    'NIR':    cloudless_mosaic.select('NIR'),
    'SWIR':   cloudless_mosaic.select('SWIR_1')}),
    
  // Vegetation (GVI)
  cloudless_mosaic.expression('(-0.2848 * Blue) + (-0.2435 * Green) + (-0.5436 * Red) + (0.7243 * NIR) + (0.0840 * SWIR1) + (-0.1800 * SWIR2)',
    {'Blue':  cloudless_mosaic.select('Blue'),
     'Green': cloudless_mosaic.select('Green'),
     'Red':   cloudless_mosaic.select('Red'),
     'NIR':   cloudless_mosaic.select('NIR'),
     'SWIR1': cloudless_mosaic.select('SWIR_1'),
     'SWIR2': cloudless_mosaic.select('SWIR_2')}),
    
  // Water (1 / MNDWI)
  cloudless_mosaic.expression('1 / ((Green - SWIR) + (NIR - SWIR) / (Green + SWIR) + (NIR + SWIR))',
    {'Green': cloudless_mosaic.select('Green'),
     'NIR':   cloudless_mosaic.select('NIR'),
     'SWIR':  cloudless_mosaic.select('SWIR_1')}),
    
  // Rock (NDBI)
  cloudless_mosaic.expression('(SWIR - NIR) / (SWIR + NIR)',
    {'NIR':  cloudless_mosaic.select('NIR'),
     'SWIR': cloudless_mosaic.select('SWIR_1')})
]);

// Endmembers
var endmembers = indices.map(function(index) {
  
  // Mask mosaic to...
  return cloudless_mosaic.updateMask(
    
    // ... the thresholded index...
    ee.Image(index).gt(
    
      // ... generated from the 95th percentile pixels of that index itself
      ee.Number(
        ee.Image(index).reduceRegion({
          reducer: ee.Reducer.percentile({percentiles: [95]}),
          geometry: transect,
          scale: 30,
          maxPixels: 1000000, // set to  value which is large enough to create accurate endmembers but not too large to make computation time too long.
          bestEffort: true
        })
      .values()
      .get(0)
      )
    )
  )
  
  // Find the mean values from within the 95th percentile for each band.
  .select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
  .reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: transect,
    scale: 30,
    bestEffort: true
  })
  .values();
});

/** Snow-edge **/
var snow_edge = imagery.map(function(image) {
  
  /** Snowcap **/
  var snowcap = image
  
    /** Linear Spectral Unmixing **/
    .select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
    .unmix({
      endmembers: endmembers,
      sumToOne: true,
      nonNegative: true
    })
    .rename('snow_component', 'vegetation_component', 'water_component', 'rock_component')
  
    /** Find 50% and above snow pixels **/
    .select(['snow_component'], ['snow_extent'])
    .gte(0.5);
    
  /** Snow-edge **/
  var snow_edge = snowcap
    .selfMask()
    .reduceNeighborhood({
      reducer: ee.Reducer.count(),
      kernel: ee.Kernel.plus({
        radius: 1,
        units: 'pixels'
      })
    })
    .lt(5)
    .rename('snow_edge')
    .selfMask()
    
    /** Mask **/
    .updateMask(
      
      /** Glacier **/
      glacier_mask
      
      /** Water **/
      .and(water_mask
      
      /** Rocky Outcrops **/
        .and(snowcap
        // Invert Snowcap mask
          .not()
          .selfMask()
          // Run Connected Components
          .connectedComponents({
            connectedness: ee.Kernel.square({
              radius: 1, // msut be 1 for edge detection
              units: 'pixels'
            }),
            maxSize: 150 // a nice size for each component
          })
          // Create Mask
          .select('labels') // select the components band
          .neq(0) // all the components
          .unmask() // unmask...
          .not() // ...and invert for masking
            
      /** Clouds **/
          .and(image.expression('((Green * (NIR - SWIR)) / ((Green + NIR) * (NIR + SWIR)))',
                               {'Green': image.select('Green'),
                                'NIR':   image.select('NIR'),
                                'SWIR':  image.select('SWIR_1')}
                                ).gt(0.21)
          )
        )
      )
    )
    
    /** Add Metrics **/
    .addBands([
      image.select("aqcuisition_time"), // Aqcuisition time of image
      metrics, // environmental image
      ee.Image(ee.Number(ee.Image(image).get('SUN_ELEVATION'))).rename(['sun_elevation']) // sun elevations
    ]);
  
  /** Vectorise **/
  // Vectorise the snow_edge image with metrics into a table of results (feature collection), a row per pixel
  return snow_edge.sampleRegions({
    collection: transect,
    scale: 30,
    tileScale: 4,
    geometries: true
  })
  // add transect distances to the results table
  .map(function(feature) {
    return feature.set(
      // Property Name
      'distance',
      // Property Values
      feature
        // Get geom
        .geometry()
        // find distance to start line created from transect coords
        .distance(ee.Geometry.LineString([module_transect.lt_coord, module_transect.lb_coord]))
        // put into km
        .divide(1000)
      );
  });
});

/** Visualise **/
Map.addLayer(imagery, {}, 'Raw Imagery', 0);
Map.addLayer(quality_mosaic, {}, 'Quality Mosaic', 1);
Map.addLayer(glacier_mask, {}, 'Glacier and Ice Cap Mask', 0);
Map.addLayer(water_mask, {}, 'Water Bodies Mask', 0);
Map.addLayer(snow_edge.flatten().draw({color: 'Red', pointRadius: 1, strokeWidth: 1}), {}, 'Snow-edge', 1);
print('no. snow-edges resolved (m): ', snow_edge.flatten().size());
Map.centerObject(transect);

/** Export **/
// Create client side dates
var start_date = date_range.start().format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
var end_date = date_range.end().format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
    
// Export
Export.table.toDrive({
  collection: snow_edge.flatten(),
  description: 'snowlines_' + satellite_name + '_Date_' + start_date + '_' + end_date,
  folder: ''+ date_range.start().get('year').getInfo(),
  fileNamePrefix: 'snowlines_' + satellite_name + '_Date_' + start_date + '_'  + end_date,
  fileFormat: 'CSV',
  selectors: ['aqcuisition_time', 'altitude', 'altitude', 'altitude_translation_error', 'longitude', 'latitude', 'aspect', 'slope','sun_elevation']
});

print('Download Link:',
      snow_edge.flatten().getDownloadURL({
        format: 'CSV',
        filename: 'snowlines_' + satellite_name + '_Date_' + start_date + '_'  + end_date,
        selectors: ['aqcuisition_time', 'altitude', 'altitude', 'altitude_translation_error', 'longitude', 'latitude', 'aspect', 'slope','sun_elevation']
      }));