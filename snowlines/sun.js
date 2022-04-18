/** Declare List of Dates and Satellites **/
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

/** Declare Transect **/
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

/** Generate Sun Elevations **/
var sun_elevations = dates_and_satelltes.map(function(entry) {
  
  /** Unpack Dictionary **/
  var start_date = ee.Date(ee.Dictionary(entry).get('start_date'));
  var satellite_name = ee.String(ee.Dictionary(entry).get('satellite'));
  
  /** Import Imagery **/
  var date_range = ee.DateRange(start_date, start_date.advance(16, 'day'));
  
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
  
  /** Extract Sun Elevation **/
  return collection.toList(collection.size()).map(function(image) {
    return ee.Image(image).get('SUN_ELEVATION');
  });
}).flatten();

/** Export **/
  Export.table.toDrive({
    collection: ee.FeatureCollection(sun_elevations.map(function(sun_elevation) {
      return ee.Feature(null, {"sun_elevations": ee.Number(sun_elevation)});
    })),
    description: "sun",
    folder: "sun",
    fileNamePrefix: "sun",
    fileFormat: 'CSV',
  });