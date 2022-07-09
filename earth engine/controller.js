/** Dependencies **/
var transectModule = require('users/lauriequincey/snowlines/transect.js');
var imageryModule = require('users/lauriequincey/snowlines/imagery.js');
var snowlinesModule = require('users/lauriequincey/snowlines/snowline.js');
var climateModule = require('users/lauriequincey/snowlines/climate.js');
var validationModule = require('users/lauriequincey/snowlines/validation.js');
var sunModule = require('users/lauriequincey/snowlines/sun.js');

/** Inputs **/
var inputs = {
  transectLine: ee.Geometry.LineString([[4.88,  61.7], [9.13,   61.7]]),
  transectWidth: 40,
  advanceDays: 16,
  satelliteName: 'Landsat 8',
  startDate: '2018-06-02',//'2021-02-21', '2014-07-11',
  datesAndSatelltes: [
    {startDate:'1985-07-10', satelliteName: 'Landsat 5'},
    {startDate:'1986-06-24', satelliteName: 'Landsat 5'},
    {startDate:'1987-08-23', satelliteName: 'Landsat 5'},
    {startDate:'1988-06-26', satelliteName: 'Landsat 5'},
    {startDate:'1989-07-24', satelliteName: 'Landsat 5'},
    {startDate:'1991-07-22', satelliteName: 'Landsat 5'},
    {startDate:'1992-06-27', satelliteName: 'Landsat 5'},
    {startDate:'1993-07-19', satelliteName: 'Landsat 5'},
    {startDate:'1994-07-25', satelliteName: 'Landsat 5'},
    {startDate:'1995-07-20', satelliteName: 'Landsat 5'},
    {startDate:'1997-07-13', satelliteName: 'Landsat 5'},
    {startDate:'1998-07-23', satelliteName: 'Landsat 5'},
    {startDate:'1999-07-29', satelliteName: 'Landsat 5'},
    {startDate:'1999-07-29', satelliteName: 'Landsat 7'},
    {startDate:'2000-07-17', satelliteName: 'Landsat 5'},
    {startDate:'2000-07-17', satelliteName: 'Landsat 7'},
    {startDate:'2002-07-05', satelliteName: 'Landsat 7'},
    {startDate:'2003-07-12', satelliteName: 'Landsat 5'},
    {startDate:'2003-07-12', satelliteName: 'Landsat 7'},
    {startDate:'2004-07-27', satelliteName: 'Landsat 5'},
    {startDate:'2004-07-27', satelliteName: 'Landsat 7'},
    {startDate:'2005-08-03', satelliteName: 'Landsat 5'},
    {startDate:'2006-06-29', satelliteName: 'Landsat 5'},
    {startDate:'2006-06-29', satelliteName: 'Landsat 7'},
    {startDate:'2007-07-08', satelliteName: 'Landsat 5'},
    {startDate:'2008-07-22', satelliteName: 'Landsat 5'},
    {startDate:'2013-07-14', satelliteName: 'Landsat 7'},
    {startDate:'2013-07-14', satelliteName: 'Landsat 8'},
    {startDate:'2014-07-11', satelliteName: 'Landsat 7'},
    {startDate:'2014-07-11', satelliteName: 'Landsat 8'},
    {startDate:'2015-08-18', satelliteName: 'Landsat 7'},
    {startDate:'2015-08-18', satelliteName: 'Landsat 8'},
    {startDate:'2016-06-15', satelliteName: 'Landsat 7'},
    {startDate:'2016-06-15', satelliteName: 'Landsat 8'},
    {startDate:'2017-07-03', satelliteName: 'Landsat 8'},
    {startDate:'2018-06-02', satelliteName: 'Landsat 7'},
    {startDate:'2018-06-02', satelliteName: 'Landsat 8'},
    {startDate:'2019-06-27', satelliteName: 'Landsat 7'},
    {startDate:'2019-06-27', satelliteName: 'Landsat 8'},
    {startDate:'2020-06-27', satelliteName: 'Landsat 8'},
    {startDate:'2021-07-08', satelliteName: 'Landsat 8'},
  ],
  years: [
    '1981',
    '1982',
    '1983',
    '1984',
    '1985',
    '1986',
    '1987',
    '1988',
    '1989',
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021'
    ]
};

/** Run **/
// Necessary
var transect = transectModule.transectGenerator(inputs.transectLine, inputs.transectWidth);

// Snowline
var imagery = imageryModule.imageryLoader(inputs.startDate, inputs.advanceDays, inputs.satelliteName, transect.transect);
var snowline = snowlinesModule.snowlinesAlgorithm(transect.transect, imagery.imageCollection, transect.ltCoord, transect.lbCoord);

// Climate
var climate = climateModule.climate(transect.transect, transect.ltCoord, transect.lbCoord, inputs.startDate);

// Validation
var validation = validationModule.validation(transect.transect);
var sun = sunModule.sun(inputs.datesAndSatelltes, transect.transect, inputs.advanceDays);

/** Visualise Snowline **/
Map.centerObject(transect.transect);
function trueColourScaler(image) {
  var opticalBands = image.select(['Red', 'Green', 'Blue']).multiply(0.0000275).add(-0.2);
  return image.addBands(opticalBands, null, true);
}
Map.addLayer(imagery.imageCollection, {}, 'Raw Imagery', 0, 1);
Map.addLayer(trueColourScaler(snowline.qualityMosaic), {bands: ['Red', 'Green', 'Blue'], min: 0, max: 0.4, gamma: 1.4}, 'Quality Mosaic', 1, 1);
Map.addLayer(snowline.waterMask.not().selfMask(), {palette: 'blue'}, 'Water Mask', 1, 0.3);
Map.addLayer(snowline.glacierMask.not().selfMask(), {palette: 'cyan'}, 'Glacier Mask', 1, 0.3);
Map.addLayer(snowline.qualityMosaic.select('cloudMask').selfMask(), {palette: ['yellow']}, 'Cloud Mask', 1, 0.7);
Map.addLayer(snowline.qualityMosaic.select('shadowMask').selfMask(), {palette: ['pink']}, 'Cloud-Shadow and Water (low-reflectance) Mask', 1, 0.4);
Map.addLayer(snowline.snowEdgeRaster.select('snow_edge'), {palette: 'red'}, 'Snow-edge Raster', 1, 1);

/** Export **/
// Snowline
Export.table.toDrive({
  collection: snowline.snowEdgeVector,
  description: 'snowlinesSnowline' + 'Date' + inputs.startDate + 'Days' + inputs.advanceDays,
  folder: ''+ ee.Date(inputs.startDate).get('year').getInfo(),
  fileNamePrefix: 'snowlinesSnowline' + inputs.satelliteName + 'Date' + inputs.startDate + 'Days' + inputs.advanceDays,
  fileFormat: 'CSV',
  selectors: ['aqcuisition_time', 'distance', 'altitude', 'altitude_translation_error', 'longitude', 'latitude', 'aspect', 'slope', 'sun_elevation']
});

// Climate
Export.table.toDrive({
  collection: climate,
  description: 'snowlinesClimate' + 'Date' + ee.Date(inputs.startDate).get('year').getInfo(),
  folder: ''+ ee.Date(inputs.startDate).get('year').getInfo(),
  fileNamePrefix: 'snowlinesClimate' + 'Date' + ee.Date(inputs.startDate).get('year').getInfo(),
  fileFormat: 'CSV'
});

// Validation
Export.table.toDrive({
  collection: validation,
  description: 'snowlinesValidation',
  folder: 'validation',
  fileNamePrefix: 'snowlinesValidation',
  fileFormat: 'CSV'
});
Export.table.toDrive({
  collection: sun,
  description: 'snowlinesSun',
  folder: 'sun',
  fileNamePrefix: 'snowlinesSun',
  fileFormat: 'CSV'
});