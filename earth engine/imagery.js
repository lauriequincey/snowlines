/* Info
 * Script to load landsat imagery.
 * Selects bands and normalises across platforms.
 * Filters to the satellite name input by the user and the date range (start date to start date + advance days).
 * Created by Laurie Quincey, 2022.
 */

exports.imageryLoader = function(startDate, advanceDays, satelliteName, transect) {
  
  /** Date Range **/
  var dateRange = ee.DateRange(ee.Date(startDate), ee.Date(startDate).advance(advanceDays, 'day'));
  
  /** Import Imagery **/
  // Generate dictionary of landsats which have uniform bandnames
  var collections = {
    'Landsat 4': ee.ImageCollection('LANDSAT/LT04/C02/T1_L2')
      .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat 5': ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
      .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat 7': ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
      .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'], 
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat 8': ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
      .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat 9': ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
      .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
  };
  
  /** Filter Image Collections Dictionary **/
  var imageCollection = ee.ImageCollection(collections[satelliteName])
    .filterBounds(transect)
    .filterDate(dateRange);
  
  return {
    imageCollection: imageCollection
  };
};