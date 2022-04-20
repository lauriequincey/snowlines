/** Generate Transect Geometry **/
var transect_line = ee.Geometry.LineString(
   [[4.88,  61.7],
   [9.13,   61.7]]);

var transect_width = 40000; // larger transect lengths need smaller transect widths.

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

/** Date USER INPUT**/
var year = ee.Date('1981'); //<-- Enter year
var clientside_year = year.get('year').getInfo();

/** Import Climate **/
var era5land_summer = ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
  .select(["temperature_2m", "snowfall", "snowmelt", "surface_latent_heat_flux", "surface_sensible_heat_flux", "surface_solar_radiation_downwards", "snow_evaporation"], ["summer_temperature_2m", "summer_snowfall", "summer_snowmelt", "summer_surface_latent_heat_flux", "summer_surface_sensible_heat_flux", "summer_surface_solar_radiation_downwards", "summer_snow_evaporation"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year'), 06, 01), ee.Date.fromYMD(year.get('year'), 8, 31)));
var era5land_winter = ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
  .select(["temperature_2m", "snowfall", "snowmelt", "surface_latent_heat_flux", "surface_sensible_heat_flux", "surface_solar_radiation_downwards", "snow_evaporation"], ["winter_temperature_2m", "winter_snowfall", "winter_snowmelt", "winter_surface_latent_heat_flux", "winter_surface_sensible_heat_flux", "winter_surface_solar_radiation_downwards", "winter_snow_evaporation"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year').subtract(1), 12, 01), ee.Date.fromYMD(year.get('year'), 02, 28))); // why subtract 1 year? for any given year winter covers december of the previous year and jan-feb of the given year. Or does it cover december of the given year and jan-feb of the following year? As im dealing with snow, it 'sets' up the season for snowmelt. Therefore, the previous december is used.
var era5land_spring = ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
  .select(["temperature_2m", "snowfall", "snowmelt", "surface_latent_heat_flux", "surface_sensible_heat_flux", "surface_solar_radiation_downwards", "snow_evaporation"], ["spring_temperature_2m", "spring_snowfall", "spring_snowmelt", "spring_surface_latent_heat_flux", "spring_surface_sensible_heat_flux", "spring_surface_solar_radiation_downwards", "spring_snow_evaporation"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year'), 03, 01), ee.Date.fromYMD(year.get('year'), 05, 28)));
var era5land_autumn = ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
  .select(["temperature_2m", "snowfall", "snowmelt", "surface_latent_heat_flux", "surface_sensible_heat_flux", "surface_solar_radiation_downwards", "snow_evaporation"], ["autumn_temperature_2m", "autumn_snowfall", "autumn_snowmelt", "autumn_surface_latent_heat_flux", "autumn_surface_sensible_heat_flux", "autumn_surface_solar_radiation_downwards", "autumn_snow_evaporation"])
  .filterBounds(transect)
  .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year').subtract(1), 9, 01), ee.Date.fromYMD(year.get('year'), 11, 30)));

/** Pick Season and Reduce USER INPUT**/
var era5_season = era5land_winter; //<-- Enter season. Seasons: "summer", "winter", "spring", "autumn". Format: "era5land_winter" (no caps)  
var climate_mean = era5_season.reduce(ee.Reducer.mean());
var climate_stdev = era5_season.reduce(ee.Reducer.stdDev()).divide(era5_season.size().sqrt());
var climate = climate_mean.addBands(climate_stdev);

/** Get Elevation Contour **/
var elevation = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
    .filterBounds(transect)
    .select(['DSM'], ['altitude'])
    .mosaic()
    .reproject({crs: 'EPSG:4326', scale: 30}); // reproject so the mosaic is uniform for the terrain calculations. Necessary, see: https://developers.google.com/earth-engine/guides/projections#reprojecting
var thresholded_elevation = elevation.gt(995).and(elevation.lt(1005)).selfMask();
var thresholded_elevation = thresholded_elevation.sampleRegions({ // turns each pixel into a point feature
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
    .rename('distance')
    .divide(1000);

/** Reduce to Elevation **/
// Add environmental image and distances
var environ = transect_distances.addBands(climate);
var results =  environ.reduceRegions({
      collection: thresholded_elevation,
      reducer: ee.Reducer.mean(), // there is only 1 value for each band becuase its already been averaged - it does nothing. Dont beleive me? change it to count and see for yourself.
      scale: 11132 // resolution of era5land
      });

/** Export USER INPUT **/
//Export.table.toDrive({
//  collection: results,
//  description: 'climate_' + 'autumn' + '_' + clientside_year,
//  folder: '' + clientside_year,
//  fileNamePrefix: 'climate_' + 'autumn' + '_' + clientside_year,
//  fileFormat: 'CSV'
//});

print(results.getDownloadURL({format: "CSV", filename: 'climate_' + 'SEASON' + '_' + clientside_year})); // <-- Enter name of season here where it says "season". Make sure its in quotes. Can be named anything.