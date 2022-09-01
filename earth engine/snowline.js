/* Info
 * The snowlines algorithm.
 * Retreives snow edges and their altitudes and distances along the transect as a vector.
 * Also returns as it as a raster and the glaciers/ice caps, waterbodies, input imagery, and composite too. This is mainly for display purposes and troubleshooting.
 * Created by Laurie Quincey, 2022.
 */

exports.snowlinesAlgorithm = function(transect, imageCollection, ltCoord, lbCoord) {
  
  /** Glacier and Water Masks **/ 
  // Glacer Mask
  var glacierMask = ee.FeatureCollection("GLIMS/current")
    .filter(ee.Filter.eq('line_type', 'glac_bound'))
    .filterBounds(transect) // Filter
    .reduceToImage({ // Rasterise
      properties: ['area'],
      reducer: ee.Reducer.mean()
    })
    .focal_max({ // Buffer
      radius: 180,
      kernelType: 'square',
      units: 'meters', 
      iterations: 1
    })
    .rename('glacierMask')
    .eq(1) // Invert mask
    .unmask(1);
  
  // Water Mask
  var waterMask = ee.Image("JRC/GSW1_3/GlobalSurfaceWater")
    .select(['max_extent'], ['waterMask'])
    .focal_max({ // Buffer
      radius: 100,
      kernelType: 'square',
      units: 'meters', 
      iterations: 1
    })
    .eq(0); // Invert mask
  
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
  var translationError = 12;
  
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
      .multiply(ee.Image.constant(translationError))
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
    
    ]).double();
  
  /** Endmembers **/
  // Add Cloud and Cloud Shadows Mask
  imageCollection = imageCollection.map(function(image) {
    
    /** Mask Image to Where there are Nulls in the TIR band **/
    image = image.updateMask(image.select('TIR').reduce(ee.Reducer.count()));
    
    /** Cloud Masking **/
    var bandMath = image.expression(
      '(SWIR2 - TIR) / (SWIR2 + TIR)',
      {'SWIR2': image.select('SWIR_2'),
       'TIR':  image.select('TIR')});
    var glcm = bandMath.unitScale(-1, 1).multiply(255).toInt32().glcmTexture({size: 4}).select('SWIR_2_savg');
    var cloudMask = glcm.gt(140)
      .focalMax({
        radius: 180,
        kernelType: 'circle',
        units: 'meters',
        iterations: 1
      })
      .not()
      .rename('cloudMask');
    
    /** Unix Time **/
    var time = ee.Image.constant(ee.Date(image.get('DATE_ACQUIRED')).millis())
      .int64()
      .rename('aqcuisition_time');
    
    /** Add Bands **/
    return image.addBands([cloudMask, time]);
  });
  
  // Cloudless Mosaic
  var qualityMosaic = imageCollection.qualityMosaic('cloudMask');
  var cloudlessMosaic = qualityMosaic.updateMask(qualityMosaic.select('cloudMask'));
  
  // Land Surface Indices
  var indices = ee.List([
    
    // Snow (SWI)
    cloudlessMosaic.expression('((Green * (NIR - SWIR)) / ((Green + NIR) * (NIR + SWIR)))',
      {'Green': cloudlessMosaic.select('Green'),
      'NIR':    cloudlessMosaic.select('NIR'),
      'SWIR':   cloudlessMosaic.select('SWIR_1')}),
      
    // Vegetation (GVI)
    cloudlessMosaic.expression('(-0.2848 * Blue) + (-0.2435 * Green) + (-0.5436 * Red) + (0.7243 * NIR) + (0.0840 * SWIR1) + (-0.1800 * SWIR2)',
      {'Blue':  cloudlessMosaic.select('Blue'),
       'Green': cloudlessMosaic.select('Green'),
       'Red':   cloudlessMosaic.select('Red'),
       'NIR':   cloudlessMosaic.select('NIR'),
       'SWIR1': cloudlessMosaic.select('SWIR_1'),
       'SWIR2': cloudlessMosaic.select('SWIR_2')}),
      
    // Water (1 / MNDWI [Xu & Gao Combined])
    cloudlessMosaic.expression('1 / ((Green - SWIR) + (NIR - SWIR) / (Green + SWIR) + (NIR + SWIR))',
      {'Green': cloudlessMosaic.select('Green'),
       'NIR':   cloudlessMosaic.select('NIR'),
       'SWIR':  cloudlessMosaic.select('SWIR_1')}),
      
    // Rock (NDBI)
    cloudlessMosaic.expression('(SWIR - NIR) / (SWIR + NIR)',
      {'NIR':  cloudlessMosaic.select('NIR'),
       'SWIR': cloudlessMosaic.select('SWIR_1')})
  ]);
  
  // Endmembers
  var endmembers = indices.map(function(index) {
    
    // Mask mosaic to...
    return cloudlessMosaic.updateMask(
      
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
  
  /** Snow Cap, Snow Edge, Masking, and Metrics **/ 
  var snowEdgeRaster = imageCollection.map(function(image) {
    
    /** SnowCap **/
    var snowCap = image
      .select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
      .unmix({ // Linear Spectral Unmixing
        endmembers: endmembers,
        sumToOne: true,
        nonNegative: true
      })
      .rename('snowComponent', 'vegetationComponent', 'waterComponent', 'rockComponent')
      .select(['snowComponent'], ['snow_extent'])
      .gte(0.5); // Find 50% and above snow pixels
    
    // Fill in SnowCap internal Holes
    var rockyOutcrops = snowCap
      .not().selfMask() // Invert Snowcap mask
      .connectedComponents({
        connectedness: ee.Kernel.square({
        radius: 1, // msut be 1 for edge detection
        units: 'pixels'
        }),
      maxSize: 150 // a nice size for each component that doesnt slow things down
      })
      .select(['labels'], ['snow_extent']) // select the components band and rename so it can be added to the snowCap mask
      .neq(0)
      .unmask(); // get all the components
    
    snowCap = snowCap.add(rockyOutcrops);
    
    /** Mask SnowCap **/
    var maskedSnowCap = snowCap
      .updateMask(image.select('cloudMask'))
      .updateMask(glacierMask)
      .updateMask(waterMask);
    
    /** Edge Detection and Add Metrics **/
    return maskedSnowCap
       .reduceNeighborhood({
         reducer: ee.Reducer.countDistinctNonNull(),
         kernel: ee.Kernel.plus({
           radius: 1,
           units: 'pixels'
         })
       })
       .eq(2)
       .rename('snow_edge')
       .selfMask()
       .addBands([
         image.select("aqcuisition_time"), // Aqcuisition time of image
         metrics, // environmental image
         ee.Image(ee.Number(ee.Image(image).get('SUN_ELEVATION'))).rename(['sun_elevation']) // sun elevations
       ]);
    
  });
  
  // /** Vectorise **/
  var snowEdgeVector = snowEdgeRaster.map(function(edge) {
    
    // Vectorise the snow_edge image with metrics into a table of results (feature collection), a row per pixel
    return edge.sampleRegions({
      collection: transect,
      scale: 30,
      tileScale: 4,
      geometries: true
    })
    // add transect distances to the results table
    .map(function(feature) {
      return feature.set(
        'distance', 
        feature
          .geometry() // Get geom
          .distance(ee.Geometry.LineString([ltCoord.coordinates(), lbCoord.coordinates()])) // find distance to start line created from transect coords
          .divide(1000) // put into km
      );
    });
  }).flatten();
  
  /** Return Dictionary **/
  // Remove Null Rows in SnowEdgeVector
  snowEdgeVector = snowEdgeVector.filter(ee.Filter.notNull(ee.Feature(snowEdgeVector.first()).propertyNames()));
  return {
    imageCollection: imageCollection,
    glacierMask: glacierMask,
    waterMask: waterMask,
    qualityMosaic: qualityMosaic,
    snowEdgeRaster: snowEdgeRaster,
    snowEdgeVector: snowEdgeVector.select("[^snow_edge].*")
  };
  
};