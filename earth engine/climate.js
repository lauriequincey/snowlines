/** G | Generate Transect Geometry **/
// | G1 Declare Transect Length with Line Geometry
var transect_line = ee.Geometry.LineString(
   [[4.88,  61.7],
   [9.13,   61.7]]);

// G2 | Declare Transect Width
var transect_width = 40000; // larger transect lengths need smaller transect widths.

// G3 | Generate Geodesic Multi-Direction Rectangular Transect Area
var buffered_transect_line = transect_line.buffer(transect_width/2);
var buffered_transect_line_coords = ee.List(buffered_transect_line.coordinates().get(0));
var lt_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(0)));  // left top
var lb_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(11))); // left bottom
var rb_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(13))); // right bottom
var rt_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(24))); // right top
var transect = ee.Geometry.Polygon({
  coords: [lt_coord, lb_coord, rb_coord, rt_coord],
  geodesic: true,
});
Map.centerObject(transect).addLayer(transect);

/** Generate Date Range **/
var date_list = ee.List([
  //////////////ee.Date('1981-07-14'), // cannot use as winter 1990 is not present! Didnt need to anyway
  ee.Date('1982-07-16'),
//  ee.Date('1983-08-11'),
  ////ee.Date('1984-07-15'),
//  ee.Date('1985-07-10'),
  ////ee.Date('1986-06-24'),
//  ee.Date('1987-08-23'),
//  ee.Date('1988-06-26'),
//  ee.Date('1989-07-24'),
  ////ee.Date('1990-09-01'),
//  ee.Date('1991-07-22'),
  ////ee.Date('1992-06-27'),
//  ee.Date('1993-07-19'),
//  ee.Date('1994-07-25'),
//  ee.Date('1995-07-20'),
//  ee.Date('1996-07-04'),
//  ee.Date('1997-07-13'),
//  ee.Date('1998-07-23'),
  ////ee.Date('1999-07-29'),
//  ee.Date('2000-07-17'),
//  ee.Date('2001-06-28'),
  ////ee.Date('2002-07-05'),
  ////ee.Date('2003-07-12'),
//  ee.Date('2004-07-27'),
  ////ee.Date('2005-08-03'),
  ////ee.Date('2006-06-29'),
//  ee.Date('2007-07-08'),
  ////ee.Date('2008-07-22'),
//  ee.Date('2009-07-25'),
//  ee.Date('2010-07-04'),
//  ee.Date('2011-07-07'),
  ////ee.Date('2012-08-02'),
  ////ee.Date('2013-07-14'),
  ////ee.Date('2014-07-11'),
//  ee.Date('2015-08-18'),
//  ee.Date('2016-06-15'),
//  ee.Date('2017-07-03'),
//  ee.Date('2018-06-02'),
//  ee.Date('2019-06-27'),
  ////ee.Date('2020-06-27'),
  ////ee.Date('2021-07-08'),
  ]);

/** For loop over the date list to get climate data for each date. This takes some time! **/
var i = 0;
for (i = 0; i < 50; i++) { 
  
  var start_date = ee.Date(date_list.get(i));

// Create a date range from this start date by using start date and advancing it by 13 days to find the end date.
var date_range = ee.DateRange(start_date, start_date.advance(16, 'day'));

/** E | Generate Environment Image **/
// Info: Comment out most of the variables and only download the ones you need. If you want many, download in multiple reruns of the algorithm.

// Declare reducer function (mean and standard deviation)
var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true
});

// Declare ERA5 Climate Datsets and calculate means and standard deviations for date range, summer, winter, spring, autumn, year.
// ERA5Land Mean and SD
var era5land_date_range = ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
  .select(["temperature_2m", "snowfall", "snowmelt", "surface_latent_heat_flux", "surface_sensible_heat_flux", "surface_solar_radiation_downwards", "snow_evaporation"])
  .filterBounds(transect)
  .filterDate(date_range)
  .reduce(reducers);
var era5land_summer = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .select(["temperature_2m", "snowfall", "snowmelt", "surface_latent_heat_flux", "surface_sensible_heat_flux", "surface_solar_radiation_downwards", "snow_evaporation"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 06, 01), ee.Date.fromYMD(date_range.end().get('year'), 8, 31)))
  .reduce(reducers);
var era5land_winter = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .select(["temperature_2m", "snowfall", "snowmelt", "surface_latent_heat_flux", "surface_sensible_heat_flux", "surface_solar_radiation_downwards", "snow_evaporation"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year').subtract(1), 12, 01), ee.Date.fromYMD(date_range.end().get('year'), 02, 28))) // why subtract 1 year? for any given year winter covers december of the previous year and jan-feb of the given year. Or does it cover december of the given year and jan-feb of the following year? As im dealing with snow, it 'sets' up the season for snowmelt. Therefore, the previous december is used.
  .reduce(reducers);
var era5land_spring = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .select(["temperature_2m", "snowfall", "snowmelt", "surface_latent_heat_flux", "surface_sensible_heat_flux", "surface_solar_radiation_downwards", "snow_evaporation"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 03, 01), ee.Date.fromYMD(date_range.end().get('year'), 05, 28)))
  .reduce(reducers);
var era5land_autumn = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .select(["temperature_2m", "snowfall", "snowmelt", "surface_latent_heat_flux", "surface_sensible_heat_flux", "surface_solar_radiation_downwards", "snow_evaporation"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year').subtract(1), 9, 01), ee.Date.fromYMD(date_range.end().get('year'), 11, 30)))
  .reduce(reducers);
var era5land_year = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .select(["temperature_2m", "snowfall", "snowmelt", "surface_latent_heat_flux", "surface_sensible_heat_flux", "surface_solar_radiation_downwards", "snow_evaporation"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 01, 01), ee.Date.fromYMD(date_range.end().get('year'), 12, 31)))
  .reduce(reducers);
  
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
var era5land_wind_date_range = ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
  .select(["u_component_of_wind_10m", "v_component_of_wind_10m"])
  .filterBounds(transect)
  .filterDate(date_range);
var era5land_wind_summer = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .select(["u_component_of_wind_10m", "v_component_of_wind_10m"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 06, 01), ee.Date.fromYMD(date_range.end().get('year'), 8, 31)));
var era5land_wind_winter = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .select(["u_component_of_wind_10m", "v_component_of_wind_10m"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year').subtract(1), 12, 01), ee.Date.fromYMD(date_range.end().get('year'), 02, 28)));
var era5land_wind_spring = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .select(["u_component_of_wind_10m", "v_component_of_wind_10m"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 03, 01), ee.Date.fromYMD(date_range.end().get('year'), 05, 28)));
var era5land_wind_autumn = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .select(["u_component_of_wind_10m", "v_component_of_wind_10m"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 9, 01), ee.Date.fromYMD(date_range.end().get('year'), 11, 30)));
var era5land_wind_year = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_BY_HOUR')
  .select(["u_component_of_wind_10m", "v_component_of_wind_10m"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 01, 01), ee.Date.fromYMD(date_range.end().get('year'), 12, 31)));
// Calculate Windspeeds and Directions
var era5land_windspeed_date_range = era5land_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5land_windspeed_summer = era5land_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5land_windspeed_winter = era5land_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5land_windspeed_spring = era5land_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5land_windspeed_autumn = era5land_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5land_windspeed_year = era5land_wind_date_range.map(function(image) {
  return windspeed_expression(image);
}).reduce(reducers);
var era5land_wind_direction_date_range = era5land_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);
var era5land_wind_direction_summer = era5land_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);
var era5land_wind_direction_winter = era5land_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);
var era5land_wind_direction_spring = era5land_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);
var era5land_wind_direction_autumn = era5land_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);
var era5land_wind_direction_year = era5land_wind_date_range.map(function(image) {
  return wind_direction_expression(image);
}).reduce(reducers);

// Terrain Dataset
// +- 5m https://www.mdpi.com/2072-4292/13/22/4653/pdf. Arctic DEM (https://developers.google.com/earth-engine/datasets/catalog/UMN_PGC_ArcticDEM_V3_2m_mosaic) is also a possibility and is at 2m (!) resolution, 4m error. Porblem is that is has holes in it.
// see https://www.mdpi.com/2072-4292/13/22/4653/pdf for a good comparisons in error of some dems over the arctic.
var elevation = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
    .filterBounds(transect)
    .select(['DSM'], ['altitude'])
    .mosaic()
    .reproject({crs: 'EPSG:4326', scale: 30}); // reproject so the mosaic is uniform for the terrain calculations. Necessary, see: https://developers.google.com/earth-engine/guides/projections#reprojecting

// Put together environmental image
var environmental_image = ee.Image().addBands([
  
  // Coordinates
//  ee.Image.pixelLonLat()
//    .rename(['longitude', 'latitude']),
//    
//  // Elevation
//  elevation,
//
//  // Aspect
//  ee.Terrain.aspect(elevation)
//    .rename('aspect')
//    .double(),
//    
//  // Slope Angle
//  ee.Terrain.slope(elevation)
//  .rename('slope')
//  .double(),
//  
//  // Base Terrain Height Error of JAXAexc ALOS
//  ee.Image.constant(5).rename('altitudinal_base_error'),
//  
//  // Mean Temperature
//  era5land_date_range.select(['temperature_2m_mean'], ['temperature_2m_by_date_range_mean']),
//  era5land_summer.select(['temperature_2m_mean'], ['temperature_2m_by_summer_mean']),
//  era5land_winter.select(['temperature_2m_mean'], ['temperature_2m_by_winter_mean']),
//  era5land_spring.select(['temperature_2m_mean'], ['temperature_2m_by_spring_mean']),
  era5land_autumn.select(['temperature_2m_mean'], ['temperature_2m_by_autumn_mean']),
//  era5land_year.select(['temperature_2m_mean'], ['temperature_2m_by_year_mean']),
//  era5land_date_range.select(['temperature_2m_stdDev'], ['temperature_2m_by_date_range_stddev']),
//  era5land_summer.select(['temperature_2m_stdDev'], ['temperature_2m_by_summer_stddev']),
//  era5land_winter.select(['temperature_2m_stdDev'], ['temperature_2m_by_winter_stddev']),
//  era5land_spring.select(['temperature_2m_stdDev'], ['temperature_2m_by_spring_stddev']),
  era5land_autumn.select(['temperature_2m_stdDev'], ['temperature_2m_by_autumn_stddev']),
//  era5land_year.select(['temperature_2m_stdDev'], ['temperature_2m_by_year_stddev']),
//  
//  // Mean Snowfall
//  era5land_date_range.select(['snowfall_mean'], ['snowfall_by_date_range_mean']),
//  era5land_summer.select(['snowfall_mean'],['snowfall_by_summer_mean']),
//  era5land_winter.select(['snowfall_mean'],['snowfall_by_winter_mean']),
//  era5land_spring.select(['snowfall_mean'],['snowfall_by_spring_mean']),
  era5land_autumn.select(['snowfall_mean'],['snowfall_by_autumn_mean']),
//  era5land_year.select(['snowfall_mean'],['snowfall_by_year_mean']),
//  era5land_date_range.select(['snowfall_stdDev'], ['snowfall_by_date_range_stddev']),
//  era5land_summer.select(['snowfall_stdDev'],['snowfall_by_summer_stddev']),
//  era5land_winter.select(['snowfall_stdDev'],['snowfall_by_winter_stddev']),
//  era5land_spring.select(['snowfall_stdDev'],['snowfall_by_spring_stddev']),
  era5land_autumn.select(['snowfall_stdDev'],['snowfall_by_autumn_stddev']),
//  era5land_year.select(['snowfall_stdDev'],['snowfall_by_year_stddev']),
//  
//  // Mean Snowmelt
//  era5land_date_range.select(['snowmelt_mean'], ['snowmelt_by_date_range_mean']),
//  era5land_summer.select(['snowmelt_mean'],['snowmelt_by_summer_mean']),
//  era5land_winter.select(['snowmelt_mean'],['snowmelt_by_winter_mean']),
//  era5land_spring.select(['snowmelt_mean'],['snowmelt_by_spring_mean']),
  era5land_autumn.select(['snowmelt_mean'],['snowmelt_by_autumn_mean']),
//  era5land_year.select(['snowmelt_mean'],['snowmelt_by_year_mean']),
//  era5land_date_range.select(['snowmelt_stdDev'], ['snowmelt_by_date_range_stddev']),
//  era5land_summer.select(['snowmelt_stdDev'],['snowmelt_by_summer_stddev']),
//  era5land_winter.select(['snowmelt_stdDev'],['snowmelt_by_winter_stddev']),
//  era5land_spring.select(['snowmelt_stdDev'],['snowmelt_by_spring_stddev']),
  era5land_autumn.select(['snowmelt_stdDev'],['snowmelt_by_autumn_stddev']),
//  era5land_year.select(['snowmelt_stdDev'],['snowmelt_by_year_stddev']),
//
//  // Mean Snow Evaporation (Sublimation)
//  era5land_date_range.select(['snow_evaporation_mean'], ['snow_evaporation_by_date_range_mean']),
//  era5land_summer.select(['snow_evaporation_mean'],['snow_evaporation_by_summer_mean']),
//  era5land_winter.select(['snow_evaporation_mean'],['snow_evaporation_by_winter_mean']),
//  era5land_spring.select(['snow_evaporation_mean'],['snow_evaporation_by_spring_mean']),
  era5land_autumn.select(['snow_evaporation_mean'],['snow_evaporation_by_autumn_mean']),
//  era5land_year.select(['snow_evaporation_mean'],['snow_evaporation_by_year_mean']),
//  era5land_date_range.select(['snow_evaporation_stdDev'], ['snow_evaporation_by_date_range_stddev']),
//  era5land_summer.select(['snow_evaporation_stdDev'],['snow_evaporation_by_summer_stddev']),
//  era5land_winter.select(['snow_evaporation_stdDev'],['snow_evaporation_by_winter_stddev']),
//  era5land_spring.select(['snow_evaporation_stdDev'],['snow_evaporation_by_spring_stddev']),
  era5land_autumn.select(['snow_evaporation_stdDev'],['snow_evaporation_by_autumn_stddev']),
//  era5land_year.select(['snow_evaporation_stdDev'],['snow_evaporation_by_year_stddev']),
//   
//// SPLIT DATA HERE -----------------------   
//   
//// CAUTION: Wind data can be troublesome to export for some reason.
//// It does work but it seems to randomly fail (computation time out after 20 mins) for some export years.
//// If so, just wait for everything to finish and rerun the failed year again and hope for the best - good luck
//
//  // Mean Windspeed
//  era5land_windspeed_date_range.select(['wind_speed_mean'], ['windspeed_10m_by_date_range_mean']),
//  era5land_windspeed_summer.select(['wind_speed_mean'], ['windspeed_10m_by_summer_mean']),
//  era5land_windspeed_winter.select(['wind_speed_mean'], ['windspeed_10m_by_winter_mean']),
//  era5land_windspeed_spring.select(['wind_speed_mean'], ['windspeed_10m_by_spring_Mean_/_ms-1']),
  era5land_windspeed_autumn.select(['wind_speed_mean'], ['windspeed_10m_by_autumn_mean_/_ms-1']),
//  era5land_windspeed_year.select(['wind_speed_mean'], ['windspeed_10m_by_year_mean']),
//  era5land_windspeed_date_range.select(['wind_speed_stdDev'], ['windspeed_10m_by_date_range_stddev']),
//  era5land_windspeed_summer.select(['wind_speed_stdDev'], ['windspeed_10m_by_Summer_stddev']),
//  era5land_windspeed_winter.select(['wind_speed_stdDev'], ['windspeed_10m_by_Winter_stddev']),
//  era5land_windspeed_spring.select(['wind_speed_stdDev'], ['windspeed_10m_by_Spring_stddev']),
  era5land_windspeed_autumn.select(['wind_speed_stdDev'], ['windspeed_10m_by_autumn_stddev']),
//  era5land_windspeed_year.select(['wind_speed_stdDev'], ['windspeed_10m_by_year_stddev']),
//  
//  // Mean Wind Direction
//  era5land_wind_direction_date_range.select(['wind_direction_mean'], ['wind_direction_10m_by_date_range_mean']),
//  era5land_wind_direction_summer.select(['wind_direction_mean'], ['wind_direction_10m_by_summer_mean']),
//  era5land_wind_direction_winter.select(['wind_direction_mean'], ['wind_direction_10m_by_winter_mean']),
//  era5land_wind_direction_spring.select(['wind_direction_mean'], ['wind_direction_10m_by_spring_mean']),
  era5land_wind_direction_autumn.select(['wind_direction_mean'], ['wind_direction_10m_by_autumn_mean']),
//  era5land_wind_direction_year.select(['wind_direction_mean'], ['wind_direction_10m_by_year_mean']),
//  era5land_wind_direction_date_range.select(['wind_direction_stdDev'], ['wind_direction_10m_by_date_range_stddev']),
//  era5land_wind_direction_summer.select(['wind_direction_stdDev'], ['wind_direction_10m_by_summer_stddev']),
//  era5land_wind_direction_winter.select(['wind_direction_stdDev'], ['wind_direction_10m_by_winter_stddev']),
//  era5land_wind_direction_spring.select(['wind_direction_stdDev'], ['wind_direction_10m_by_spring_stddev']),
  era5land_wind_direction_autumn.select(['wind_direction_stdDev'], ['wind_direction_10m_by_autumn_stddev']),
//  era5land_wind_direction_year.select(['wind_direction_stdDev'], ['wind_direction_10m_by_year_stddev']),
//
//// SPLIT DATA HERE -----------------------  
//
//  // Surface Latent Heat Flux
//  era5land_date_range.select(['surface_latent_heat_flux_mean'], ['surface_latent_heat_flux_By_date_range_mean']),
//  era5land_summer.select(['surface_latent_heat_flux_mean'],['surface_latent_heat_flux_by_summer_mean']),
//  era5land_winter.select(['surface_latent_heat_flux_mean'],['surface_latent_heat_flux_by_winter_mean']),
//  era5land_spring.select(['surface_latent_heat_flux_mean'],['surface_latent_heat_flux_by_spring_mean']),
  era5land_autumn.select(['surface_latent_heat_flux_mean'],['surface_latent_heat_flux_by_autumn_mean']),
//  era5land_year.select(['surface_latent_heat_flux_mean'],['surface_latent_heat_flux_by_year_mean']),
//  era5land_date_range.select(['surface_latent_heat_flux_stdDev'], ['surface_latent_heat_flux_by_date_range_stddev']),
//  era5land_summer.select(['surface_latent_heat_flux_stdDev'],['surface_latent_heat_flux_by_summer_stddev']),
//  era5land_winter.select(['surface_latent_heat_flux_stdDev'],['surface_latent_heat_flux_by_winter_stddev']),
//  era5land_spring.select(['surface_latent_heat_flux_stdDev'],['surface_latent_heat_flux_by_spring_stddev']),
  era5land_autumn.select(['surface_latent_heat_flux_stdDev'],['surface_latent_heat_flux_by_autumn_stddev']),
//  era5land_year.select(['surface_latent_heat_flux_stdDev'],['surface_latent_heat_flux_by_year_stddev']),
//
//  // Surface Sensible Heat Flux
//  era5land_date_range.select(['surface_sensible_heat_flux_mean'], ['surface_sensible_heat_flux_by_date_range_mean']),
//  era5land_summer.select(['surface_sensible_heat_flux_mean'],['surface_sensible_heat_flux_by_summer_mean']),
//  era5land_winter.select(['surface_sensible_heat_flux_mean'],['surface_sensible_heat_flux_by_winter_mean']),
//  era5land_spring.select(['surface_sensible_heat_flux_mean'],['surface_sensible_heat_flux_by_spring_mean']),
  era5land_autumn.select(['surface_sensible_heat_flux_mean'],['surface_sensible_heat_flux_by_autumn_mean']),
//  era5land_year.select(['surface_sensible_heat_flux_mean'],['surface_sensible_heat_flux_by_year_mean']),
//  era5land_date_range.select(['surface_sensible_heat_flux_stdDev'], ['surface_sensible_heat_flux_by_date_range_stddev']),
//  era5land_summer.select(['surface_sensible_heat_flux_stdDev'],['surface_sensible_heat_flux_by_summer_stddev']),
//  era5land_winter.select(['surface_sensible_heat_flux_stdDev'],['surface_sensible_heat_flux_by_winter_stddev']),
//  era5land_spring.select(['surface_sensible_heat_flux_stdDev'],['surface_sensible_heat_flux_by_spring_stddev']),
  era5land_autumn.select(['surface_sensible_heat_flux_stdDev'],['surface_sensible_heat_flux_by_autumn_stddev']),
//  era5land_year.select(['surface_sensible_heat_flux_stdDev'],['surface_sensible_heat_flux_by_year_stddev']),
//
//  // Surface Downward Solar Radiation
//  era5land_date_range.select(['surface_solar_radiation_downwards_mean'], ['surface_solar_radiation_downwards_by_date_range_mean']),
//  era5land_summer.select(['surface_solar_radiation_downwards_mean'],['surface_solar_radiation_downwards_by_summer_mean']),
//  era5land_winter.select(['surface_solar_radiation_downwards_mean'],['surface_solar_radiation_downwards_by_winter_mean']),
//  era5land_spring.select(['surface_solar_radiation_downwards_mean'],['surface_solar_radiation_downwards_by_spring_mean']),
  era5land_autumn.select(['surface_solar_radiation_downwards_mean'],['surface_solar_radiation_downwards_by_autumn_mean']),
//  era5land_year.select(['surface_solar_radiation_downwards_mean'],['surface_solar_radiation_downwards_by_year_mean']),
//  era5land_date_range.select(['surface_solar_radiation_downwards_stdDev'], ['surface_solar_radiation_downwards_by_date_range_stddev']),
//  era5land_summer.select(['surface_solar_radiation_downwards_stdDev'],['surface_solar_radiation_downwards_by_summer_stddev']),
//  era5land_winter.select(['surface_solar_radiation_downwards_stdDev'],['surface_solar_radiation_downwards_by_winter_stddev']),
//  era5land_spring.select(['surface_solar_radiation_downwards_stdDev'],['surface_solar_radiation_downwards_by_spring_stddev']),
  era5land_autumn.select(['surface_solar_radiation_downwards_stdDev'],['surface_solar_radiation_downwards_by_autumn_stddev']),
//  era5land_year.select(['surface_solar_radiation_downwards_stdDev'],['surface_solar_radiation_downwards_by_year_stddev']),
  ]);
  
/** V | Import Elevation Data, Threshold, and Vectorise **/
var elevation = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
  .filterBounds(transect)
  .select(['DSM'], ['Elevation_/_m'])
  .mosaic();
var thresholded_elevation = elevation.gt(1000).and(elevation.lt(1010)).selfMask();
Map.addLayer(thresholded_elevation);
var  thresholded_elevation = thresholded_elevation.sampleRegions({ // turns each pixel into a point feature
    collection: transect,
    properties: null,
    scale: 30,
    projection: null,
    tileScale: 1,
    geometries: true
  });

  // Add Distances Along Transect from 
  var start_line = ee.Geometry.LineString([lt_coord, lb_coord]);
  var transect_distances = thresholded_elevation.map(function(point) {
    var distance = point.geometry().distance(start_line);
    return point.set('distance', distance);
  });
  var transect_distances = transect_distances.reduceToImage(['distance'], ee.Reducer.mean())
    .rename('distance_from_start_of_transect')
    .divide(1000);

// Add environmental image and distances
var metrics_and_environmental_image = environmental_image.addBands(transect_distances);

// Get a Table of Environmental Data at the Thresholded Elevation
var results =  metrics_and_environmental_image.reduceRegions({
      collection: thresholded_elevation,
      reducer: ee.Reducer.mean(),
      scale: 30
      })
      .select(metrics_and_environmental_image.bandNames().remove('constant'), metrics_and_environmental_image.bandNames().remove('constant'), true); // false removes geometry

/** X | Export **/
    // Pull info to client side
    var start_date = date_range.start().format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
    var end_date = date_range.end().format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
    var year = date_range.start().get('year').getInfo();
    //var pixel_count = results.size().getInfo();
    
    // Export with client side info in the titles
    Export.table.toDrive({
      collection: results,
      description: 'climate_part3' + '_DATE' + start_date + '-' + end_date,// + '_PIX'// + pixel_count,
      folder: '' + year,
      fileNamePrefix: 'climate_part3' + '_DATE' + start_date + '-' + end_date,// + '_PIX'// + pixel_count,
      fileFormat: 'CSV'
    });

  // Direct Download Link
//  var link_label = ui.Label({
//    value: 'Click Here to Download Data',
//    style: {
//              whiteSpace: 'pre',
//              fontSize: '12px',
//              fontWeight: 'bold',
//              textAlign: 'centre',
//            }
//  });
//  var url_button = ui.Button({
//    label: 'Get Direct Download Link',
//    onClick: function() {
//       // Pull info to client side
//      var start_date = date_range.start().format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
//      var end_date = date_range.end().format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
//      
//      // Export with client side info in the titles
//      var url = results.flatten().getDownloadURL({
//        format: 'CSV',
//        filename: 'Climate500' + '_DAT' + start_date + '-'  + end_date
//      });
//      link_label.setUrl(url);
//      print(link_label);
//    }
//    });
//  print(url_button);

}