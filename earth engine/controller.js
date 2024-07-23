/* Info
 * This is the singular version of the bulk controller script.
 * It runs for only one year and only computes that year's snowline and climate.
 * Exporting climate can take a while. You may have better success with the alternative url download link that is commented out.
 * Validation and bulk computation/download of data is in the bulkController script.
 * This script also visualises the snowline result and has the Canadian transect geometry used by the study.
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
  transectLine: ee.Geometry.LineString([[4.88,  61.7], [9.13,   61.7]]), // Norway
  //transectLine: ee.Geometry.LineString([[-130.56968569398413, 53.7641439884147], [-126.74644350648414, 54.8884631386616]]), // Canada
  transectWidth: 40,
  advanceDays: 16,
  satelliteName: 'Landsat 8',
  startDate: '2018-06-02',
};

/** Run **/
// Necessary
var transect = transectModule.transectGenerator(inputs.transectLine, inputs.transectWidth);

// Snowline
var imagery = imageryModule.imageryLoader(inputs.startDate, inputs.advanceDays, inputs.satelliteName, transect.transect);
var snowline = snowlineModule.snowlinesAlgorithm(transect.transect, imagery.imageCollection, transect.ltCoord, transect.lbCoord);

// Climate
var climate = climateModule.climate(transect.transect, transect.ltCoord, transect.lbCoord, inputs.startDate);

/** Visualise Snowline **/
Map.centerObject(transect.transect);
function trueColourScaler(image) {
  var opticalBands = image.select(['Red', 'Green', 'Blue']).multiply(0.0000275).add(-0.2);
  return image.addBands(opticalBands, null, true);
}
Map.addLayer(imagery.imageCollection, {}, 'Raw Image Collection', 0, 1);
Map.addLayer(snowline.imageCollection, {}, 'Pre-processed Image Collection', 0, 1);
Map.addLayer(trueColourScaler(snowline.qualityMosaic), {bands: ['Red', 'Green', 'Blue'], min: 0, max: 0.4, gamma: 1.4}, 'Quality Mosaic', 1, 1);
Map.addLayer(snowline.waterMask.not().selfMask(), {palette: 'blue'}, 'Water Mask', 1, 0.3);
Map.addLayer(snowline.glacierMask.not().selfMask(), {palette: 'cyan'}, 'Glacier Mask', 1, 0.3);
Map.addLayer(snowline.qualityMosaic.select('cloudMask').not().selfMask(), {palette: ['yellow']}, 'Cloud Mask', 1, 0.7);
Map.addLayer(snowline.snowEdgeRaster.select('snow_edge'), {palette: 'red'}, 'Snow-edge Raster', 1, 1);

/** Export **/
var year = inputs.startDate.slice(0, 4);

// Snowline
Export.table.toDrive({
  collection: snowline.snowEdgeVector,
  description: 'snowlinesSnowline' + inputs.startDate + 'T' + inputs.advanceDays + inputs.satelliteName.slice(0, 7) + inputs.satelliteName.slice(8, 9),
  folder: ''+ year,
  fileNamePrefix: 'snowlinesSnowline' + inputs.startDate + 'T' + inputs.advanceDays + inputs.satelliteName.slice(0, 7) + inputs.satelliteName.slice(8, 9),
  fileFormat: 'CSV',
});

// Climate
// var downloadLabelClimate = ui.Label({value: " . . . loading"});
// print(downloadLabelClimate);
// climate.getDownloadURL({
// format: "csv",
// filename: "snowlinesClimate" + year,
// callback: function(url) {
//   downloadLabelClimate.setValue("Download Full Climate Dataset");
//   downloadLabelClimate = downloadLabelClimate.setUrl(url);
// }
//});
Export.table.toDrive({
  collection: climate,
  description: 'snowlinesClimate' + year,
  folder: ''+ year,
  fileNamePrefix: 'snowlinesClimate' + year,
  fileFormat: 'CSV',
});