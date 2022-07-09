/* Info
 * Reterieve Climate Data
 * This script retreives climate data from the era5land dataset for each meteorological season in any given year from within a polygon.
 * Data are from the transect polygon generated in transect.js
 * Distances along the transect polygon are incorporated too.
 * Mean values are produced for each season with SEM. SEMs are of equal sample size (same hours of timesteps in each season).
 */

exports.climate = function(transect, ltCoord, lbCoord, date) {
  
  var serverDate = ee.Date(date);
  
  /** Metrics (Land Elevation and Transect Distance) **/
  // Import Land Surface Elevation 
  var metrics = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
    .filterBounds(transect)
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
      collection: transect,
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
          ee.Geometry.LineString([ltCoord, lbCoord])
        );
      return point.set('distance', distance.divide(1000)); // in km
    });
  
  
  /** Climate **/
  var climateVariables = ee.List([
    'temperature_2m',
    'snowfall',
    'snowmelt',
    'surface_latent_heat_flux',
    'surface_sensible_heat_flux',
    'surface_solar_radiation_downwards',
    'snow_evaporation'
  ]);
  
  var climate = ee.ImageCollection(ee.FeatureCollection([
  
    // Import
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(serverDate.get('year'), 06, 01), ee.Date.fromYMD(serverDate.get('year'), 8, 31))),
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(serverDate.get('year').subtract(1), 12, 01), ee.Date.fromYMD(serverDate.get('year'), 02, 28))),
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(serverDate.get('year'), 03, 01), ee.Date.fromYMD(serverDate.get('year'), 05, 28))),
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(serverDate.get('year').subtract(1), 9, 01), ee.Date.fromYMD(serverDate.get('year'), 11, 30)))
  ])
  // Reduce seasons...
  .map(function(season) {
    // ...to means
    var seasonMean = ee.ImageCollection(season).reduce(ee.Reducer.mean());
    // ...and SEMs
    var seasonSem = ee.ImageCollection(season).reduce(ee.Reducer.stdDev()).divide(ee.ImageCollection(season).size().sqrt())
      // Rename bands from the default "stdDev" to "_sem" as we calculate the standard error of the mean.
      .rename(ee.Image(seasonMean).bandNames().map(function(name){return ee.String(name).cat("_sem")}));
    return seasonMean.addBands(seasonSem);
    })
  ).toBands()
   .regexpRename({
     regex: "0",
     replacement: "summer",
     all: true
   })
   .regexpRename({
     regex: "1",
     replacement: "winter",
     all: true
   })
   .regexpRename({
   regex: "2",
   replacement: "spring",
   all: true
   })
   .regexpRename({
     regex: "3",
     replacement: "autumn",
     all: true
   });
  
  /** Sample Climate at Metrics Points **/
  return climate.reduceRegions({
    collection: metrics,
    reducer: ee.Reducer.mean(),
    scale: 11132
  });
  
};