/* Info
 * Reterieve Climate Data
 * This script retreives climate data from the era5land dataset for each meteorological season in any given year from within a polygon.
 * Data are from the transect polygon generated in transect.js
 * Distances along the transect polygon are incorporated too.
 * Mean values are produced for each season with SEM. SEMs are of equal sample size (same hours of timesteps in each season).
 */

/** Dependencies **/
var module_transect = require("users/lauriequincey/snowlines:transect.js");

/** Year **/
var year = ee.Date('2019'); //<-- Enter year, then run
var clientside_year = year.get('year').getInfo();

/** Metrics (Land Elevation and Transect Distance) **/

// Import Land Surface Elevation 
var metrics = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
  .filterBounds(module_transect.transect)
  .select(['DSM'], ['altitude'])
  .mosaic() // mosaic as the JAXA data are an image collection not single raster.
  
// Reduce Elevation to scale of climate data by their mean
  .setDefaultProjection({crs: "EPSG:4326", scale: 11132})
  .reduceResolution({
    reducer: ee.Reducer.mean(),
    bestEffort: true
  })

// Vectorise
  .sampleRegions({
    collection: module_transect.transect,
    properties: null,
    scale: 11132, // at scale of climate data
    projection: null,
    tileScale: 1,
    geometries: true
  })

// Add Transect Distances (in km)
  .map(function(point) {
    
    // How far is each point...
    var distance = point
      .geometry()
      .distance(
        // ... to the start of the transect (a line between the left hand coordinates)
        ee.Geometry.LineString([module_transect.lt_coord, module_transect.lb_coord])
      );
    return point.set('distance', distance.divide(1000)); // in km
  
  });

/** Climate **/
var climate_variables = ee.List([
  'temperature_2m',
  'snowfall',
  'snowmelt',
  'surface_latent_heat_flux',
  'surface_sensible_heat_flux',
  'surface_solar_radiation_downwards',
  'snow_evaporation'
]);

var climate = ee.Dictionary({
  
  // Import
  summer: ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
            .select(climate_variables)
            .filterBounds(module_transect.transect)
            .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year'), 06, 01), ee.Date.fromYMD(year.get('year'), 8, 31))),
  winter: ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
            .select(climate_variables)
            .filterBounds(module_transect.transect)
            .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year').subtract(1), 12, 01), ee.Date.fromYMD(year.get('year'), 02, 28))),
  spring: ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
            .select(climate_variables)
            .filterBounds(module_transect.transect)
            .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year'), 03, 01), ee.Date.fromYMD(year.get('year'), 05, 28))),
  autumn: ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
            .select(climate_variables)
            .filterBounds(module_transect.transect)
            .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year').subtract(1), 9, 01), ee.Date.fromYMD(year.get('year'), 11, 30)))
})

  // Reduce seasons...
  .map(function(key, season) {
    
    // ...to means
    var season_mean = ee.ImageCollection(season).reduce(ee.Reducer.mean());
    
    // ...and SEMs
    var season_sem = ee.ImageCollection(season).reduce(ee.Reducer.stdDev()).divide(ee.ImageCollection(season).size().sqrt())
    
      // Rename bands from the default "stdDev" to "_sem" as we calculate the standard error of the mean.
      .rename(ee.Image(season_mean).bandNames().map(function(name){return ee.String(name).cat("_sem")}));
    
  return season_mean.addBands(season_sem);

});

/** Sample Climate at Metrics Points **/
var output = climate.map(function(key, season){

 return ee.Image(season)
  .reduceRegions({
    collection: metrics,
    reducer: ee.Reducer.mean(),
    scale: 11132
  });

});

/** Export **/

// Get list of each season name from the output (makes sure its in the right order) and pull to client side.
var season_names_list = output.keys().getInfo();

// We export each season individually to reduce file sizes and give more flexibility.
// Client side loop through the output dictionary
for (var i = 0; i < 4; i++) {
  
  // Get the season name for each iteration
  var season_name = season_names_list[i];

  // Print year and season
  print(clientside_year + " " + season_name);
  
  // Select Season from season name and get download url, then print it
  print(ee.FeatureCollection(output.get(season_name)).getDownloadURL({
    format: "CSV",
    filename: "climate_" + season_name + '_' + clientside_year
  }));
  
  // Cloud
  Export.table.toDrive({
    collection: output.get(season_name),
    description: "climate_" + season_name + '_' + clientside_year,
    folder: "climate_" + clientside_year,
    fileNamePrefix: "climate_" + season_name + '_' + clientside_year,
    fileFormat: "CSV"
  });
  
}