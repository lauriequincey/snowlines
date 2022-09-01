/* Info
 * This is a bulk download script to run all the study scripts and generate all the Norwegian study data at once.
 * Most exports should complete within 20mins.
 * Created by Laurie Quincey, 2022.
 */

/** Dependencies **/
var transectModule = require('users/lauriequincey/snowlines:transect.js');
var imageryModule = require('users/lauriequincey/snowlines:imagery.js');
var snowlineModule = require('users/lauriequincey/snowlines:snowline.js');
var climateModule = require('users/lauriequincey/snowlines:climate.js');
var validationModule = require('users/lauriequincey/snowlines:validation.js');

/** Inputs **/
var inputs = {
  transectLine: ee.Geometry.LineString([[4.88,  61.7], [9.13,   61.7]]),
  transectWidth: 40,
  advanceDays: 16,
  datesAndSatelltes: [ // for the snowline imagery
    //{startDate:'1981-07-14', satelliteName: 'Landsat 5'}, // fail
    //{startDate:'1982-07-16', satelliteName: 'Landsat 5'}, // fail
    //{startDate:'1983-08-11', satelliteName: 'Landsat 5'}, // fail
    {startDate:'1984-07-15', satelliteName: 'Landsat 5'}, // success... not enough data
    {startDate:'1985-07-10', satelliteName: 'Landsat 5'}, // success
    {startDate:'1986-06-24', satelliteName: 'Landsat 5'}, // success
    {startDate:'1987-08-23', satelliteName: 'Landsat 5'}, // success
    {startDate:'1988-06-26', satelliteName: 'Landsat 5'}, // success
    {startDate:'1989-07-24', satelliteName: 'Landsat 5'}, // success
    {startDate:'1990-09-01', satelliteName: 'Landsat 5'}, // success... not enough data
    {startDate:'1991-07-22', satelliteName: 'Landsat 5'}, // success
    {startDate:'1992-06-27', satelliteName: 'Landsat 5'}, // success
    {startDate:'1993-07-19', satelliteName: 'Landsat 5'}, // success
    {startDate:'1994-07-25', satelliteName: 'Landsat 5'}, // success
    {startDate:'1995-07-20', satelliteName: 'Landsat 5'}, // success
    //{startDate:'1996-07-04', satelliteName: 'Landsat 5'}, // fail
    {startDate:'1997-07-13', satelliteName: 'Landsat 5'}, // success
    {startDate:'1998-07-23', satelliteName: 'Landsat 5'}, // success
    {startDate:'1999-07-29', satelliteName: 'Landsat 5'}, // success
    {startDate:'1999-07-29', satelliteName: 'Landsat 7'}, // success
    {startDate:'2000-07-17', satelliteName: 'Landsat 5'}, // success
    {startDate:'2000-07-17', satelliteName: 'Landsat 7'}, // success
    {startDate:'2001-06-28', satelliteName: 'Landsat 5'}, // success
    {startDate:'2001-06-28', satelliteName: 'Landsat 7'}, // success
    //{startDate:'2002-07-05', satelliteName: 'Landsat 5'}, // fail
    {startDate:'2002-07-05', satelliteName: 'Landsat 7'}, // success
    {startDate:'2003-07-12', satelliteName: 'Landsat 5'}, // success
    {startDate:'2003-07-12', satelliteName: 'Landsat 7'}, // success
    {startDate:'2004-07-27', satelliteName: 'Landsat 5'}, // success
    {startDate:'2004-07-27', satelliteName: 'Landsat 7'}, // success
    {startDate:'2005-08-03', satelliteName: 'Landsat 5'}, // success
    //{startDate:'2005-08-03', satelliteName: 'Landsat 7'}, // fail
    {startDate:'2006-06-29', satelliteName: 'Landsat 5'}, // success
    {startDate:'2006-06-29', satelliteName: 'Landsat 7'}, // success
    {startDate:'2007-07-08', satelliteName: 'Landsat 5'}, // success
    //{startDate:'2007-07-08', satelliteName: 'Landsat 7'}, // fail
    {startDate:'2008-07-22', satelliteName: 'Landsat 5'}, // success
    //{startDate:'2008-07-22', satelliteName: 'Landsat 7'}, // fail
    {startDate:'2009-07-25', satelliteName: 'Landsat 5'}, // success... not enough data
    {startDate:'2009-07-25', satelliteName: 'Landsat 7'}, // success... not enough data
    {startDate:'2010-07-04', satelliteName: 'Landsat 5'}, // success... not enough data
    {startDate:'2010-07-04', satelliteName: 'Landsat 7'}, // success... not enough data
    {startDate:'2011-07-07', satelliteName: 'Landsat 5'}, // success
    {startDate:'2011-07-07', satelliteName: 'Landsat 7'}, // success
    {startDate:'2012-08-02', satelliteName: 'Landsat 7'}, // success
    {startDate:'2013-07-14', satelliteName: 'Landsat 7'}, // success
    {startDate:'2013-07-14', satelliteName: 'Landsat 8'}, // success
    {startDate:'2014-07-11', satelliteName: 'Landsat 7'}, // success
    {startDate:'2014-07-11', satelliteName: 'Landsat 8'}, // success
    {startDate:'2015-08-18', satelliteName: 'Landsat 7'}, // success
    {startDate:'2015-08-18', satelliteName: 'Landsat 8'}, // success
    {startDate:'2016-06-15', satelliteName: 'Landsat 7'}, // success
    {startDate:'2016-06-15', satelliteName: 'Landsat 8'}, // success
    {startDate:'2017-07-03', satelliteName: 'Landsat 7'}, // success
    {startDate:'2017-07-03', satelliteName: 'Landsat 8'}, // success
    {startDate:'2018-06-02', satelliteName: 'Landsat 7'}, // success
    {startDate:'2018-06-02', satelliteName: 'Landsat 8'}, // success
    {startDate:'2019-06-27', satelliteName: 'Landsat 7'}, // success
    {startDate:'2019-06-27', satelliteName: 'Landsat 8'}, // success
    {startDate:'2020-06-27', satelliteName: 'Landsat 7'}, // success
    {startDate:'2020-06-27', satelliteName: 'Landsat 8'}, // success
    {startDate:'2021-07-08', satelliteName: 'Landsat 7'}, // success
    {startDate:'2021-07-08', satelliteName: 'Landsat 8'}, // success
  ],
  years: [ // for the climate data
    //'1981', (Would require autumn and start of winter seasons from 1990)
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
  var snowline = snowlineModule.snowlinesAlgorithm(transect.transect, imagery.imageCollection, transect.ltCoord, transect.lbCoord);
  Export.table.toDrive({
    collection: snowline.snowEdgeVector,
    description: 'snowlinesSnowline' + entry.startDate + 'T' + inputs.advanceDays + entry.satelliteName.slice(0, 7) + entry.satelliteName.slice(8, 9),
    folder: ''+ entry.startDate.slice(0, 4),
    fileNamePrefix: 'snowlinesSnowline' + entry.satelliteName + entry.startDate + 'T' + inputs.advanceDays + entry.satelliteName.slice(0, 7) + entry.satelliteName.slice(8, 9),
    fileFormat: 'CSV'
  });
});

// Climate
inputs.years.map(function(year) {
  var climate = climateModule.climate(transect.transect, transect.ltCoord, transect.lbCoord, year);
  // climate.getDownloadURL({
  //   format: "csv",
  //   filename: "snowlinesClimate" + year,
  //   callback: function(url) {
  //     downloadLabelClimate.setValue("Download Full Climate Dataset");
  //     downloadLabelClimate = downloadLabelClimate.setUrl(url);
  //   }
  // });
  Export.table.toDrive({
    collection: climate,
    description: 'snowlinesClimate' + year,
    folder: ''+ year,
    fileNamePrefix: 'snowlinesClimate' + year,
    fileFormat: 'CSV',
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