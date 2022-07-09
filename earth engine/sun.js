/* Info
 * Retrieve sun elevations from imagery (Landsats 4-9)
 * Written to accompany the "validation.js" script by providing a single file of sun elevations for the satellite imagery used to resolve snowlines in the "snowlines.js" script.
 * Inputs in the "List of Dates and Satellites" section. Defaults can be deleted and changed for whatever your dates of interest are.
 * Transect geometry from "transect.js" script.
 */

exports.sun = function(datesAndSatelltes, transect, advanceDays) {
  
  /** Sun Elevations **/
  return ee.FeatureCollection(datesAndSatelltes.map(function(entry) {
    
    /** Import Imagery **/
    var dateRange = ee.DateRange(ee.Date(entry.startDate), ee.Date(entry.startDate).advance(advanceDays, 'day'));
    
    // Import Imagery Based on Date and Satellite Selection
    var collection = ee.ImageCollection(ee.Dictionary([
      'Landsat 4', ee.ImageCollection('LANDSAT/LT04/C02/T1_L2')
        .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
                ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
      'Landsat 5', ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
        .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
                ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
      'Landsat 7', ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
        .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'], 
                ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
      'Landsat 8', ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
        .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
                ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
      'Landsat 9', ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
        .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
                ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
    ]).get(entry.satelliteName))
    .filterBounds(transect)
    .filterDate(dateRange);
    
    /** Extract Sun Elevation **/
    return ee.FeatureCollection(collection.toList(collection.size()).map(function(image) {
      return ee.Feature(null, {sun_elevation: ee.Image(image).get('SUN_ELEVATION')});
    }));
  })).flatten();

};