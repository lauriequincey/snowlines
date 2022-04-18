/** Transect Geometry **/

// Declare Transect Length with Line Geometry
var transect_line = ee.Geometry.LineString(
  [[4.88,  61.7],
   [9.13,   61.7]]
  );

// Declare Transect Width
// Info: Units in metres
var transect_width = 40000;

// Generate Geodesic Multi-Direction Rectangular Transect Area
// Info: Takes the line, buffers it. The buffered shape always has the same number of vertices. Use the vertices above and below the end of the line to make a rectangle which is geodesic. Allows for drawing a transect at any angle not just inline with latitude or longitude.
var buffered_transect_line = transect_line.buffer(transect_width / 2);
var buffered_transect_line_coords = ee.List(buffered_transect_line.coordinates().get(0));
var lt_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(0)));  // left top
var lb_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(11))); // left bottom
var rb_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(13))); // right bottom
var rt_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(24))); // right top
var transect = ee.Geometry.Polygon({
  coords:   [lt_coord, lb_coord, rb_coord, rt_coord],
  geodesic: true,
});
Map.centerObject(transect);

/** Curate Imagery Collection **/
// Input Date
// Info:  Do not use 2020 and over or 1984 or below dates as satellites do not cover this.
//        Do not use cross year dates as the imagery is likely too bad in the Northern Hemisphere winter and I haven't bothered implementing an 'add year to end date' function so it won't work.
//        The start dates below are used in the study.

//var start_date = ee.Date('1982-07-16'); // at 16 days - 4: no, 5: no                                              nope
//var start_date = ee.Date('1983-08-11'); // at 16 days - 4: no, 5: no                                              nope
//var start_date = ee.Date('1984-07-15'); // at 16 days - 4: no, 5: partial (out of phase)                          nope
//var start_date = ee.Date('1985-07-10'); // at 16 days - 4: no, 5: no              nope                            nope
//var start_date = ee.Date('1986-06-24'); // at 16 days - 4: no, 5: yes               good
//var start_date = ee.Date('1987-08-23'); // at 16 days - 4: no, 5: no              nope                            nope
//var start_date = ee.Date('1988-06-26'); // at 16 days - 4: no, 5: yes             partial                       y  1 cloudless but misses end
//var start_date = ee.Date('1989-07-24'); // at 16 days - 4: no, 5: yes             good                          y  1 for most, 8 for all but cloudy, 
//var start_date = ee.Date('1990-09-01'); // at 16 days - 4: no, 5: no (out of phase) nope                        n  missing images
//var start_date = ee.Date('1991-07-22'); // at 16 days - 4: no, 5: yes             most                          y  8 but misses start, nope for all
//var start_date = ee.Date('1992-06-27'); // at 16 days - 4: no, 5: yes             partial                       y  13 for all, some cloudy
//var start_date = ee.Date('1993-07-19'); // at 16 days - 4: no, 5: partial         partial                       y  1 misses start, cant do all
//var start_date = ee.Date('1994-07-25'); // at 16 days - 4: no, 5: yes             good                          y  5 misses end, 7 does all
//var start_date = ee.Date('1995-07-20'); // at 16 days - 4: no, 5: yes             good                          y  7 misses the start but 13 gets it.
//var start_date = ee.Date('1996-07-04'); // at 16 days - 4: no, 5: no              nope                          n  16 plus
//var start_date = ee.Date('1997-07-13'); // at 16 days - 4: , 5: partial           bit messy but good            y  11 days for almost clear
//var start_date = ee.Date('1998-07-23'); // at 16 days - 4: no , 5: yes            good                          y  11 days for almost all clear
//var start_date = ee.Date('1999-07-29'); // at 16 days - 5: yes, 7: yes            works together                y  7 days for full clear
//var start_date = ee.Date('2000-07-17'); // at 16 days - 5: yes, 7: yes            7 days 7: yes, 5: no          y  7 days for full clear
//var start_date = ee.Date('2001-06-28'); // at 16 days - 5: no, 7: no              7 days 7: no, 5: no           n  too cloudy
//var start_date = ee.Date('2002-07-05'); // at 16 days - 5: no, 7: partial         7 days 7: no, 5: no           n  too cloudy
//var start_date = ee.Date('2003-07-12'); // at 16 days - 5: yes , 7: no            7 days 7: no, 5: yes          y  4 days for reasonable
//var start_date = ee.Date('2004-07-27'); // at 16 days - 5: yes , 7: yes           7 days 7: yes, 5: yes         y  7 days for clear
//var start_date = ee.Date('2005-08-03'); // at 16 days - 5: no, 7: no              7 days 7: no, 5: no           n  12 for full but really cloudy  
//var start_date = ee.Date('2006-06-29'); // at 16 days - 5: partial, 7: no         7 days 7: no, 5: partial      n  8 for full but cloudy, 
//var start_date = ee.Date('2007-07-08'); // at 16 days - 5: no, 7: no              7 days 7: no, 5: partial      n  19 for full but cloudy 
//var start_date = ee.Date('2008-07-22'); // at 16 days - 5: yes, 7: no             7 days 7: no, 5: yes          y  14 for full but 7 works for almost all the transect
//var start_date = ee.Date('2009-07-25'); // at 16 days - 5: no , 7: no             7 days 7: no, 5: no           n  16 days and incomplete and cloudy
//var start_date = ee.Date('2010-07-04'); // at 16 days - 5: no, 7: no              7 days 7: no, 5: no           n  20 days and incomplete
//var start_date = ee.Date('2011-07-07'); // at 16 days - 5: partial, 7: partial    7 days 7: yes, 5: no          y  16 days but its partial
//var start_date = ee.Date('2012-08-02'); // at 16 days - 7 partial:                7 days 7: no, 5: no           n  24 days and its still bad
//var start_date = ee.Date('2013-07-14'); // at 16 days - 7: yes, 8: yes            7 days 7: no, 8: no           y  12 days for full clear
//var start_date = ee.Date('2014-07-11'); // at 16 days - 7: yes, 8: yes            7 days 7: no, 8: yes          y  3 days for full clear
//var start_date = ee.Date('2015-08-18'); // at 16 days - 7: partial, 8: yes        7 days 7: yes, 8: yes         y  7 days for full clear ---- too low sun angles!
//var start_date = ee.Date('2016-06-15'); // at 16 days - 7: partial, 8: no         7 days 7: yes, 8: no          n  greater than 16 days (19) cloudy tho
//var start_date = ee.Date('2017-07-03'); // at 16 days - 7: no, 8: partial         7 days 7: yes, 8: partial     n  5 days but just cloudy
//var start_date = ee.Date('2018-06-02'); // at 16 days - 7: yes, 8: yes            7 days 7: yes, 8: yes         y  5 days for full clear
//var start_date = ee.Date('2019-06-27'); // at 16 days - 7: yes, 8: no             7 days 7: no, 8: no           y  16 days for full clear
//var start_date = ee.Date('2020-06-27'); // at 16 days - 7: no, 8: yes             7 days 7: no, 8: yes          y  8 days for full clear
var start_date = ee.Date('2021-07-08'); // at 16 days - 7: no, 8: yes             7 days 7: no, 8: no           y  16 days for full clear

// Create a date range from this start date by using start date and advancing it by 13 days to find the end date.
var date_range = ee.DateRange(start_date, start_date.advance(16, 'day'));

// Pick a Satellite
// Info:  Match satellite date to the previously picked date range.
//        There will always be two choices of satellite for any satellite post 1984.
//        Dates:  Landsat 4: '1982-08-22', '1993-12-14'
//                Landsat 5: '1984-01-01', '2012-05-05'
//                Landsat 7: '1999-01-01', '2021-07-31'
//                Landsat 8: '2013-04-11', '2021-08-14'
var satellite_name = 'Landsat_5';

// Import Imagery Based on Date and Satellite Selection
var collections = ee.Dictionary([
  'Landsat_4', ee.ImageCollection('LANDSAT/LT04/C02/T1_L2')
    .filterBounds(transect)
    .filterDate(date_range)
    .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
            ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
  'Landsat_5', ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
    .filterBounds(transect)
    .filterDate(date_range)
    .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
            ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
  'Landsat_7', ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
    .filterBounds(transect)
    .filterDate(date_range)
    .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'], 
            ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
  'Landsat_8', ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(transect)
    .filterDate(date_range)
    .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
            ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
]);
var collection = ee.ImageCollection(collections.get(satellite_name));
Map.addLayer(collection, {}, 'Raw Imagery');

print('Sun Elevations');
print(collection.toList(collection.size()).map(function(image) {
  return ee.Image(image).get('SUN_ELEVATION');
}));

// Retrieve translation error of satellite for use in environmental image
// Landsat 8 and 7 L1TP products (highest level processing which is the stuff im using https://developers.google.com/earth-engine/guides/landsat) have an image registration accuracy of less than 12m (see: "Landsat 8 Operational Land Imager On-Orbit Geometric Calibration and Performance", DOI:10.3390/rs61111127) 
// ----> Or even better USGS say "All L1TP Tier-1 products are expected to be consistent to within 12-m." https://www.usgs.gov/landsat-missions/landsat-levels-processing
// Remember! Add on the Jaxa alos fixed terrain error to the outcome of the slope translation error which uses this x,y error.
var translation_error_dictionary = ee.Dictionary([
  'Landsat_4', 12,
  'Landsat_5', 12,
  'Landsat_7', 12, //https://www.sciencedirect.com/science/article/pii/S0034425707003331 "4.5 m or less for band-to-band registration, less than or equal to 12 m for image-to-image registration, and less than or equal to 25 m for image-to-map registration excluding terrain effects"
  'Landsat_8', 12, //https://www.sciencedirect.com/science/article/pii/S003442571400042X#bb0390 and https://www.sciencedirect.com/science/article/pii/S0034425719300707#bb1330 "Geometric and geodetic accuracy	Tier 1 ≦ 12-meter radial RMSE"        https://www.mdpi.com/2072-4292/6/11/11127/htm "The absolute accuracy of a ground control corrected product is dependent upon the accuracy of the control itself, so this specification explicitly assumed that ground control points accurate to 3 meters (CE90) horizontally"
  ]);
var translation_error = ee.Number(translation_error_dictionary.get(satellite_name));

/** Glacier and Water Masks **/

// Glacer Mask
var glacier_mask = ee.FeatureCollection("GLIMS/current")
  .filterBounds(transect)
  .select('area')
  .map(function(feature) {
    return feature.buffer({
      distance: 180,
      maxError: 1000
    });
  })
  .reduceToImage({
    properties: ['area'],
    reducer: ee.Reducer.mean().unweighted()})
  .rename('glacier_mask')
  .unmask(1);
  
// Water Mask
var water_mask = ee.Image("JRC/GSW1_3/GlobalSurfaceWater")
  .select(['max_extent'], ['Water_Mask'])
  .eq(1)
  .focal_max({
    radius: 100,
    kernelType: 'square',
    units: 'meters', 
    iterations: 1
  })
  .eq(0)
  .unmask(0);
Map.addLayer(glacier_mask, {}, 'Glacier and Ice Cap Mask', 0);
Map.addLayer(water_mask, {}, 'Water Bodies Mask', 0);

/** Environment Image **/
// Info: Comment out most of the variables and only download the ones you need. If you want many, download in multiple reruns of the algorithm.

// Declare reducer function (mean and standard deviation)
var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true
});

// Declare ERA5 Climate Datsets and calculate means and standard deviations for date range, summer, winter, spring, autumn, year.
// ERA5 Mean and SD
var era5_date_range = ee.ImageCollection('ECMWF/ERA5/DAILY')
  .filterBounds(transect)
  .filterDate(date_range)
  .reduce(reducers);
var era5_summer = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 06, 01), ee.Date.fromYMD(date_range.end().get('year'), 8, 31)))
  .reduce(reducers);
var era5_winter = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 12, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 02, 28)))
  .reduce(reducers);
var era5_spring = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 03, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 05, 28)))
  .reduce(reducers);
var era5_autumn = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 9, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 11, 30)))
  .reduce(reducers);
var era5_year = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 01, 01), ee.Date.fromYMD(date_range.end().get('year'), 12, 31)))
  .reduce(reducers);

// ERA5Land Mean and SD
var era5land_date_range = ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
  .filterBounds(transect)
  .filterDate(date_range)
  .reduce(reducers);
var era5land_summer = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 06, 01), ee.Date.fromYMD(date_range.end().get('year'), 8, 31)))
  .reduce(reducers);
var era5land_winter = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 12, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 02, 28)))
  .reduce(reducers);
var era5land_spring = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 03, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 05, 28)))
  .reduce(reducers);
var era5land_autumn = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 9, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 11, 30)))
  .reduce(reducers);
var era5land_year = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 01, 01), ee.Date.fromYMD(date_range.end().get('year'), 12, 31)))
  .reduce(reducers);
  
// Terrain Dataset
// +- 5m https://www.mdpi.com/2072-4292/13/22/4653/pdf. Arctic DEM (https://developers.google.com/earth-engine/datasets/catalog/UMN_PGC_ArcticDEM_V3_2m_mosaic) is also a possibility and is at 2m (!) resolution, 4m error. Porblem is that is has holes in it.
// see https://www.mdpi.com/2072-4292/13/22/4653/pdf for a good comparisons in error of some dems over the arctic.
var elevation = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
    .filterBounds(transect)
    .select(['DSM'], ['altitude'])
    .mosaic()
    .reproject({crs: 'EPSG:4326', scale: 30}); // reproject so the mosaic is uniform for the terrain calculations. Necessary, see: https://developers.google.com/earth-engine/guides/projections#reprojecting

// Calculate Windspeed and direction data
// Calculation Functions
var windspeed_expression = function(image) {
  return image.expression('sqrt(u**2 + v**2)', {'u': image.select('u_component_of_wind_10m'),'v': image.select('v_component_of_wind_10m')}).rename('wind_speed');
};
var wind_direction_expression = function(image) {
  return image.expression('mod(180 + (180/3.14) * atan2(v,u),360)', {'u': image.select('u_component_of_wind_10m'),'v': image.select('v_component_of_wind_10m')}).rename('wind_direction');
};
// Redefine Datasets
// Note: We need to redefine the datasets here without reducing them as before in order to calculate standard deviation. The reduction is applied on the datsets defined before to simplify the other calculations.
var era5_wind_date_range = ee.ImageCollection('ECMWF/ERA5/DAILY')
  .filterBounds(transect)
  .filterDate(date_range);
var era5_wind_summer = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 06, 01), ee.Date.fromYMD(date_range.end().get('year'), 8, 31)));
var era5_wind_winter = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 12, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 02, 28)));
var era5_wind_spring = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 03, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 05, 28)));
var era5_wind_autumn = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 9, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 11, 30)));
var era5_wind_year = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 01, 01), ee.Date.fromYMD(date_range.end().get('year'), 12, 31)));
// Calculate Windspeeds and Directions
var era5_windspeed_date_range = era5_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5_windspeed_summer = era5_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5_windspeed_winter = era5_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5_windspeed_spring = era5_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5_windspeed_autumn = era5_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5_windspeed_year = era5_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5_wind_direction_date_range = era5_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);
var era5_wind_direction_summer = era5_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);
var era5_wind_direction_winter = era5_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);
var era5_wind_direction_spring = era5_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);
var era5_wind_direction_autumn = era5_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);
var era5_wind_direction_year = era5_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);

// Put together environmental image
var environmental_image = ee.Image().addBands([
  
  // Coordinates
  ee.Image.pixelLonLat()
    .rename(['longitude', 'latitude']),
    
  // Elevation
  elevation,

  // Aspect
  ee.Terrain.aspect(elevation)
    .rename('aspect')
    .double(),
    
  // Slope Angle
  ee.Terrain.slope(elevation)
  .rename('slope')
  .double(),
  
  // Elevation Translation Error (trigonometry using slope of pixel and offset distance from satellite translation error)
  ee.Terrain.slope(elevation).multiply(Math.PI).divide(180).tan().multiply(ee.Image.constant(translation_error)).rename('altitudinal_translation_error'),
  
  // Base Terrain Height Error of JAXAexc ALOS
  ee.Image.constant(2.5).rename('elevation_base_error'),
  
  // Mean Temperature
/*  era5_date_range.select(['mean_2m_air_temperature_mean'], ['Temperature_2m_By_Date_Range_Mean_/_K']),
  era5_summer.select(['mean_2m_air_temperature_mean'], ['Temperature_2m_By_Summer_Mean_/_K']),
  era5_winter.select(['mean_2m_air_temperature_mean'], ['Temperature_2m_By_Winter_Mean_/_K']),
  era5_spring.select(['mean_2m_air_temperature_mean'], ['Temperature_2m_By_Spring_Mean_/_K']),
  era5_autumn.select(['mean_2m_air_temperature_mean'], ['Temperature_2m_By_Autumn_Mean_/_K']),
  era5_year.select(['mean_2m_air_temperature_mean'], ['Temperature_2m_By_Year_Mean_/_K']),
  era5_date_range.select(['mean_2m_air_temperature_stdDev'], ['Temperature_2m_By_Date_Range_stdDev_/_K']),
  era5_summer.select(['mean_2m_air_temperature_stdDev'], ['Temperature_2m_By_Summer_stdDev_/_K']),
  era5_winter.select(['mean_2m_air_temperature_stdDev'], ['Temperature_2m_By_Winter_stdDev_/_K']),
  era5_spring.select(['mean_2m_air_temperature_stdDev'], ['Temperature_2m_By_Spring_stdDev_/_K']),
  era5_autumn.select(['mean_2m_air_temperature_stdDev'], ['Temperature_2m_By_Autumn_stdDev_/_K']),
  era5_year.select(['mean_2m_air_temperature_stdDev'], ['Temperature_2m_By_Year_stdDev_/_K']),
  
  // Mean Snowfall
  era5land_date_range.select(['snowfall_mean'], ['Snowfall_By_Date_Range_Mean_/_m_of_water_equivalent']),
  era5land_summer.select(['snowfall_mean'],['Snowfall_By_Summer_Mean_/_m_of_water_equivalent']),
  era5land_winter.select(['snowfall_mean'],['Snowfall_By_Winter_Mean_/_m_of_water_equivalent']),
  era5land_spring.select(['snowfall_mean'],['Snowfall_By_Spring_Mean_/_m_of_water_equivalent']),
  era5land_autumn.select(['snowfall_mean'],['Snowfall_By_Autumn_Mean_/_m_of_water_equivalent']),
  era5land_year.select(['snowfall_mean'],['Snowfall_By_Year_Mean_/_m_of_water_equivalent']),
  era5land_date_range.select(['snowfall_stdDev'], ['Snowfall_By_Date_Range_stdDev_/_m_of_water_equivalent']),
  era5land_summer.select(['snowfall_stdDev'],['Snowfall_By_Summer_stdDev_/_m_of_water_equivalent']),
  era5land_winter.select(['snowfall_stdDev'],['Snowfall_By_Winter_stdDev_/_m_of_water_equivalent']),
  era5land_spring.select(['snowfall_stdDev'],['Snowfall_By_Spring_stdDev_/_m_of_water_equivalent']),
  era5land_autumn.select(['snowfall_stdDev'],['Snowfall_By_Autumn_stdDev_/_m_of_water_equivalent']),
  era5land_year.select(['snowfall_stdDev'],['Snowfall_By_Year_stdDev_/_m_of_water_equivalent']),
  
  // Mean Snowmelt
  era5land_date_range.select(['snowmelt_mean'], ['Snowmelt_By_Date_Range_Mean_/_m_of_water_equivalent']),
  era5land_summer.select(['snowmelt_mean'],['Snowmelt_By_Summer_Mean_/_m_of_water_equivalent']),
  era5land_winter.select(['snowmelt_mean'],['Snowmelt_By_Winter_Mean_/_m_of_water_equivalent']),
  era5land_spring.select(['snowmelt_mean'],['Snowmelt_By_Spring_Mean_/_m_of_water_equivalent']),
  era5land_autumn.select(['snowmelt_mean'],['Snowmelt_By_Autumn_Mean_/_m_of_water_equivalent']),
  era5land_year.select(['snowmelt_mean'],['Snowmelt_By_Year_Mean_/_m_of_water_equivalent']),
  era5land_date_range.select(['snowmelt_stdDev'], ['Snowmelt_By_Date_Range_stdDev_/_m_of_water_equivalent']),
  era5land_summer.select(['snowmelt_stdDev'],['Snowmelt_By_Summer_stdDev_/_m_of_water_equivalent']),
  era5land_winter.select(['snowmelt_stdDev'],['Snowmelt_By_Winter_stdDev_/_m_of_water_equivalent']),
  era5land_spring.select(['snowmelt_stdDev'],['Snowmelt_By_Spring_stdDev_/_m_of_water_equivalent']),
  era5land_autumn.select(['snowmelt_stdDev'],['Snowmelt_By_Autumn_stdDev_/_m_of_water_equivalent']),
  era5land_year.select(['snowmelt_stdDev'],['Snowmelt_By_Year_stdDev_/_m_of_water_equivalent']),

 
  // Mean Snow Evaporation (Sublimation)
  era5land_date_range.select(['snow_evaporation_mean'], ['Snow_evaporation_By_Date_Range_Mean_/_m_of_water_equivalent']),
  era5land_summer.select(['snow_evaporation_mean'],['Snow_evaporation_By_Summer_Mean_/_m_of_water_equivalent']),
  era5land_winter.select(['snow_evaporation_mean'],['Snow_evaporation_By_Winter_Mean_/_m_of_water_equivalent']),
  era5land_spring.select(['snow_evaporation_mean'],['Snow_evaporation_By_Spring_Mean_/_m_of_water_equivalent']),
  era5land_autumn.select(['snow_evaporation_mean'],['Snow_evaporation_By_Autumn_Mean_/_m_of_water_equivalent']),
  era5land_year.select(['snow_evaporation_mean'],['Snow_evaporation_By_Year_Mean_/_m_of_water_equivalent']),
  era5land_date_range.select(['snow_evaporation_stdDev'], ['Snow_evaporation_By_Date_Range_stdDev_/_m_of_water_equivalent']),
  era5land_summer.select(['snow_evaporation_stdDev'],['Snow_evaporation_By_Summer_stdDev_/_m_of_water_equivalent']),
  era5land_winter.select(['snow_evaporation_stdDev'],['Snow_evaporation_By_Winter_stdDev_/_m_of_water_equivalent']),
  era5land_spring.select(['snow_evaporation_stdDev'],['Snow_evaporation_By_Spring_stdDev_/_m_of_water_equivalent']),
  era5land_autumn.select(['snow_evaporation_stdDev'],['Snow_evaporation_By_Autumn_stdDev_/_m_of_water_equivalent']),
  era5land_year.select(['snow_evaporation_stdDev'],['Snow_evaporation_By_Year_stdDev_/_m_of_water_equivalent']),
   
  // Mean Windspeed
  era5_windspeed_date_range.select(['wind_speed_mean'], ['Windspeed_10m_By_Date_Range_Mean_/_ms-1']),
  era5_windspeed_summer.select(['wind_speed_mean'], ['Windspeed_10m_By_Summer_Mean_/_ms-1']),
  era5_windspeed_winter.select(['wind_speed_mean'], ['Windspeed_10m_By_Winter_Mean_/_ms-1']),
  era5_windspeed_spring.select(['wind_speed_mean'], ['Windspeed_10m_By_Spring_Mean_/_ms-1']),
  era5_windspeed_autumn.select(['wind_speed_mean'], ['Windspeed_10m_By_Autumn_Mean_/_ms-1']),
  era5_windspeed_year.select(['wind_speed_mean'], ['Windspeed_10m_By_Year_Mean_/_ms-1']),
  era5_windspeed_date_range.select(['wind_speed_stdDev'], ['Windspeed_10m_By_Date_Range_stdDev_/_ms-1']),
  era5_windspeed_summer.select(['wind_speed_stdDev'], ['Windspeed_10m_By_Summer_stdDev_/_ms-1']),
  era5_windspeed_winter.select(['wind_speed_stdDev'], ['Windspeed_10m_By_Winter_stdDev_/_ms-1']),
  era5_windspeed_spring.select(['wind_speed_stdDev'], ['Windspeed_10m_By_Spring_stdDev_/_ms-1']),
  era5_windspeed_autumn.select(['wind_speed_stdDev'], ['Windspeed_10m_By_Autumn_stdDev_/_ms-1']),
  era5_windspeed_year.select(['wind_speed_stdDev'], ['Windspeed_10m_By_Year_stdDev_/_ms-1']),
  
  // Mean Wind Direction
  era5_wind_direction_date_range.select(['wind_direction_mean'], ['Wind_direction_10m_By_Date_Range_Mean_/_ms-1']),
  era5_wind_direction_summer.select(['wind_direction_mean'], ['Wind_direction_10m_By_Summer_Mean_/_ms-1']),
  era5_wind_direction_winter.select(['wind_direction_mean'], ['Wind_direction_10m_By_Winter_Mean_/_ms-1']),
  era5_wind_direction_spring.select(['wind_direction_mean'], ['Wind_direction_10m_By_Spring_Mean_/_ms-1']),
  era5_wind_direction_autumn.select(['wind_direction_mean'], ['Wind_direction_10m_By_Autumn_Mean_/_ms-1']),
  era5_wind_direction_year.select(['wind_direction_mean'], ['Wind_direction_10m_By_Year_Mean_/_ms-1']),
  era5_wind_direction_date_range.select(['wind_direction_stdDev'], ['Wind_direction_10m_By_Date_Range_stdDev_/_ms-1']),
  era5_wind_direction_summer.select(['wind_direction_stdDev'], ['Wind_direction_10m_By_Summer_stdDev_/_ms-1']),
  era5_wind_direction_winter.select(['wind_direction_stdDev'], ['Wind_direction_10m_By_Winter_stdDev_/_ms-1']),
  era5_wind_direction_spring.select(['wind_direction_stdDev'], ['Wind_direction_10m_By_Spring_stdDev_/_ms-1']),
  era5_wind_direction_autumn.select(['wind_direction_stdDev'], ['Wind_direction_10m_By_Autumn_stdDev_/_ms-1']),
  era5_wind_direction_year.select(['wind_direction_stdDev'], ['Wind_direction_10m_By_Year_stdDev_/_ms-1']),
  
  // Surface Latent Heat Flux
  era5land_date_range.select(['surface_latent_heat_flux_mean'], ['Surface_latent_heat_flux_By_Date_Range_Mean_/_Jm-2']),
  era5land_summer.select(['surface_latent_heat_flux_mean'],['Surface_latent_heat_flux_By_Summer_Mean_/_Jm-2']),
  era5land_winter.select(['surface_latent_heat_flux_mean'],['Surface_latent_heat_flux_By_Winter_Mean_/_Jm-2']),
  era5land_spring.select(['surface_latent_heat_flux_mean'],['Surface_latent_heat_flux_By_Spring_Mean_/_Jm-2']),
  era5land_autumn.select(['surface_latent_heat_flux_mean'],['Surface_latent_heat_flux_By_Autumn_Mean_/_Jm-2']),
  era5land_year.select(['surface_latent_heat_flux_mean'],['Surface_latent_heat_flux_By_Year_Mean_/_Jm-2']),
  era5land_date_range.select(['surface_latent_heat_flux_stdDev'], ['Surface_latent_heat_flux_By_Date_Range_stdDev_/_Jm-2']),
  era5land_summer.select(['surface_latent_heat_flux_stdDev'],['Surface_latent_heat_flux_By_Summer_stdDev_/_Jm-2']),
  era5land_winter.select(['surface_latent_heat_flux_stdDev'],['Surface_latent_heat_flux_By_Winter_stdDev_/_Jm-2']),
  era5land_spring.select(['surface_latent_heat_flux_stdDev'],['Surface_latent_heat_flux_By_Spring_stdDev_/_Jm-2']),
  era5land_autumn.select(['surface_latent_heat_flux_stdDev'],['Surface_latent_heat_flux_By_Autumn_stdDev_/_Jm-2']),
  era5land_year.select(['surface_latent_heat_flux_stdDev'],['Surface_latent_heat_flux_By_Year_stdDev_/_Jm-2']),

  // Surface Sensible Heat Flux
  era5land_date_range.select(['surface_sensible_heat_flux_mean'], ['Surface_sensible_heat_flux_By_Date_Range_Mean_/_m_of_water_equivalent']),
  era5land_summer.select(['surface_sensible_heat_flux_mean'],['Surface_sensible_heat_flux_By_Summer_Mean_/_Jm-2']),
  era5land_winter.select(['surface_sensible_heat_flux_mean'],['Surface_sensible_heat_flux_By_Winter_Mean_/_Jm-2']),
  era5land_spring.select(['surface_sensible_heat_flux_mean'],['Surface_sensible_heat_flux_By_Spring_Mean_/_Jm-2']),
  era5land_autumn.select(['surface_sensible_heat_flux_mean'],['Surface_sensible_heat_flux_By_Autumn_Mean_/_Jm-2']),
  era5land_year.select(['surface_sensible_heat_flux_mean'],['Surface_sensible_heat_flux_By_Year_Mean_/_Jm-2']),
  era5land_date_range.select(['surface_sensible_heat_flux_stdDev'], ['Surface_sensible_heat_flux_By_Date_Range_stdDev_/_Jm-2']),
  era5land_summer.select(['surface_sensible_heat_flux_stdDev'],['Surface_sensible_heat_flux_By_Summer_stdDev_/_Jm-2']),
  era5land_winter.select(['surface_sensible_heat_flux_stdDev'],['Surface_sensible_heat_flux_By_Winter_stdDev_/_Jm-2']),
  era5land_spring.select(['surface_sensible_heat_flux_stdDev'],['Surface_sensible_heat_flux_By_Spring_stdDev_/_Jm-2']),
  era5land_autumn.select(['surface_sensible_heat_flux_stdDev'],['Surface_sensible_heat_flux_By_Autumn_stdDev_/_Jm-2']),
  era5land_year.select(['surface_sensible_heat_flux_stdDev'],['Surface_sensible_heat_flux_By_Year_stdDev_/_Jm-2']),

  // Surface Downward Solar Radiation
  era5land_date_range.select(['surface_solar_radiation_downwards_mean'], ['Surface_solar_radiation_downwards_By_Date_Range_Mean_/_m_of_water_equivalent']),
  era5land_summer.select(['surface_solar_radiation_downwards_mean'],['Surface_solar_radiation_downwards_By_Summer_Mean_/_Jm-2']),
  era5land_winter.select(['surface_solar_radiation_downwards_mean'],['Surface_solar_radiation_downwards_By_Winter_Mean_/_Jm-2']),
  era5land_spring.select(['surface_solar_radiation_downwards_mean'],['Surface_solar_radiation_downwards_By_Spring_Mean_/_Jm-2']),
  era5land_autumn.select(['surface_solar_radiation_downwards_mean'],['Surface_solar_radiation_downwards_By_Autumn_Mean_/_Jm-2']),
  era5land_year.select(['surface_solar_radiation_downwards_mean'],['Surface_sensiblet_heat_flux_By_Year_Mean_/_Jm-2']),
  era5land_date_range.select(['surface_solar_radiation_downwards_stdDev'], ['Surface_solar_radiation_downwards_By_Date_Range_stdDev_/_Jm-2']),
  era5land_summer.select(['surface_solar_radiation_downwards_stdDev'],['Surface_solar_radiation_downwards_By_Summer_stdDev_/_Jm-2']),
  era5land_winter.select(['surface_solar_radiation_downwards_stdDev'],['Surface_solar_radiation_downwards_By_Winter_stdDev_/_Jm-2']),
  era5land_spring.select(['surface_solar_radiation_downwards_stdDev'],['Surface_solar_radiation_downwards_By_Spring_stdDev_/_Jm-2']),
  era5land_autumn.select(['surface_solar_radiation_downwards_stdDev'],['Surface_solar_radiation_downwards_By_Autumn_stdDev_/_Jm-2']),
  era5land_year.select(['surface_solar_radiation_downwards_mean'],['Surface_solar_radiation_downwards_By_Year_Mean_/_Jm-2']),
  era5land_year.select(['surface_solar_radiation_downwards_stdDev'],['Surface_solar_radiation_downwards_By_Year_stdDev_/_Jm-2']),*/
  ]);
print('Variables', environmental_image);

/** Algorithm **/

// Extract Cloud and Cloud Shadows Mask
var collection = collection.map(function(image) {
  var clouds = image.select('QA_PIXEL').bitwiseAnd(1 << 3).eq(0);
  var cloud_shadows = image.select('QA_PIXEL').bitwiseAnd(1 << 4).eq(0);
  var combined = ee.Image.constant(1).updateMask(clouds.and(cloud_shadows)).rename('clouds_and_cloud_shadows_mask');
  return image.addBands(combined.unmask());
});

// Add Unix Time to Each Pixel
var collection = collection.map(function(image) {
  return image.addBands(
    ee.Image.constant(ee.Date(image
      .get('DATE_ACQUIRED'))
      .millis()
    )
    .int64()
    .rename('aqcuisition_time')
  );
});

// Mosaic Imagery
var quality_mosaic = collection.qualityMosaic('clouds_and_cloud_shadows_mask');

// Create Cloudless Mosaic for Endmember Extraction
var cloudless_mosaic = quality_mosaic.updateMask(quality_mosaic.select('clouds_and_cloud_shadows_mask'));
Map.addLayer(cloudless_mosaic, {}, 'Cloudless Mosaic');

// Calculate Indicies:
// Snow Index (SWI)
var snow_index = cloudless_mosaic.expression('((Green * (NIR - SWIR)) / ((Green + NIR) * (NIR + SWIR)))',
  {'Green': cloudless_mosaic.select('Green'),
   'NIR':   cloudless_mosaic.select('NIR'),
   'SWIR':  cloudless_mosaic.select('SWIR_1')});

// Vegetation Index (GVI)
var vegetation_index = cloudless_mosaic.expression(' (-0.2848 * Blue) + (-0.2435 * Green) + (-0.5436 * Red) + (0.7243 * NIR) + (0.0840 * SWIR1) + (-0.1800 * SWIR2)',
  {'Blue': cloudless_mosaic.select('Blue'),
   'Green': cloudless_mosaic.select('Green'),
   'Red': cloudless_mosaic.select('Red'),
   'NIR': cloudless_mosaic.select('NIR'),
   'SWIR1': cloudless_mosaic.select('SWIR_1'),
   'SWIR2': cloudless_mosaic.select('SWIR_2')});

// Water Index (MNDWIinv)
var water_index = cloudless_mosaic.expression('1 / ((Green - SWIR) + (NIR - SWIR) / (Green + SWIR) + (NIR + SWIR))',
  {'Green': cloudless_mosaic.select('Green'),
   'NIR': cloudless_mosaic.select('NIR'),
   'SWIR': cloudless_mosaic.select('SWIR_1')});

// Rock Index (NDBI)
var rock_index = cloudless_mosaic.expression('(SWIR - NIR) / (SWIR + NIR)',
  {'NIR': cloudless_mosaic.select('NIR'),
   'SWIR': cloudless_mosaic.select('SWIR_1')});

// Find Endmembers
var indicies = ee.List([snow_index, vegetation_index, water_index, rock_index]);
var endmembers = indicies.map(function(index) {
  var percentile = ee.Number(
    ee.Image(index).reduceRegion({
      reducer: ee.Reducer.percentile({percentiles: [95]}),
      geometry: transect,
      scale: 30,
      maxPixels: 1000000, // set to  value which is large enough to create accurate endmembers but not too large to make computation time too long.
      bestEffort: true
    })
  .values()
  .get(0)
  );
  var thresholded_index = ee.Image(index).gt(percentile);
  var masked_image = cloudless_mosaic.updateMask(thresholded_index);
  return masked_image.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
    .reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: transect,
      scale: 30,
      bestEffort: true
    })
  .values();
});

var results = collection.map(function(image) {
  
  // Linear Spectral Unmixing
  var unmixed_mosaic = image.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
    .unmix({
      endmembers: endmembers,
      sumToOne: true,
      nonNegative: true})
    .rename('snow_component', 'vegetation_component', 'water_component', 'rock_component');
  
  
  // Find 50% and above snow pixels
  var snowcap = unmixed_mosaic
    .select(['snow_component'], ['mask'])
    .gt(0.5)
    .selfMask();
  
  
  // Fill Holes in Snowcap
  var inverted_snowcap = snowcap.unmask().eq(0).selfMask(); // invert snowcap and selfmask to avoid inverted components in next step. Remove this if you want to get rid of little patches of snowline
  var connected_components = inverted_snowcap
    .connectedComponents({
      connectedness: ee.Kernel.square({
        radius: 1, // distance away from other 'on' pixels. set to 1 (the minimum) as otherwise, gaps near the edge are not detected
        units: 'pixels'
      }),
    maxSize: 150 // maximum number of pixels in each patch. 150 seems good balance. EDIT: other regions like the rockies need bigger values?.
    })
    .select(['labels'], ['mask'])
    .eq(0)
    .add(1)
    .eq(1);
  var filled_snowcap = ee.ImageCollection([snowcap, connected_components]).mosaic();
  
  // Find Filled Snowcap Edge
  var snowcap_edge = filled_snowcap.reduceNeighborhood({
    reducer: ee.Reducer.count(),
    kernel: ee.Kernel.plus({
      radius: 1,
      units: 'pixels'
      })
    })
    .updateMask(filled_snowcap)
    .lt(5)
    .rename('snow_edge')
    .selfMask();
  
  // Snow Index (SWI)
  var snow_index = image.expression('((Green * (NIR - SWIR)) / ((Green + NIR) * (NIR + SWIR)))',
    {'Green': image.select('Green'),
     'NIR':   image.select('NIR'),
     'SWIR':  image.select('SWIR_1')});
  
  // Mask the Snowline
  var snowline_pixels = quality_mosaic.select('aqcuisition_time')
    .updateMask( // mosaic is masked to keep the pixel times.
      snowcap_edge
      .and(glacier_mask)
      .and(water_mask)
      //.and(image.select('clouds_and_cloud_shadows_mask'))
      .and(snow_index.gt(0.21)/*.or(snow_index.lt(0.02))*/)
    );
  
  // Convert each Pixel into a Point Geometry
  var snowline_geometry = snowline_pixels.sampleRegions({ // turns each pixel into a point feature
    collection: transect,
    properties: null,
    scale: 30,
    projection: null,
    tileScale: 4,
    geometries: true
  });
  
  // Add Distances Along Transect from "lt_coord" and "lb_coord" and "snowline_geometry"
  var start_line = ee.Geometry.LineString([lt_coord, lb_coord]);
  var transect_distances = snowline_geometry.map(function(point) {
    var distance = point.geometry().distance(start_line);
    return point.set('distance', distance);
  });
  var transect_distances = transect_distances.reduceToImage(['distance'], ee.Reducer.mean())
    .rename('distance')
    .divide(1000);
    
    
  // Merge Environmental Image with Snowline Pixel Time and Sun Elevation
  var metrics_and_environmental_image = snowline_pixels.select(['aqcuisition_time'], ['unix_aqcuisition_time']) // select and rename time
      .addBands([transect_distances, environmental_image, ee.Image(ee.Number(ee.Image(image).get('SUN_ELEVATION'))).rename(['sun_elevation'])]); // add trasnect distances, environmental image stuff, and sun elevation image produced from the satellite scene in question
  
  // Reduce Metrics and Environmental Image by Snowline Geometry
  return metrics_and_environmental_image.reduceRegions({
    collection: snowline_geometry,
    reducer: ee.Reducer.mean(),
    scale: 30,
    tileScale: 1
    })
    .select(metrics_and_environmental_image.bandNames().remove('constant'), metrics_and_environmental_image.bandNames().remove('constant'), true); // false removes geometry
  
  // Alternative reduceRegions method.
  /*var results = snowline_geometry.map(function(data_point) {
      return ee.Feature(data_point.geometry(),
        metrics_and_environmental_image.reduceRegion({
          reducer: ee.Reducer.mean(),
          geometry: data_point.geometry(),
          scale: 30
        })).set({
          time: image.date().millis(),
          date: image.date().format()
        }).copyProperties(data_point);
  });*/
  
  return results
});
Map.addLayer(transect, {}, 'Transect');
Map.addLayer(ee.FeatureCollection(results.flatten()).draw({color: 'Red', pointRadius: 0, strokeWidth: 1}), {},'Snow-edge Data Points', 1, 1);
print('Number of snowline pixels/points found:');
print(results.flatten().size());

/** Export **/

// Google Drive Export
// On button press, export.
print(ui.Button({
  label: 'Export Data to Google Drive',
  onClick: function() {
    
    // Pull info to client side
    var collection_name = ee.String(collection.first().get('SPACECRAFT_ID')).replace('_', '').getInfo();
    var start_date = date_range.start().format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
    var end_date = date_range.end().format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
    var year = date_range.start().get('year').getInfo();
    //var pixel_count = snowline.flatten().size().getInfo(); Doesn't work for datasets that are too large - didn't really need it anyway.
    
    // Export with client side info in the titles
    Export.table.toDrive({
      collection: results.flatten(),
      description: 'NSL_' + collection_name + '_DAT' + start_date + '-' + end_date, //+ '_PIX' + pixel_count,
      folder: ''+ year,
      fileNamePrefix: 'NSL_' + collection_name + '_DAT' + start_date + '-'  + end_date, //+ '_PIX' + pixel_count,
      fileFormat: 'CSV',
      //selectors: ["sun_elevation"]
    });
    },
  }));

// Direct Download Link
var link_label = ui.Label({
  value: 'Click Here to Download Data',
  style: {
            whiteSpace: 'pre',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'centre',
          }
});
var url_button = ui.Button({
  label: 'Get Direct Download Link',
  onClick: function() {
     // Pull info to client side
    var collection_name = ee.String(collection.first().get('SPACECRAFT_ID')).replace('_', '').getInfo();
    var start_date = date_range.start().format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
    var end_date = date_range.end().format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
    var year = date_range.start().get('year').getInfo();
    //var pixel_count = snowline.flatten().size().getInfo();
    
    // Export with client side info in the titles
    var url = results.flatten().getDownloadURL({
      format: 'CSV',
      filename: 'NSL_' + collection_name + '_DAT' + start_date + '-'  + end_date //+ '_PIX' + pixel_count,
    });
    link_label.setUrl(url);
    print(link_label);
  }
  });
print(url_button);

/** Plotting **/
function scatterplotter(dataset, y_name, x_name, series_names, colours, title_main, title_y, title_x) {
  
  // Sample Data
  var dataset_with_random_colomn = dataset.randomColumn('random');
  var sample_data = dataset_with_random_colomn.filter(ee.Filter.lt('random', 0.05));
  
  // Extract X and Y columns
  var y_value = ee.List(sample_data.flatten().reduceColumns({
    reducer: ee.Reducer.toList(),
    selectors: [y_name],
    weightSelectors: null
  }).get('list'));
  var x_value = ee.List(sample_data.flatten().reduceColumns({
    reducer: ee.Reducer.toList(),
    selectors: [x_name],
    weightSelectors: null
  }).get('list'));
  
  // Plot
  var scatterchart = ui.Chart.array.values({
    array: y_value, axis: 0, xLabels: x_value
  })
    .setSeriesNames(series_names)
    .setOptions({
       title: title_main,
      colors: colours,
      pointSize: 4,
      dataOpacity: 0.2,
      hAxis: {
        'title': title_x,
        titleTextStyle: {italic: false, bold: true}
      },
      vAxis: {
        'title': title_y,
        titleTextStyle: {italic: false, bold: true}
      },
    explorer: {
      axis: 'horizontal',
      maxZoomOut: 2,
      maxZoomIn: 0.1}
    });
print(scatterchart);
}
print(ui.Button({
  label: 'Plot a Random Sample of the Snowline Elevation Data',
  onClick: function() {
    print('WARNING: Success will vary dependant on size of results.');
    scatterplotter(
      results,
      'Elevation_/_m',
      'Distance_from_Start_of_Transect_/_m',
      ['Elevation'],
      ['Red'],
      'Snowline Elevation by Tansect Distance',
      'Elevation / m asl',
      'Distance / km'
      )}}));