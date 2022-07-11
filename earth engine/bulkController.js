// I should really use the Python API...

/** Dependencies **/
var transectModule = require('users/lauriequincey/snowlines:transect.js');
var imageryModule = require('users/lauriequincey/snowlines:imagery.js');
var snowlinesModule = require('users/lauriequincey/snowlines:snowline.js');
var climateModule = require('users/lauriequincey/snowlines:climate.js');
var validationModule = require('users/lauriequincey/snowlines:validation.js');
var sunModule = require('users/lauriequincey/snowlines:sun.js');

/** Inputs **/
var inputs = {
  transectLine: ee.Geometry.LineString([[4.88,  61.7], [9.13,   61.7]]),
  transectWidth: 40,
  advanceDays: 16,
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
inputs.datesAndSatelltes.map(function(entry) {
  
  var imagery = imageryModule.imageryLoader(entry.startDate, inputs.advanceDays, entry.satelliteName, transect.transect);
  var snowline = snowlinesModule.snowlinesAlgorithm(transect.transect, imagery.imageCollection, transect.ltCoord, transect.lbCoord);
  
  Export.table.toDrive({
    collection: snowline.snowEdgeVector,
    description: 'snowlinesSnowline' + 'Date' + entry.startDate + 'Days' + inputs.advanceDays,
    folder: ''+ ee.Date(entry.startDate).get('year').getInfo(),
    fileNamePrefix: 'snowlinesSnowline' + entry.satelliteName + 'Date' + entry.startDate + 'Days' + inputs.advanceDays,
    fileFormat: 'CSV',
    selectors: ['aqcuisition_time', 'distance', 'altitude', 'altitude_translation_error', 'longitude', 'latitude', 'aspect', 'slope', 'sun_elevation']
  });
  
});

// Climate
inputs.years.map(function(year) {
  
  var climate = climateModule.climate(transect.transect, transect.ltCoord, transect.lbCoord, year);

  Export.table.toDrive({
    collection: climate,
    description: 'snowlinesClimate' + 'Date' + year,
    folder: ''+ year,
    fileNamePrefix: 'snowlinesClimate' + 'Date' + year,
    fileFormat: 'CSV'
  });
  
});

// Validation
var validation = validationModule.validation(transect.transect);
Export.table.toDrive({
  collection: validation,
  description: 'snowlinesValidation',
  folder: 'validation',
  fileNamePrefix: 'snowlinesValidation',
  fileFormat: 'CSV'
});
var sun = sunModule.sun(inputs.datesAndSatelltes, transect.transect, inputs.advanceDays);
Export.table.toDrive({
  collection: sun,
  description: 'snowlinesSun',
  folder: 'sun',
  fileNamePrefix: 'snowlinesSun',
  fileFormat: 'CSV'
});