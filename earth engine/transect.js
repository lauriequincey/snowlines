/* Info
 * This generates a geodesic transect from a line.
 * Why not use the rectangle draw tool? To my knowledge you can only draw a lat-long rectangle which cannot be rotated in any way. However, a line can be drawn in any direction.
 * Therefore, using a line geometry to draw a rectangle from allows rectangle geometries to be generated 'off-axis'.
 * The start of the transect (0 km distance is at the first-clicked point of the line. These are referred to as left-hand vertices)
 */

/** Generate Transect Function **/
// Takes a LineString geometry and a sever or clientside number (in km).
// Outputs transect as polygon geometry and the 4 coordinates of the transect corners.
exports.transectGenerator = function(transectLine, transectWidth) {
  
  /** Buffer Line Geometry **/
  // Buffer by half that of the desired transect width and retrieve coordinates of the new geometry
  var bufferedLine = transectLine.buffer(ee.Number(transectWidth).multiply(1000).divide(2));
  var bufferedLineCoords = ee.List(bufferedLine.coordinates().get(0));
  
  /** Extract Buffered Geometry Corners **/
  // The amount of vertices used to create the rounded ends after buffering a line always stay the same. Therefore, the dictionary number of the extracted vertices that represent the geometry "corners" just before the curves begin also stay the same. 
  var ltCoord = ee.Geometry.Point(ee.List(bufferedLineCoords.get(0)));  // left top
  var lbCoord = ee.Geometry.Point(ee.List(bufferedLineCoords.get(11))); // left bottom
  var rbCoord = ee.Geometry.Point(ee.List(bufferedLineCoords.get(13))); // right bottom
  var rtCoord = ee.Geometry.Point(ee.List(bufferedLineCoords.get(24))); // right top
  
  /** Generate Transect Geometry **/
  // From the corner coordinates a polygon can be generated. This is the transect.
  var transect = ee.Geometry.Polygon({
    coords: [ltCoord, lbCoord, rbCoord, rtCoord],
    geodesic: true,
  });
  
  /** Return **/
  return {
    transect: transect,
    ltCoord: ltCoord,
    lbCoord: lbCoord,
    rbCoord: rbCoord,
    rtCoord: rtCoord,
  };
};