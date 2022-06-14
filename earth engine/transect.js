/* Info
 * This generates a geodesic transect from a line.
 * Why not use the rectangle draw tool? To my knowledge you can only draw a lat-long rectangle which cannot be rotated in any way. However, a line can be drawn in any direction.
 * Therefore, using a line geometry to draw a rectangle from allows rectangle geometries to be generated 'off-axis'.
 * The start of the transect (0 km distance is at the first-clicked point of the line. These are referred to as left-hand vertices)
 */

/** Input Line Geometry **/
// This constructs the length of the transect and should be drawn from your start point to the end point along what you want to be the centre line of the transect.
// Alternatively, you can draw a line and name it 'transect_line' instead. If so, delete the following:
var transect_line = ee.Geometry.LineString(
   [[4.88,  61.7],
   [9.13,   61.7]]);

/** Buffer Line Geometry **/
// Buffer by half that of the desired transect width and retrieve coordinates of the new geometry
var buffered_transect_line = transect_line.buffer(40000/2);
var buffered_transect_line_coords = ee.List(buffered_transect_line.coordinates().get(0));

/** Extract Buffered Geometry Corners **/
// The amount of vertices used to create the rounded ends after buffering a line always stay the same. Therefore, the dictionary number of the extracted vertices that represent the geometry 'corners' just before the curves begin also stay the same. 
var lt_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(0)));  // left top
var lb_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(11))); // left bottom
var rb_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(13))); // right bottom
var rt_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(24))); // right top

/** Generate Transect Geometry **/
// From the corner coordinates a polygon can be generated. This is the transect.
var transect = ee.Geometry.Polygon({
  coords: [lt_coord, lb_coord, rb_coord, rt_coord],
  geodesic: true,
});

/** Share **/
// Share objects to another script
exports.transect = transect;
exports.lt_coord = lt_coord;
exports.lb_coord = lb_coord;
exports.rb_coord = rb_coord;
exports.rt_coord = rt_coord;

/** Export **/
// Export transect as shapefile for download
Export.table.toDrive({
  collection: ee.FeatureCollection(transect),
  description: "transect_shapefile",
  folder: "assets",
  fileNamePrefix: "transect",
  fileFormat: "SHP"
});