/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[6.3148777592775795, 61.86475486581893],
          [6.3148777592775795, 61.34756046804393],
          [7.3970310795900795, 61.34756046804393],
          [7.3970310795900795, 61.86475486581893]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/** Input Collections **/
var sun_elevation_limit = 0;
var l8_collection_dsc = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  // Descending (daylight) path row tiles over the transect (https://landsat.usgs.gov/landsat_acq#convertPathRow)
  .filter(ee.Filter.or(ee.Filter.eq('WRS_PATH', 199), ee.Filter.eq('WRS_PATH', 200), ee.Filter.eq('WRS_PATH', 201)))
  .filter(ee.Filter.eq('WRS_ROW', 17))
  // Only sun elevations above 45 dgerees so that the terrain is illuminated, essentially the summer months in Norway. This algorithm has degraded performance in low sun angles!
  .filter(ee.Filter.gt('SUN_ELEVATION', sun_elevation_limit))
  // No Clouds
  .filter(ee.Filter.lt('CLOUD_COVER', 10))
  // Only Dates which match that of MODIS Terra (2000-present)
  .filterDate(ee.Date('2000-02-24'), ee.Date('2022-01-01'))
  // Sort By Time
  .sort('system:time_start', true)
  // Rename Bands for Algorithm
  .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
          ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']);

var l7_collection_dsc = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
  .filter(ee.Filter.or(ee.Filter.eq('WRS_PATH', 199), ee.Filter.eq('WRS_PATH', 200), ee.Filter.eq('WRS_PATH', 201)))
  .filter(ee.Filter.eq('WRS_ROW', 17))
  .filter(ee.Filter.gt('SUN_ELEVATION', sun_elevation_limit))
  .filter(ee.Filter.lt('CLOUD_COVER', 10))
  .filterDate(ee.Date('2000-02-24'), ee.Date('2022-01-01'))
  .sort('system:time_start', true)
   .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
           ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']);

var l5_collection_dsc = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
  .filter(ee.Filter.or(ee.Filter.eq('WRS_PATH', 199), ee.Filter.eq('WRS_PATH', 200), ee.Filter.eq('WRS_PATH', 201)))
  .filter(ee.Filter.eq('WRS_ROW', 17))
  .filter(ee.Filter.gt('SUN_ELEVATION', sun_elevation_limit))
  .filter(ee.Filter.lt('CLOUD_COVER', 10))
  .filterDate(ee.Date('2000-02-24'), ee.Date('2022-01-01'))
  .sort('system:time_start', true)
   .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
           ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']);

var l4_collection_dsc = ee.ImageCollection('LANDSAT/LT04/C02/T1_L2')
  .filter(ee.Filter.or(ee.Filter.eq('WRS_PATH', 199), ee.Filter.eq('WRS_PATH', 200), ee.Filter.eq('WRS_PATH', 201)))
  .filter(ee.Filter.eq('WRS_ROW', 17))
  .filter(ee.Filter.gt('SUN_ELEVATION', sun_elevation_limit))
  .filter(ee.Filter.lt('CLOUD_COVER', 10))
  .filterDate(ee.Date('2000-02-24'), ee.Date('2022-01-01'))
  .sort('system:time_start', true)
   .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'], 
           ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']);

var landsat_imagery = l8_collection_dsc.merge(l7_collection_dsc).merge(l5_collection_dsc).merge(l4_collection_dsc);

/** Refiltering **/
// Now filter the MODIS collection to the Landsat dates and footprints.
// And then refilter Landsat to the filtered MODIS.
// This ensures every landsat image has a MODIS pair - its uncommon for it not to but happens occasionally. This stops it.

// Filter MODIS by Landsat
// Get Date List for Landsat Image Collection
var landsat_dates = landsat_imagery.map(function(image) {
      return ee.Feature(null, {'date': image.date().format('YYYY-MM-dd')});})
      .distinct('date')
      .aggregate_array('date');

// Get Footrpint Geometries for Landsat Image Collection
var landsat_geoms = landsat_imagery.map(function(image) {
      return ee.Feature(null, {'geometry': image.geometry().coordinates().flatten()})})
      .distinct('geometry')
      .aggregate_array('geometry');

// Import and Filter MODIS
var MODIS_imagery = ee.ImageCollection("MODIS/006/MOD10A1")
  .filter(ee.Filter.inList("system:time_start", landsat_dates.map(function(date){return ee.Date(date).millis()})))
  .filterBounds(ee.Geometry.MultiPolygon(landsat_geoms));

// Filter Landsat by MODIS
// Get Date List for Landsat Image Collection
var MODIS_dates = MODIS_imagery.map(function(image) {
      return ee.Feature(null, {'date': image.date().format('YYYY-MM-dd')})})
      .distinct('date')
      .aggregate_array('date');

// Modis product is 'everywhere' so no need to filter for bounds, just time

// Refilter Landsat Imagery
var refiltered_landsat_imagery = landsat_imagery
  .filter(ee.Filter.inList("DATE_ACQUIRED", MODIS_dates))

print(refiltered_landsat_imagery);
print("Image Count:", refiltered_landsat_imagery.size());

/** Function **/ 
var output = ee.FeatureCollection(refiltered_landsat_imagery.toList({
  count: refiltered_landsat_imagery.size()
}).map(function(entry) {
  
  entry = ee.Image(entry);
  
  /** Find Landsat FSC **/
  // Calculate Indicies:
  // Snow Index (SWI)
  var snow_index = entry.expression('((Green * (NIR - SWIR)) / ((Green + NIR) * (NIR + SWIR)))',
    {'Green': entry.select('Green'),
     'NIR':   entry.select('NIR'),
     'SWIR':  entry.select('SWIR_1')});
  
  // Vegetation Index (GVI)
  var vegetation_index = entry.expression(' (-0.2848 * Blue) + (-0.2435 * Green) + (-0.5436 * Red) + (0.7243 * NIR) + (0.0840 * SWIR1) + (-0.1800 * SWIR2)',
    {'Blue': entry.select('Blue'),
     'Green': entry.select('Green'),
     'Red': entry.select('Red'),
     'NIR': entry.select('NIR'),
     'SWIR1': entry.select('SWIR_1'),
     'SWIR2': entry.select('SWIR_2')});
  
  // Water Index (MNDWIinv)
  var water_index = entry.expression('1 / ((Green - SWIR) + (NIR - SWIR) / (Green + SWIR) + (NIR + SWIR))',
    {'Green': entry.select('Green'),
     'NIR': entry.select('NIR'),
     'SWIR': entry.select('SWIR_1')});
  
  // Rock Index (NDBI)
  var rock_index = entry.expression('(SWIR - NIR) / (SWIR + NIR)',
    {'NIR': entry.select('NIR'),
     'SWIR': entry.select('SWIR_1')});
  
  // Find Endmembers
  var indicies = ee.List([snow_index, vegetation_index, water_index, rock_index]);
  var endmembers = indicies.map(function(index) {
    var percentile = ee.Number(
      ee.Image(index).reduceRegion({
        reducer: ee.Reducer.percentile({percentiles: [95]}),
        geometry: AOI,
        scale: 30,
        maxPixels: 1000000, // set to  value which is large enough to create accurate endmembers but not too large to make computation time too long.
        bestEffort: true
      })
    .values()
    .get(0)
    );
    var thresholded_index = ee.Image(index).gt(percentile);
    var masked_image = entry.updateMask(thresholded_index);
    return masked_image.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: AOI,
        scale: 30,
        bestEffort: true
      })
    .values();
  });
  
  // Linear Spectral Unmixing
  var unmixed = entry.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
    .unmix({
      endmembers: endmembers,
      sumToOne: true,
      nonNegative: true})
    .rename('snow_component', 'vegetation_component', 'water_component', 'rock_component');
  
  // Find 50% and above snow pixels
  var snowcap = unmixed.select(['snow_component'], ['FSC']);
  var landsatFSC = snowcap.mask(snowcap.gt(0.5));
  
  /** Import MODIS FSC **/
  var terraFSC = ee.ImageCollection("MODIS/006/MOD10A1")
    .filterDate(ee.Date(entry.get('DATE_ACQUIRED')))
    .filterBounds(entry.geometry())
    .select(['NDSI_Snow_Cover'], ['FSC'])
    .mosaic()
    .divide(100);
  
  /** Region Stats **/
  // Get total area of AOI in metres
  var geometry_area = entry.geometry().area({
    maxError: 1,
  });
  
  // Get the MODIS derived snow cover area
  terraFSC = terraFSC.clip(entry.geometry());
  var terra_per_pixel_area = terraFSC.multiply(ee.Image.pixelArea());
  var terra_snow_cover_area = ee.Number(terra_per_pixel_area.reduceRegion({
    reducer: 'sum',
    geometry: entry.geometry(),
    scale: 500
  }).get('FSC'));
  var terra_snow_cover_percentage = terra_snow_cover_area.divide(geometry_area).multiply(100);

  // Get the Landsat derived snow cover area
  landsatFSC = landsatFSC.clip(entry.geometry());
  var landsat_per_pixel_area = landsatFSC.multiply(ee.Image.pixelArea());
  var landsat_snow_cover_area = ee.Number(landsat_per_pixel_area.reduceRegion({
    reducer: 'sum',
    geometry: entry.geometry(),
    scale: 500
  }).get('FSC'));
  var landsat_snow_cover_percentage = landsat_snow_cover_area.divide(geometry_area).multiply(100);

  // Return Feature of Values
  return ee.Feature(null, {
    "geometry_area": geometry_area.divide(1e6),
    "terra_snow_cover_percentage": terra_snow_cover_percentage,
    "landsat_snow_cover_percentage": landsat_snow_cover_percentage,
    "sun_elevation": entry.get("SUN_ELEVATION"),
    "date": entry.get("DATE_ACQUIRED")
    });
    
}));

/** Output Feature Collection **/
print("Results", output);

Export.table.toDrive({
  collection: output,
  description: "validation",
  folder: "validation",
  fileNamePrefix: "validation",
  fileFormat: "CSV"
});

/** Plot **/
function scatterplotter(dataset, y_name, x_name, series_names, colours, title_main, title_y, title_x) {
  
  // Extract X and Y columns
  var y_value = ee.List(dataset.reduceColumns({
    reducer: ee.Reducer.toList(),
    selectors: [y_name],
    weightSelectors: null
  }).get('list'));
  var x_value = ee.List(dataset.reduceColumns({
    reducer: ee.Reducer.toList(),
    selectors: [x_name],
    weightSelectors: null
  }).get('list'));
  
  // Mean Absolute Error
  print('Mean Absolute Error:', ee.Number(y_value.reduce(ee.Reducer.mean())).subtract(ee.Number(x_value.reduce(ee.Reducer.mean()))), '% difference of Custom Landsat Algorithm to MODIS Algorithm\nNegatives indicate the the custom algorithm found less snow cover than the MODIS, positives show more.');
  
  // Plot
  var scatterchart = ui.Chart.array.values({
    array: y_value, axis: 0, xLabels: x_value
  })
    .setSeriesNames(series_names)
    .setOptions({
       title: title_main,
      colors: colours,
      pointSize: 4,
      dataOpacity: 1,
      hAxis: {
        'title': title_x,
        titleTextStyle: {italic: false, bold: true},
        viewWindow:{min: 0 , max: 100}
      },
      vAxis: {
        'title': title_y,
        titleTextStyle: {italic: false, bold: true},
        viewWindow:{min: 0 , max: 100}
      },
    explorer: {
      axis: 'horizontal',
      maxZoomOut: 2,
      maxZoomIn: 0.1}
    });
print(scatterchart);
}

print(ui.Button({
  label: 'Analyse',
  onClick: function() {
    print('WARNING: Load times vary dependant on size of results');
    scatterplotter(
      output,
      'landsat_snow_cover_percentage',
      'terra_snow_cover_percentage',
      ['Percentage Cover'],
      ['Red'],
      '', // Title
      'Landsat %',
      'MODIS %'
      )}}));