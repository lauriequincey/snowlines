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
    // https://developers.google.com/earth-engine/guides/image_texture
    // Note: Why are there lots of little dots, that's not right! Zoom in and they go. It's a processig error from the way zoom and imagery processsing resolution are linked. The zoomed in version you see is the true product of the calculation, not the approximation when at low zoom levels.
    // a) Threshold and Morphological Filter
    //    How does this work? so the unmixing process produces the 50% and above snow pixels. This rarely picks the edges of clouds and dirty snow. (and if it does, its cos there is snow underneath!)
    //    These surfaces are hard to distinguish and so the threhsolding below just gets rid of the main center of clouds.
    //    An erosion-dilation morphological filter gets rid of small, miscalssifed non cloud bits (generally dirty snow pixels), then buffers the remaining actual cloud too inlcude its wispy edges
    var wavebandCloudMask = image.select('SWIR_1').gt(11000) // no snow
       .and(image.select('SWIR_2').gt(11000) // no snow
         .and(image.select('Blue').gt(15000) // no veg/ground
           .and(image.select('NIR').gt(19000) // no rocky ground
           )
         )
       ).rename('cloudMask')
       .focalMin({
         radius: 120,
         kernelType: 'circle',
         units: 'meters',
         iterations: 1
       })
       .focalMax({
         radius: 150,
         kernelType: 'circle',
         units: 'meters',
         iterations: 1
       });
      
      // b) gclm Texture and Morphological filter
      //    Works by finding the texture of the image and thresholding.
      //    SWIR texture pulls cloud and some high ground near the snow edge
      //    Red texture pulls cloud and snow but not any ground
      //    Therefore, when adding them together, cloud can be isolated.
      //    A dilation morphological filter buffers cloud too inlcude its wispy edges
      // var glcmSWIR = image.select('SWIR_1').glcmTexture({
      //   size: 4,
      // }).select(['SWIR_1_savg'], ['glcmMask']);
      // var glcmRed = image.select('Red').glcmTexture({
      //   size: 4,
      // }).select(['Red_savg'], ['glcmMask']);
      
      // var glcmCloudMask = glcmRed.add(glcmSWIR.multiply(3))
      // .gt(160000)
    var TirFilter = image.select('TIR');
    var Swir1Filter = image.select('SWIR_1');
    var glcmCloudMask = Swir1Filter.subtract(TirFilter.multiply(2))
      .unmask()
      .glcmTexture({
        size: 4,
      }).select(['SWIR_1_savg'], ['glcmMask'])
      .gt(-120000)
      // .focalMin({
      //   radius: 100,
      //   kernelType: 'circle',
      //   units: 'meters',
      //   iterations: 1
      // })
      .focalMax({
         radius: 180,
         kernelType: 'circle',
         units: 'meters',
         iterations: 1
       })
      .rename('snow_extent'); // For masking snowCap
      
    // Merge cloud masks
    var cloudMask = wavebandCloudMask.add(glcmCloudMask).gt(0);
    
    /** Shadow Mask **/
    // Also gets water but thats okay because it will get masked anyway
    // It's purpose is to mask out all shadows that overlap snow. Therefore, it can afford to be a little aggressive.
    var shadowMaskNIR = image.select('NIR').lt(20000);
    var shadowMaskSWIR1 = image.select('SWIR_1').lt(14000);
    var shadowMaskSWIR2 = image.select('SWIR_2').lt(10000);
    var shadowMaskRGB = image.select('Red').add(image.select('Green').add(image.select('Blue'))).lt(70000);
    var shadowMask = shadowMaskNIR.add(shadowMaskSWIR1).add(shadowMaskSWIR2).add(shadowMaskRGB)
      .eq(4)
      .focalMin({
        radius: 50,
        kernelType: 'circle',
        units: 'meters',
        iterations: 1
      })
      .focalMax({
        radius: 150,
        kernelType: 'circle',
        units: 'meters',
        iterations: 1
      })
      .rename('shadowMask');
    
    /** Combine Cloud and Cloud Shadows Masks **/
    var cloudAndCloudShadowMask = shadowMask.not().add(cloudMask.not().selfMask().add(1).unmask()).rename('qualityBand'); // ??? Makes it heirarchical so that ground is preferred over shadows which are preferred over clouds.
    
    /** Unix Time **/
    var time = ee.Image.constant(ee.Date(image.get('DATE_ACQUIRED')).millis())
      .int64()
      .rename('aqcuisition_time');
    
    /** Add Bands **/
    return image.addBands([cloudMask, shadowMask, cloudAndCloudShadowMask, time]);
  });
  
  // Cloudless Mosaic
  var qualityMosaic = imageCollection.qualityMosaic('qualityBand');
  var cloudlessMosaic = qualityMosaic.updateMask(qualityMosaic.select('qualityBand'));
  
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
      
    // Water (1 / MNDWI)
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
      .updateMask(image.select('cloudMask').not())
      .updateMask(image.select('shadowMask').not())
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
    snowEdgeVector: snowEdgeVector
  };
  
};