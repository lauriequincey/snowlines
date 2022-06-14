/* Info
 * Resolve snow extent using the study algorithm (Landsat) vs MOD10a1 product.
 * Collects all 'cloudfree' Landsat 4-9 images EVER from within the transect OR specified WRS path-rows (https://landsat.usgs.gov/landsat_acq#convertPathRow)...
 * ...pairs them with MODIS imagery for the same time...
 * ...and calculates percentage snow cover within the landsat footprint for both this study algorithm and the MODIS product.
 * No inputs other than transect geometry from "transect.js" script.
 * Image filtering parameters can be changed in the "Imagery" section. E.g. images are filtered to cloud cover below 10%.
 */
 
/** Dependencies **/
var module_transect = require("users/lauriequincey/snowlines:transect.js");
 
/** Imagery **/
// Import and merge landsat collections, generalise bands, and filter.
var landsat_imagery = 
 ee.ImageCollection('LANDSAT/LT04/C02/T1_L2')
   .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'], 
           ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
   .merge(ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
            .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
                    ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
            .merge(ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
                     .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
                             ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
                     .merge(ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
                              .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
                                      ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
                              .merge(ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
                                       .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
                                               ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
                                    )
                           )
                  )
         )
 // Descending (daylight) path row tiles over the transect (https://landsat.usgs.gov/landsat_acq#convertPathRow) OR filter bounds to transect
 //.filter(ee.Filter.or(ee.Filter.eq('WRS_PATH', 199), ee.Filter.eq('WRS_PATH', 200), ee.Filter.eq('WRS_PATH', 201)))
 //.filter(ee.Filter.eq('WRS_ROW', 17))
 .filterBounds(module_transect.transect)
 // filter by sun elevation
 .filter(ee.Filter.gt('SUN_ELEVATION', 0))
 // No Clouds
 .filter(ee.Filter.lt('CLOUD_COVER', 10))
 // Only Dates which match that of MODIS Terra (2000-present)
 .filterDate(ee.Date('2000-02-24'), ee.Date('2022-01-01'));
 
// Filtering
// Import and filter MODIS to the Landsat dates and footprints.

// Get Date List for Landsat Image Collection
var landsat_dates = landsat_imagery.map(function(image) {
  return ee.Feature(null, {'date': image.date().format('YYYY-MM-dd')});
})
.distinct('date')
.aggregate_array('date');

// Get Footrpint Geometries for Landsat Image Collection
var landsat_geoms = landsat_imagery.map(function(image) {
  return ee.Feature(null, {'geometry': image.geometry().coordinates().flatten()});
})
.distinct('geometry')
.aggregate_array('geometry');

// Import and Filter MODIS
var MODIS_imagery = ee.ImageCollection("MODIS/006/MOD10A1")
  .filter(ee.Filter.inList("system:time_start", landsat_dates.map(function(date){return ee.Date(date).millis()})))
  .filterBounds(ee.Geometry.MultiPolygon(landsat_geoms));

// Filter Landsat by MODIS
// Get Date List for MODIS Collection
var MODIS_dates = MODIS_imagery.map(function(image) {
      return ee.Feature(null, {'date': image.date().format('YYYY-MM-dd')})})
      .distinct('date')
      .aggregate_array('date');

// Refilter Landsat Imagery
// Modis product is 'everywhere' so no need to filter for bounds, just time
var refiltered_landsat_imagery = landsat_imagery
  .filter(ee.Filter.inList("DATE_ACQUIRED", MODIS_dates));

/** Validation **/
var validation = ee.FeatureCollection(refiltered_landsat_imagery.map(function(image){
  
  // Recast function input
  image = ee.Image(image);
  
  /** LandsatFSC - Partial Study Algorithm **/
  // Land Surface Indices
  var indices = ee.List([
    
    // Snow (SWI)
    image.expression('((Green * (NIR - SWIR)) / ((Green + NIR) * (NIR + SWIR)))',
      {'Green': image.select('Green'),
      'NIR':   image.select('NIR'),
      'SWIR':  image.select('SWIR_1')}),
      
    // Vegetation (GVI)
    image.expression(' (-0.2848 * Blue) + (-0.2435 * Green) + (-0.5436 * Red) + (0.7243 * NIR) + (0.0840 * SWIR1) + (-0.1800 * SWIR2)',
      {'Blue': image.select('Blue'),
       'Green': image.select('Green'),
       'Red': image.select('Red'),
       'NIR': image.select('NIR'),
       'SWIR1': image.select('SWIR_1'),
       'SWIR2': image.select('SWIR_2')}),
      
    // Water (MNDWIinv)
    image.expression('1 / ((Green - SWIR) + (NIR - SWIR) / (Green + SWIR) + (NIR + SWIR))',
      {'Green': image.select('Green'),
       'NIR': image.select('NIR'),
       'SWIR': image.select('SWIR_1')}),
      
    // Rock (NDBI)
    image.expression('(SWIR - NIR) / (SWIR + NIR)',
      {'NIR': image.select('NIR'),
       'SWIR': image.select('SWIR_1')})
  ]);
  
  // Endmembers
  var endmembers = indices.map(function(index) {
    
    // Mask mosaic to...
    return image.updateMask(
      
      // ... the thresholded index...
      ee.Image(index).gt(
      
        // ... generated from the 95th percentile pixels of that index itself
        ee.Number(
          ee.Image(index).reduceRegion({
            reducer: ee.Reducer.percentile({percentiles: [95]}),
            geometry: image.geometry(),
            scale: 30,
            maxPixels: 1000000, // set to  value which is large enough to create accurate endmembers but not too large to make computation time too long.
            bestEffort: true
          })
        .values()
        .get(0)
        )
      )
    ).select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
     .reduceRegion({
       reducer: ee.Reducer.mean(),
       geometry: image.geometry(),
       scale: 30,
       bestEffort: true
     })
     .values();
  });
  
  // landsatFSC
  var landsatFSC = image
    
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
  
  /** MODIS FSC **/
  // Import
  var terraFSC = ee.ImageCollection("MODIS/006/MOD10A1")
    .filterDate(ee.Date(image.get('DATE_ACQUIRED')))
    .filterBounds(image.geometry())
    .select(['NDSI_Snow_Cover'], ['snow_extent'])
    .mosaic()
    .divide(100);
    
  /** Region Stats **/
  
  // Image footprint area
  var geometry_area = image.geometry().area({maxError: 1});
  
  // Stats Function
  function region_stats(fsc_image){
    
      // Per pixel area
      return ee.Number(fsc_image.clip(image.geometry()).multiply(ee.Image.pixelArea())
      
      // Snow cover area
        .reduceRegion({
          reducer: 'sum',
          geometry: image.geometry(),
          scale: 500
        }).get('snow_extent'))
        
      // Percentage
      .divide(geometry_area).multiply(100);
  }
  
  // Landsat Stats
  var landsat_snow_cover_percentage = region_stats(landsatFSC);

  // MODIS Stats
  var terra_snow_cover_percentage = region_stats(terraFSC);
  
  /** Output **/
  return ee.Feature(null, {
    'geometry_area': geometry_area.divide(1e6),
    'landsat_percentage_snow': landsat_snow_cover_percentage,
    'terra_percentage_snow': terra_snow_cover_percentage,
    'sun_elevation': image.get('SUN_ELEVATION'),
    'date': image.get('DATE_ACQUIRED')
  });
  
}));

/** Print **/
print("Image Pairs Count:", refiltered_landsat_imagery.size());
print("Image Pairs Successfullly Processed:", validation.size());

/** Export **/
Export.table.toDrive({
  collection: validation,
  description: "validation",
  folder: "validation",
  fileNamePrefix: "validation",
  fileFormat: "CSV"
});