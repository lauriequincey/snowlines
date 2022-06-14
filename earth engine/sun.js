/* Info
 * Retrieve sun elevations from imagery (Landsats 4-9)
 * Written to accompany the "validation.js" script by providing a single file of sun elevations for the satellite imagery used to resolve snowlines in the "snowlines.js" script.
 * Inputs in the "List of Dates and Satellites" section. Defaults can be deleted and changed for whatever your dates of interest are.
 * Transect geometry from "transect.js" script.
 */

/** Dependencies **/
var module_transect = require("users/lauriequincey/snowlines:transect.js");

/** List of Dates and Satellites **/
var dates_and_satelltes = ee.List([

  ee.Dictionary({
    "start_date": ee.Date('1985-07-10'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1986-06-24'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1987-08-23'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1988-06-26'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1989-07-24'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1991-07-22'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1992-06-27'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1993-07-19'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1994-07-25'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1995-07-20'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1997-07-13'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1998-07-23'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1999-07-29'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('1999-07-29'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2000-07-17'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2000-07-17'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2002-07-05'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2003-07-12'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2003-07-12'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2004-07-27'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2004-07-27'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2005-08-03'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2006-06-29'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2006-06-29'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2007-07-08'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2008-07-22'),
    "satellite": "Landsat_5"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2013-07-14'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2013-07-14'),
    "satellite": "Landsat_8"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2014-07-11'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2014-07-11'),
    "satellite": "Landsat_8"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2015-08-18'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2015-08-18'),
    "satellite": "Landsat_8"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2016-06-15'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2016-06-15'),
    "satellite": "Landsat_8"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2017-07-03'),
    "satellite": "Landsat_8"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2018-06-02'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2018-06-02'),
    "satellite": "Landsat_8"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2019-06-27'),
    "satellite": "Landsat_7"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2019-06-27'),
    "satellite": "Landsat_8"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2020-06-27'),
    "satellite": "Landsat_8"
  }),
  ee.Dictionary({
    "start_date": ee.Date('2021-07-08'),
    "satellite": "Landsat_8"
  }),
  
]);

/** Transect Geometry **/
var transect = module_transect.transect;

/** Sun Elevations **/
var sun_elevations = dates_and_satelltes.map(function(entry) {
  
  /** Unpack Dictionary **/
  var start_date = ee.Date(ee.Dictionary(entry).get('start_date'));
  var satellite_name = ee.String(ee.Dictionary(entry).get('satellite'));
  
  /** Import Imagery **/
  var date_range = ee.DateRange(start_date, start_date.advance(16, 'day'));
  
  // Import Imagery Based on Date and Satellite Selection
  var collection = ee.ImageCollection(ee.Dictionary([
    'Landsat_4', ee.ImageCollection('LANDSAT/LT04/C02/T1_L2')
      .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat_5', ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
      .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat_7', ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
      .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'], 
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat_8', ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
      .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat_9', ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
      .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
  ]).get(satellite_name))
  .filterBounds(transect)
  .filterDate(date_range);
  
  /** Extract Sun Elevation **/
  return collection.toList(collection.size()).map(function(image) {
    return ee.Image(image).get('SUN_ELEVATION');
  });
}).flatten();

/** Export **/
var sun_elevations = ee.FeatureCollection(sun_elevations.map(function(sun_elevation) {
    return ee.Feature(null, {"sun_elevations": ee.Number(sun_elevation)});
  }));
Export.table.toDrive({
  collection: sun_elevations,
  description: "sun",
  folder: "sun",
  fileNamePrefix: "sun",
  fileFormat: 'CSV',
});

print('Download Link:',
      sun_elevations.getDownloadURL({
        format: 'CSV',
        filename: 'sun',
      }));