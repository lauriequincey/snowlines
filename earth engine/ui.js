/* Info
 * UI for snowlines algorithm and climate explorer.
 * Created by Laurie Quincey, 2022.
 */

/** Maps **/
var mapMain = ui.Map({
  center: { // Center map on Are, Sweden
    lat: 63.3971469,
    lon: 13.0705005}
  })
  .setOptions({
    styles: {
      "Map":
      // Between the square brackets is code constructed using an interactive map builder at Snazzy Maps: https://snazzymaps.com/editor
      [
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#a4a4a4"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#7e7e7e"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#7e7e7e"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#a4a4a4"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#9a9a9a"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#7e7e7e"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#7e7e7e"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#9a9a9a"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#7e7e7e"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#7e7e7e"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#9a9a9a"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a4a4a4"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a4a4a4"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a4a4a4"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#a4a4a4"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": "35"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "-4"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a4a4a4"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ccecf7"
            }
        ]
    }
]
    },
    types: ["Map", "Satellite"]
  })
  .setControlVisibility({
    all: true,
    layerList: true,
    zoomControl: false,
    scaleControl: false,
    mapTypeControl: true,
    fullscreenControl: true,
    drawingToolsControl: false
  });
var mapMini = ui.Map({
    center: { // Center map on Are, Sweden
      lat: 63.3971469,
      lon: 13.0705005}
    })
  .setOptions({
      styles: {
        Map: [
      {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#a4a4a4"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#7e7e7e"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#7e7e7e"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#a4a4a4"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "labels.text",
          "stylers": [
              {
                  "color": "#9a9a9a"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#7e7e7e"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#7e7e7e"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#9a9a9a"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#7e7e7e"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#7e7e7e"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#9a9a9a"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#a4a4a4"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#a4a4a4"
              }
          ]
      },
      {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#a4a4a4"
              }
          ]
      },
      {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#a4a4a4"
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": "35"
              }
          ]
      },
      {
          "featureType": "landscape.natural.terrain",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.government",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.medical",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "lightness": "-4"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#a4a4a4"
              }
          ]
      },
      {
          "featureType": "poi.place_of_worship",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.school",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.sports_complex",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ccecf7"
              }
          ]
      }
  ], // Between the square brackets is code constructed using an interactive map builder at Snazzy Maps: https://snazzymaps.com/editor
        
      },
      types: ["Map"]
    })
  .setControlVisibility({
      all: false,
      layerList: false,
      zoomControl: false,
      scaleControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      drawingToolsControl: false
    })
  .setZoom(1);
ui.Map.Linker([mapMain, mapMini], "change-center");

/** Aesthetics **/
var colourCyan = "#88cce3";
var colourBlack = "Black";
var autumn = "#D66D72";
var spring = "#9DDF8E";
var summer = "#EEEA8E";
var winter = "#6391BD";

/** Input Components **/
// Transect
var drawTools = mapMain.drawingTools().setShown(false);
drawTools.layers().add(ui.Map.GeometryLayer({geometries: [ee.Geometry.LineString([[4.88,  61.7], [9.13,   61.7]])], name: "default", color: "red", shown: true}));
var drawLineState = 0;
var drawMessage = ui.Label({
  style: {
    fontSize: "14px",
    fontWeight: "300",
    shown: false,
    padding: "0px, 0px, 0px, 0px",
    width: "100%",
    height: "29px",
    position: "top-center"
  }
});
function drawLine() {
    
  /** Start drawing tools **/
  drawTools;
  
  /** Drawing State Actions **/
  // If no drawing (default start position)...
  if (drawLineState === 0) {
    
    // ...clear draw tools
    drawTools.layers().remove(drawTools.layers().get(0));
    
    // ...draw new line
    drawTools.setShape("line").draw();
    
    // ...set draw state to on
    drawLineState = 1;
    
    // ...set button to drawing mode on colour
    buttonDraw.style().set("color", colourCyan);
  
  // If there is a drawing...
  } else {
    
    // ...close drawing tools, completing the shape
    drawTools.stop();
    
    // ...set draw state to off
      drawLineState = 0;
    
    // ...set button to drawing mode off colour
    buttonDraw.style().set("color", colourBlack);
  }
  
  /** Drawing messages **/
  // When something is drawn
  drawTools.onDraw(function(input) {
    // mapMain.remove(drawMessage);
    // mapMain.add(drawMessage);
    drawMessage.style().set("shown", true);
    drawMessage.setValue("Transect Set");
    drawMessage.style().set("color", "#50c91c");
    drawMessage.style().set("backgroundColor", "#98f272");
  });
  // When drawing is removed
  drawTools.onLayerRemove(function() {
    // mapMain.remove(drawMessage);
    // mapMain.add(drawMessage);
    drawMessage.style().set("shown", true);
    drawMessage.setValue("Drawing Cleared");
    drawMessage.style().set("color", "#c92c00");
    drawMessage.style().set("backgroundColor", "#ffd2ba");
  });
  // Remove messages after a second
  ui.util.setTimeout(function() {
    //mapMain.remove(drawMessage)
    drawMessage.style().set("shown", false);
  }, 1000);
  }
function transectGenerator() {
    
  /** Get geometry **/
  var transectLine = drawTools.layers().get(0).geometries().get(0);
  
  /** Buffer Line Geometry **/
  // Buffer by half that of the desired transect width and retrieve coordinates of the new geometry
  var bufferedLine = transectLine.buffer(ee.Number(sliderTransectWidth.getValue()).multiply(1000).divide(2));
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
  
  /** Write to Settings **/
  settings.transect = transect;
  settings.ltCoord = ltCoord;
  settings.lbCoord = lbCoord;
}

// Satellite
var availableSatellites = null;
function satelliteFilter() {
  
  /** Info **/
  // Basically, the platform drop down menu to choose a satellite from needs to only show the relevant platforms for the chosen date.
  // Therefore, we compare the chosen input date to a feature collection with each landsat platform and accompanying dates ranges.
  // This can then be put into the "items" part of the panel widget.
  // To refresh the widget it needs to be removed and re-added. Therefore, its in a wrapper ui.Panel to keep its place in the menu.
  // The function is called on press of the start button and any change to the date that is picked.

  /** Paired date-satellite feature collection **/
  var satelliteDates = ee.FeatureCollection([
    
    ee.Feature(null, {
      "dateRange": ee.DateRange("2021-10-31", ee.Date(Date.now())),
      "platform": ["Landsat 9"]
    }),
    ee.Feature(null, {
      "dateRange": ee.DateRange("2013-03-18", ee.Date(Date.now())),
      "platform": ["Landsat 8"]
    }),
    ee.Feature(null, {
      "dateRange": ee.DateRange("1999-05-28", "2022-04-06"),
      "platform": ["Landsat 7"]
    }),
    ee.Feature(null, {
      "dateRange": ee.DateRange("1984-03-16", "2012-05-05"),
      "platform": ["Landsat 5"]
    }),
    ee.Feature(null, {
      "dateRange": ee.DateRange("1982-08-22", "1993-06-24"),
      "platform": ["Landsat 4"]
    }),
  ]);
  
  /** Compare sliderValue to feature collection date range and write to settings **/
  availableSatellites = satelliteDates.filter(ee.Filter.dateRangeContains({
    leftField: "dateRange",
    rightValue: ee.Date(settings.startDate)
  }));
  
  /** Declare and Refresh satellitePicker Widget **/
  availableSatellites.aggregate_array("platform").flatten().evaluate(function(evalAvailableSatellites) {
    satelliteSelect = ui.Select({
      items: evalAvailableSatellites,
      placeholder: "Select Satellite",
      value: evalAvailableSatellites[0],
      onChange: ui.util.debounce(function(selectedValue) {
        settings.satelliteName = selectedValue;
        satelliteSelect.style().set("color", colourCyan);
        run();
      }, 5000),
      style: {
        color: "#a3a3a3",
        backgroundColor: "rgba(255, 255, 255, 0)",
        width: "130px",
        height: "30px",
        padding: "0px 0px 0px 0px",
        margin: "0px 0px 0px 0px",
        //border: "2px solid blue"
      }
    });
    satelliteSelectWrapper.add(satelliteSelect);
  });
}

/** Processing Components **/
var settings = {
  transect: null,
  ltCoord: null,
  lbCoord: null,
  transectWidth: 40,
  startDate: "2018-06-02",
  advanceDays: 16,
  satelliteName: "Landsat 8",
};
var errMessage = ui.Label({
  value: "No imagery available for this date",
  style: {
    color: "#c92c00",
    backgroundColor: "#ffd2ba",
    fontSize: "14px",
    fontWeight: "300",
    shown: false,
    padding: "0px, 0px, 0px, 0px",
    width: "100%",
    height: "29px",
    position: "top-center"
  }
});
function imageCollector(startDate, advanceDays, satelliteName, transect) {
  
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
  
  var imagery = ee.ImageCollection(collections[satelliteName])
    .filterBounds(transect)
    .filterDate(dateRange);
  return imagery;
};
function snowlinesAlgorithm(transect, imageCollection, ltCoord, lbCoord) {
  
  /** Glacier and Water Masks **/ 
  // Glacer Mask
  var glacierMask = ee.FeatureCollection("GLIMS/current")
    .filter(ee.Filter.eq('line_type', 'glac_bound'))
    .filterBounds(transect) // Filter
    .reduceToImage({ // Rasterise
      properties: ['area'],
      reducer: ee.Reducer.mean()
    })
    .focal_max({ // Buffer
      radius: 180,
      kernelType: 'square',
      units: 'meters', 
      iterations: 1
    })
    .rename('glacierMask')
    .eq(1) // Invert mask
    .unmask(1);
  
  // Water Mask
  var waterMask = ee.Image("JRC/GSW1_3/GlobalSurfaceWater")
    .select(['max_extent'], ['waterMask'])
    .focal_max({ // Buffer
      radius: 100,
      kernelType: 'square',
      units: 'meters', 
      iterations: 1
    })
    .eq(0); // Invert mask
  
  /** Metrics **/
  // Terrain Data
  var altitude = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
    .filterBounds(transect)
    .select(['DSM'], ['altitude'])
    .mosaic()
    .reproject({
      crs: 'EPSG:4326',
      scale: 30
    }); // Reproject so the mosaic is uniform for the terrain calculations. Necessary, see: https://developers.google.com/earth-engine/guides/projections#reprojecting
  
  // Imagery Translation Error
  // "All L1TP Tier-1 products are expected to be consistent to within 12-m." https://www.usgs.gov/landsat-missions/landsat-levels-processing
  var translationError = 12;
  
  // Generate Metrics Image
  var metrics = 
  
    // Elevation
    altitude.addBands([
      
    // Altitudinal Base Error
    // +- 5m https://www.mdpi.com/2072-4292/13/22/4653/pdf. See: https://www.mdpi.com/2072-4292/13/22/4653/pdf for a good comparisons in error of some DEMs over the arctic.
    ee.Image.constant(5).rename('altitude_base_error'),
    
    // Altitudinal Translation Error
    // Trigonometry using slope of pixel and offset distance from satellite translation error
    ee.Terrain.slope(altitude)
      .multiply(Math.PI)
      .divide(180)
      .tan()
      .multiply(ee.Image.constant(translationError))
      .rename('altitude_translation_error'),
    
    // Coordinates
    ee.Image.pixelLonLat()
      .rename(['longitude', 'latitude']),
      
    // Aspect
    ee.Terrain.aspect(altitude)
      .rename('aspect'),
      
    // Slope Angle
    ee.Terrain.slope(altitude)
      .rename('slope')
    
    ]).double();
  
  /** Endmembers **/
  // Add Cloud and Cloud Shadows Mask
  imageCollection = imageCollection.map(function(image) {
    
    /** Mask Image to Where there are Nulls in the TIR band **/
    image = image.updateMask(image.select('TIR').reduce(ee.Reducer.count()));
    
    /** Cloud Masking **/
    var bandMath = image.expression(
      '(SWIR2 - TIR) / (SWIR2 + TIR)',
      {'SWIR2': image.select('SWIR_2'),
       'TIR':  image.select('TIR')});
    var glcm = bandMath.unitScale(-1, 1).multiply(255).toInt32().glcmTexture({size: 4}).select('SWIR_2_savg');
    var cloudMask = glcm.gt(140)
      .focalMax({
        radius: 180,
        kernelType: 'circle',
        units: 'meters',
        iterations: 1
      })
      .not()
      .rename('cloudMask');
    
    /** Unix Time **/
    var time = ee.Image.constant(ee.Date(image.get('DATE_ACQUIRED')).millis())
      .int64()
      .rename('aqcuisition_time');
    
    /** Add Bands **/
    return image.addBands([cloudMask, time]);
  });
  
  // Cloudless Mosaic
  var qualityMosaic = imageCollection.qualityMosaic('cloudMask');
  var cloudlessMosaic = qualityMosaic.updateMask(qualityMosaic.select('cloudMask'));
  
  // Land Surface Indices
  var indices = ee.List([
    
    // Snow (SWI)
    cloudlessMosaic.expression('((Green * (NIR - SWIR)) / ((Green + NIR) * (NIR + SWIR)))',
      {'Green': cloudlessMosaic.select('Green'),
      'NIR':    cloudlessMosaic.select('NIR'),
      'SWIR':   cloudlessMosaic.select('SWIR_1')}),
      
    // Vegetation (GVI)
    cloudlessMosaic.expression('(-0.2848 * Blue) + (-0.2435 * Green) + (-0.5436 * Red) + (0.7243 * NIR) + (0.0840 * SWIR1) + (-0.1800 * SWIR2)',
      {'Blue':  cloudlessMosaic.select('Blue'),
       'Green': cloudlessMosaic.select('Green'),
       'Red':   cloudlessMosaic.select('Red'),
       'NIR':   cloudlessMosaic.select('NIR'),
       'SWIR1': cloudlessMosaic.select('SWIR_1'),
       'SWIR2': cloudlessMosaic.select('SWIR_2')}),
      
    // Water (1 / MNDWI [Xue & Guo Combined])
    cloudlessMosaic.expression('1 / ((Green - SWIR) + (NIR - SWIR) / (Green + SWIR) + (NIR + SWIR))',
      {'Green': cloudlessMosaic.select('Green'),
       'NIR':   cloudlessMosaic.select('NIR'),
       'SWIR':  cloudlessMosaic.select('SWIR_1')}),
      
    // Rock (NDBI)
    cloudlessMosaic.expression('(SWIR - NIR) / (SWIR + NIR)',
      {'NIR':  cloudlessMosaic.select('NIR'),
       'SWIR': cloudlessMosaic.select('SWIR_1')})
  ]);
  
  // Endmembers
  var endmembers = indices.map(function(index) {
    
    // Mask mosaic to...
    return cloudlessMosaic.updateMask(
      
      // ... the thresholded index...
      ee.Image(index).gt(
      
        // ... generated from the 95th percentile pixels of that index itself
        ee.Number(
          ee.Image(index).reduceRegion({
            reducer: ee.Reducer.percentile({percentiles: [95]}),
            geometry: transect,
            scale: 30,
            maxPixels: 1000000, // set to  value which is large enough to create accurate endmembers but not too large to make computation time too long.
            bestEffort: true
          })
        .values()
        .get(0)
        )
      )
    )
    
    // Find the mean values from within the 95th percentile for each band.
    .select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
    .reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: transect,
      scale: 30,
      bestEffort: true
    })
    .values();
  });
  
  /** Snow Cap, Snow Edge, Masking, and Metrics **/ 
  var snowEdgeRaster = imageCollection.map(function(image) {
    
    /** SnowCap **/
    var snowCap = image
      .select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
      .unmix({ // Linear Spectral Unmixing
        endmembers: endmembers,
        sumToOne: true,
        nonNegative: true
      })
      .rename('snowComponent', 'vegetationComponent', 'waterComponent', 'rockComponent')
      .select(['snowComponent'], ['snow_extent'])
      .gte(0.5); // Find 50% and above snow pixels
    
    // Fill in SnowCap internal Holes
    var rockyOutcrops = snowCap
      .not().selfMask() // Invert Snowcap mask
      .connectedComponents({
        connectedness: ee.Kernel.square({
        radius: 1, // msut be 1 for edge detection
        units: 'pixels'
        }),
      maxSize: 150 // a nice size for each component that doesnt slow things down
      })
      .select(['labels'], ['snow_extent']) // select the components band and rename so it can be added to the snowCap mask
      .neq(0)
      .unmask(); // get all the components
    
    snowCap = snowCap.add(rockyOutcrops);
    
    /** Mask SnowCap **/
    var maskedSnowCap = snowCap
      .updateMask(image.select('cloudMask'))
      .updateMask(glacierMask)
      .updateMask(waterMask);
    
    /** Edge Detection and Add Metrics **/
    return maskedSnowCap
       .reduceNeighborhood({
         reducer: ee.Reducer.countDistinctNonNull(),
         kernel: ee.Kernel.plus({
           radius: 1,
           units: 'pixels'
         })
       })
       .eq(2)
       .rename('snow_edge')
       .selfMask()
       .addBands([
         image.select("aqcuisition_time"), // Aqcuisition time of image
         metrics, // environmental image
         ee.Image(ee.Number(ee.Image(image).get('SUN_ELEVATION'))).rename(['sun_elevation']) // sun elevations
       ]);
    
  });
  
  // /** Vectorise **/
  // var snowEdgeVector = snowEdgeRaster.map(function(edge) {
    
  //   // Vectorise the snow_edge image with metrics into a table of results (feature collection), a row per pixel
  //   return edge.sampleRegions({
  //     collection: transect,
  //     scale: 30,
  //     tileScale: 4,
  //     geometries: true
  //   })
  //   // add transect distances to the results table
  //   .map(function(feature) {
  //     return feature.set(
  //       'distance', 
  //       feature
  //         .geometry() // Get geom
  //         .distance(ee.Geometry.LineString([ltCoord.coordinates(), lbCoord.coordinates()])) // find distance to start line created from transect coords
  //         .divide(1000) // put into km
  //     );
  //   });
  // }).flatten();
  // snowEdgeVector = snowEdgeVector.filter(ee.Filter.notNull(ee.Feature(snowEdgeVector.first()).propertyNames()));
  
  // Vectorise into stratified sample for the UI.
  var snowEdgeVectorStratified = snowEdgeRaster
    .select(["snow_edge", "altitude"])
    .mosaic()
    .stratifiedSample({
      numPoints: 100,
      classBand: "snow_edge",
      region: transect,
      scale: 30,
      //projection,
      //seed: 2,
      //classValues,
      //classPoints,
      dropNulls: true,
      //tileScale,
      geometries: true
    })
    // add transect distances to the results table
    .map(function(feature) {
      return feature.set(
        'distance', 
        feature
          .geometry() // Get geom
          .distance(ee.Geometry.LineString([ltCoord.coordinates(), lbCoord.coordinates()])) // find distance to start line created from transect coords
          .divide(1000) // put into km
      );
  });
  
  /** Return Dictionary **/
  return {
    imageCollection: imageCollection,
    glacierMask: glacierMask,
    waterMask: waterMask,
    qualityMosaic: qualityMosaic,
    snowEdgeRaster: snowEdgeRaster,
    //snowEdgeVector: snowEdgeVector,
    snowEdgeVectorStratified: snowEdgeVectorStratified.select(["altitude", "distance"])
  };
  
}
function climateAlgorithm(transect, ltCoord, lbCoord, date) {
  
  var serverDate = ee.Date(date);
  
  /** Climate **/
  var climateVariables = ee.List([
    'temperature_2m',
    'snowfall',
    //'snowmelt',
    //'surface_latent_heat_flux',
    //'surface_sensible_heat_flux',
    'surface_solar_radiation_downwards',
    //'snow_evaporation'
  ]);
  
  var climate = ee.ImageCollection(ee.FeatureCollection([
  
    // Import
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(serverDate.get('year'), 06, 01), ee.Date.fromYMD(serverDate.get('year'), 8, 31))),
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(serverDate.get('year').subtract(1), 12, 01), ee.Date.fromYMD(serverDate.get('year'), 02, 28))),
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(serverDate.get('year'), 03, 01), ee.Date.fromYMD(serverDate.get('year'), 05, 28))),
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(serverDate.get('year').subtract(1), 9, 01), ee.Date.fromYMD(serverDate.get('year'), 11, 30))),
  ])
  // Reduce seasons...
  .map(function(season) {
    // ...to means
    var seasonMean = ee.ImageCollection(season).reduce(ee.Reducer.mean());
    // ...and SEMs
    var seasonSem = ee.ImageCollection(season).reduce(ee.Reducer.stdDev()).divide(ee.ImageCollection(season).size().sqrt())
      // Rename bands from the default "stdDev" to "_sem" as we calculate the standard error of the mean.
      .rename(ee.Image(seasonMean).bandNames().map(function(name){return ee.String(name).cat("_sem")}));
    var combined = seasonMean.addBands(seasonSem);
    // Convert temperatures to celcius and correct to at sea level
    return combined.addBands({srcImg: combined.select('temperature_2m_mean').subtract(273.1), overwrite: true})
    })
  ).toBands()
   .regexpRename({
     regex: "0",
     replacement: "summer",
     all: true
   })
   .regexpRename({
     regex: "1",
     replacement: "winter",
     all: true
   })
   .regexpRename({
   regex: "2",
   replacement: "spring",
   all: true
   })
   .regexpRename({
     regex: "3",
     replacement: "autumn",
     all: true
   })
  .regexpRename({
     regex: "springm_",
     replacement: "",
     all: true
   });
   
  /** Metrics (Land Elevation and Transect Distance) **/
  // Import Land Surface Elevation 
  climate = climate.addBands([
    ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
      .filterBounds(transect)
      .select(['DSM'], ['altitude'])
      .mosaic() // mosaic as the JAXA data are an image collection not single raster.
      
      // Reduce Elevation to scale of climate data by their mean
      .setDefaultProjection({crs: "EPSG:4326", scale: 11132}),
      
      // 04/09/2023 As of date this was stopping the climate data from being generated in the APP but was still working in cloud export. Don't really see why I ever wrote it in the first place as it does nothing to the data which is already projected to a specified scale. Removed now and tested - it makes no difference!.
      //.reduceResolution({ 
      //  reducer: ee.Reducer.mean(),
      //  bestEffort: true
      //}),
    ee.Image.constant(1).int().rename("class") // for stratified sample
  ]);
   
  /** Sample Pixels **/
  // var climateFull = climate
  // .sample({
  //   region: transect,
  //   scale: 11132,
  //   //projection:,
  //   //factor,
  //   //numPixels,
  //   //seed,
  //   dropNulls: true,
  //   //tileScale:,
  //   geometries: true
  // })
  // // Add Distances and Correct Temperatures to ASL
  // .map(function(point) {
  //     // How far is each point...
  //     var distance = point
  //       .geometry()
  //       .distance(
  //         // ... to the start of the transect (a line between the left hand coordinates)
  //         ee.Geometry.LineString([ltCoord, lbCoord])
  //       );
  //     return point.set('distance', distance.divide(1000)); // in km
  //   })
  //   .map(function(feature) {
  //     return ee.Feature(feature).set({
  //       "autumn_temperature_mean": ee.Number(ee.Feature(feature).get('autumn_temperature_mean')).add(ee.Number(ee.Feature(feature).get('altitude')).divide(100).multiply(0.65)),
  //       "winter_temperature_mean": ee.Number(ee.Feature(feature).get('winter_temperature_mean')).add(ee.Number(ee.Feature(feature).get('altitude')).divide(100).multiply(0.65)),
  //       "spring_temperature_mean": ee.Number(ee.Feature(feature).get('spring_temperature_mean')).add(ee.Number(ee.Feature(feature).get('altitude')).divide(100).multiply(0.65)),
  //       "summer_temperature_mean": ee.Number(ee.Feature(feature).get('summer_temperature_mean')).add(ee.Number(ee.Feature(feature).get('altitude')).divide(100).multiply(0.65))
  //       });
  //   });
  
  var climateStratified = climate.stratifiedSample({
    numPoints: 50,
    classBand: "class",
    region: transect,
    scale: 11132,
    dropNulls: true,
    geometries: true
  }).map(function(point) {
      // How far is each point...
      var distance = point
        .geometry()
        .distance(
          // ... to the start of the transect (a line between the left hand coordinates)
          ee.Geometry.LineString([ltCoord, lbCoord])
        );
      return point.set('distance', distance.divide(1000)); // in km
    })
    .map(function(feature) {
      return ee.Feature(feature).set({
        "autumn_temperature_mean": ee.Number(ee.Feature(feature).get('autumn_temperature_mean')).add(ee.Number(ee.Feature(feature).get('altitude')).divide(100).multiply(0.65)),
        "winter_temperature_mean": ee.Number(ee.Feature(feature).get('winter_temperature_mean')).add(ee.Number(ee.Feature(feature).get('altitude')).divide(100).multiply(0.65)),
        "spring_temperature_mean": ee.Number(ee.Feature(feature).get('spring_temperature_mean')).add(ee.Number(ee.Feature(feature).get('altitude')).divide(100).multiply(0.65)),
        "summer_temperature_mean": ee.Number(ee.Feature(feature).get('summer_temperature_mean')).add(ee.Number(ee.Feature(feature).get('altitude')).divide(100).multiply(0.65))
        });
    });
  
  return {
    //climate: climateFull,
    climateStratified: climateStratified.select("[^c].*")
  };
  
}
function trueColourScaler(image) {
  var opticalBands = image.select(['Red', 'Green', 'Blue']).multiply(0.0000275).add(-0.2);
  return image.addBands(opticalBands, null, true);
}
function chartSample(featureCollection, xProperty, yProperties, title, hAxisTitle, vAxisTitle, colors, dataOpacity) {
  
  // var sample = ee.FeatureCollection(featureCollection)
  //   // Add random number column
  //   .randomColumn({
  //     columnName: 'random',
  //     seed: 2,
  //     distribution: samplingDistribution
  //   })
  //   // Limit row number based on ascending random number order (thereby creating a random sample of a feature collection!)
  //   .limit({
  //     max: rows,
  //     property: 'random',
  //     ascending: true
  //   });
    
  return ui.Chart.feature.byFeature({
    features: featureCollection,
    xProperty: xProperty,
    yProperties: yProperties,
    })
    .setChartType('ScatterChart')
    .setOptions({
      title: title,
      hAxis: {
        title: hAxisTitle,
        titleTextStyle: {italic: false, bold: true},
        gridlines: {count: 0},
        viewWindow: {min: 0, max: featureCollection.aggregate_max(xProperty)}
      },
      vAxis: {
        title: vAxisTitle,
        titleTextStyle: {italic: false, bold: true},
        gridlines: {count: 0},
        viewWindow: {min: 0, max: featureCollection.aggregate_max(yProperties)}
      },
      width: "460px",
      height: "291.875px", // golden ratio (10:16)
      colors: colors,
      chartArea: {
        backgroundColor: "white",
        top: 30,
        left: 80, 
        width: "100%",
        height: "70%"
      },
      dataOpacity: dataOpacity,
      trendlines: { 
        0: {
          type: 'linear',
          color: colourBlack,
          visibleInLegend: true,
          opacity: 1,
          //labelInLegend: "Linear Regression",
          showR2: true
        }
      },
      padding: "0px 0px 0px 0px",
      margin: "0px 0px 0px 0px",
    })
    .setDownloadable(true);
}
function chartSampleSeries(featureCollection, xProperty, yProperties, chartType, title, hAxisTitle, vAxisTitle, colorsList, dataOpacity) {
  return ui.Chart.feature.byFeature({
    features: featureCollection,
    xProperty: xProperty,
    yProperties: yProperties,
  })
  .setChartType(chartType)
  .setOptions({
    width: "460px",
    height: "291.875px",
    title: title,
    hAxis: {
      title: hAxisTitle,
      titleTextStyle: {italic: false, bold: true},
      gridlines: {count: 0},
      viewWindow: {min: 0, max: featureCollection.aggregate_max(xProperty)}
    },
    vAxis: {
      title: vAxisTitle,
      titleTextStyle: {italic: false, bold: true},
      gridlines: {count: 0},
    },
    colors: colorsList,
    chartArea: {
      backgroundColor: "white",
      top: 30,
      left: 80, 
      width: "100%",
      height: "70%"
    },
    dataOpacity: dataOpacity,
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px 0px",
  })
  .setDownloadable(true);
}

/** Run Component **/
function run() {
  
  /** Reset **/
  loadMessage.style().set('shown', true);
  loadMessage2.style().set('shown', true);
  downloadLabelClimate.setUrl("");
  downloadLabelSnowlines.setUrl("");
  downloadLabelSnowlines.style().set("color", "black");
  downloadLabelClimate.style().set("color", "black");
  downloadLabelSnowlines.style().set("shown", false);
  downloadLabelClimate.style().set("shown", false);
  downloadLabelSnowlines.setValue("Loading . . .");
  downloadLabelClimate.setValue("Loading . . .");
  mapMain.layers().reset();
  panelChart1.clear();
  panelChart2.clear();
  panelChart3.clear();
  panelChart4.clear();
  
  // Check for Imagery
  var imagery = imageCollector(settings.startDate, settings.advanceDays, settings.satelliteName, settings.transect);
  imagery.size().evaluate(function(input) {
    if (input === 0) {
      loadMessage.style().set('shown', false);
      loadMessage2.style().set('shown', false);
      errMessage.style().set('shown', true);
      ui.util.setTimeout(function() {errMessage.style().set('shown', false)}, 5000);
    } else {
      
      /** Run Algorithms **/
      var snowline = snowlinesAlgorithm(settings.transect, imagery, settings.ltCoord, settings.lbCoord);
      var climate = climateAlgorithm(settings.transect, settings.ltCoord, settings.lbCoord, settings.startDate);
      
      /** Display Result **/
      mapMain.addLayer(settings.transect, {}, "Transect");
      mapMini.addLayer(settings.transect, {}, "Transect");
      mapMain.centerObject(settings.transect);
      mapMain.addLayer(imagery, {}, 'Raw Image Collection', 0, 1);
      mapMain.addLayer(snowline.imageCollection, {}, 'Pre-processed Image Collection', 0, 1);
      mapMain.addLayer(trueColourScaler(snowline.qualityMosaic), {bands: ['Red', 'Green', 'Blue'], min: 0, max: 0.4, gamma: 1.4}, 'Quality Mosaic', 1, 1);
      mapMain.addLayer(snowline.waterMask.not().selfMask(), {palette: 'blue'}, 'Water Mask (Dark Blue)', 1, 0.3);
      mapMain.addLayer(snowline.glacierMask.not().selfMask(), {palette: 'cyan'}, 'Glacier Mask (Cyan)', 1, 0.3);
      mapMain.addLayer(snowline.qualityMosaic.select('cloudMask').not().selfMask(), {palette: ['yellow']}, 'Cloud Mask (Yellow)', 1, 0.7);
      mapMain.addLayer(snowline.snowEdgeRaster.select('snow_edge'), {palette: 'red'}, 'Snow-edge Raster (Red)', 1, 1);
      
      var newInstance = 1;
      mapMain.onTileLoaded(ui.util.debounce(function(map) {
        if (newInstance === 1) {
          // One time Only!
          newInstance = 0;
          
          // Set label styles
          loadMessage.style().set('shown', false);
          loadMessage2.style().set('shown', false);
          downloadLabelSnowlines.style().set("shown", true);
          downloadLabelClimate.style().set("shown", true);
          
          /** Charts **/
          panelChart1.clear();
          panelChart2.clear();
          panelChart3.clear();
          panelChart4.clear();
          var temperatureChart = chartSampleSeries(climate.climateStratified, 'distance', ['autumn_temperature_mean', 'spring_temperature_mean', 'summer_temperature_mean', 'winter_temperature_mean'], 'ScatterChart', 'Seasonal Mean ASL Temperature by Distance', 'Distance (km)', 'Temperature (°C)', [autumn, spring, summer, winter], 0.6);
          var snowfallChart = chartSampleSeries(climate.climateStratified, 'distance', ['autumn_snowfall_mean', 'spring_snowfall_mean', 'summer_snowfall_mean', 'winter_snowfall_mean'], 'ScatterChart', 'Seasonal Mean Snowfall by Distance', 'Distance (km)', 'Snowfall (m SWE)', [autumn, spring, summer, winter], 0.6);
          var solarChart = chartSampleSeries(climate.climateStratified, 'distance', ['autumn_surface_solar_radiation_downwards_mean', 'spring_surface_solar_radiation_downwards_mean', 'summer_surface_solar_radiation_downwards_mean', 'winter_surface_solar_radiation_downwards_mean'], 'ScatterChart', 'Seasonal Mean Downwelling Solar Radiation by Distance', 'Distance (km)', 'Solar Radiation Downwards (kJ)', [autumn, spring, summer, winter], 0.6);
          var snowlineChart = chartSample(snowline.snowEdgeVectorStratified.select(["altitude", "distance"]), 'distance', 'altitude', 'Snow-edge Altitude by Distance', 'Distance (km)', 'Altitude (m ASL)', ['red'], 0.2);
          panelChart2.add(temperatureChart);
          panelChart3.add(snowfallChart);
          panelChart4.add(solarChart);
          panelChart1.add(snowlineChart);
          
          /** Download Links **/
          snowline.snowEdgeVectorStratified.getDownloadURL({
            format: "csv",
            filename: "snowlinesSnowline" + settings.startDate + "T" + settings.advanceDays + settings.satelliteName.slice(0, 7) + settings.satelliteName.slice(8, 9),
            callback: function(url) {
              // ...and once url is retrieved update the label value and set it as a url link.
              downloadLabelSnowlines.setValue("Download Sample of Snowlines Data" + " (" + settings.startDate + "T" + settings.advanceDays + settings.satelliteName.slice(0, 7) + settings.satelliteName.slice(8, 9) + ")");
              downloadLabelSnowlines.setUrl(url);
              downloadLabelSnowlines.style().set("color", colourCyan);
            }
          });
          climate.climateStratified.getDownloadURL({
            format: "csv",
            filename: "snowlinesClimate" + settings.startDate.slice(0, 4),
            callback: function(url) {
              // ...and once url is retrieved update the label value and set it as a url link.
              downloadLabelClimate.setValue( "Download Sample of Climate Data" + " (" + settings.startDate.slice(0, 4) + ")");
              downloadLabelClimate.setUrl(url);
              downloadLabelClimate.style().set("color", colourCyan);
            }
          });
        }
      }, 5000));
    
    }
  });
}

/** UI **/
// MiniMap
var panelMiniMap = ui.Panel({
 widgets: [mapMini],
 layout: ui.Panel.Layout.absolute(),
 style: {
   height: "250px",
   width: "250px",
   padding: "0px 0px 0px 0px",
   position: "bottom-right",
   border: "8px solid white",
   },
});

// Intro
var labelIntroTitle = ui.Label({
  value: "Snowlines",
  style: {
    fontSize: "72px",
    fontWeight: "50",
    position: "top-center",
    height: "stretch",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelIntroText = ui.Label({
  value: "Resolve snowline altitudes at 30m resolution using imagery from Landsats 4-9 and the JAXA ALOS terrain model. Compare this to snowfall, temperature, and insolation data from the ERA5-land Climate Reanalysis.\n\nThe app shows you how snowline altitude and climate change across a transect. Some example settings from the corrosponding study are being computed right now!",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "160px",
    padding: "0px 0px 0px 0px",
    margin: "100px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelReference = ui.Label({
  value: "Quincey, L., Anderson, K., Reynolds, D. J., & Harrison, S. (2024). Summer snowline altitude gradients in Western Norway are influenced by maritime climate. Geografiska Annaler: Series A, Physical Geography, 1–22.",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    fontStyle: "italic",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "90px",
    padding: "0px 0px 0px 0px",
    margin: "270px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelDOI = ui.Label({
  value: "https://doi.org/10.1080/04353676.2024.2321426",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "20px",
    padding: "0px 0px 0px 0px",
    margin: "355px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
labelDOI.setUrl("https://doi.org/10.1080/04353676.2024.2321426");
var panelIntro = ui.Panel({
  widgets: [labelIntroTitle, labelIntroText, labelReference, labelDOI],
  layout: ui.Panel.Layout.absolute(),
  style: {
    height: "380px",
    width: "stretch",
    //stretch: "vertical",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px 0px",
    //border: "2px dashed red"
  }
});

// Settings
// - Intro
var labelSettingsTitle = ui.Label({
  value: "Settings",
  style: {
    fontSize: "28px",
    fontWeight: "400",
    position: "top-left",
    height: "32px",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px -10px",
    //border: "2px dashed red"
  }
});
var labelSettingsIntro = ui.Label({
  value: "Using the settings below, draw a transect, choose a date window to collect imagery from, and select an available Landsat satellite. Changes are automatically applied and loaded.",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "65px",
    padding: "0px 0px 0px 0px",
    margin: "50px 0px 0px 0px",
    //border: "2px dashed red"
  }
});

// - Transect
var labelSettingsTransectSubtitle = ui.Label({
  value: "Transect",
  style: {
    fontSize: "16px",
    fontWeight: "500",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "20px",
    padding: "0px 0px 0px 0px",
    margin: "120px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelSettingsTransectDrawinstructions = ui.Label({
  value: "Move around the map by clicking and dragging. To draw the transect, enter drawing mode by clicking the button below. Then click on the map to set the start of the transect and click again, elswhere, to set the end of the transect. Click the button again to exit and apply your changes. To start over, click the button again.",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "100px",
    padding: "0px 0px 0px 0px",
    margin: "140px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var buttonDraw = ui.Button({
  label: "✏️ Start/Stop Drawing",
  onClick: function() {
    drawLine();
    if (drawTools.layers().get(0).geometries().length() === 1) {
      transectGenerator();
      ui.util.debounce(run(), 5000);
    }
  },
  style: {
    width: "130px",
    height: "30px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    position: "top-center",
    padding: "0px 0px 0px 0px",
    margin: "245px 0px 0px 0px",
    //border: "2px dashed red"
    
  }
});
var labelSettingsTransectSliderinstructions = ui.Label({
  value: "Use the slider below to set the width of the transect you just drew.",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "40px",
    padding: "0px 0px 0px 0px",
    margin: "295px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var sliderTransectWidth = ui.Slider({
  min: 1,
  max: 100,
  value: 40,
  step: 1,
  onChange: ui.util.debounce(function(sliderValue) {
    if (drawTools.layers().get(0).geometries().length() === 1) {
      transectGenerator();
      run();
    }
  }, 5000),
  direction: "horizontal",
  style: {
    width: "400px",
    height: "20px",
    color: colourCyan,
    backgroundColor: "rgba(255, 255, 255, 0)",
    position: "top-left",
    padding: "0px 0px 0px 0px",
    margin: "325px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelSettingsTransectSliderUnits = ui.Label({
  value: "km Wide",
  style: {
    fontSize: "14.5px",
    fontWeight: "400",
    color: "#88cce3",
    whiteSpace: "pre-line",
    textAlign: "justify",
    width: "70px",
    height: "20px",
    padding: "0px 0px 0px 0px",
    margin: "333.5px 0px 0px 388px",
    //border: "2px dashed red"
  }
});

// - Date
var labelSettingsDateSubtitle = ui.Label({
  value: "Imagery Collection Date",
  style: {
    fontSize: "16px",
    fontWeight: "500",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "20px",
    padding: "0px 0px 0px 0px",
    margin: "370px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelSettingsDateInstructions1 = ui.Label({
  value: "The algorithm requires a date-window to collect imagery from. Specify this by selecting a start date...",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "40px",
    padding: "0px 0px 0px 0px",
    margin: "393px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var dateSlider = ui.DateSlider({
  start: "1982-08-22",
  value: settings.startDate,
  period: 1,
  onChange: ui.util.debounce(function(sliderValue) {
    sliderValue.start().format('YYYY-MM-dd').evaluate(function(cleintsideSliderValue) {
      settings.startDate = cleintsideSliderValue;
      satelliteFilter();
      run();
    });
  }, 5000),
  style: {
    width: "459px",
    height: "101px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    padding: "0px 0px 0px 0px",
    margin: "450px 0px 0px 0px",
    //border: "2px dashed red",
  }
});
var labelSettingsDateInstructions2 = ui.Label({
  value: "...and use the slider below to set the subsequent number of days you want to collect imagery for.",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "40px",
    padding: "0px 0px 0px 0px",
    margin: "560px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var advanceDaysSlider = ui.Slider({
  min: 1,
  max: 31,
  value: settings.advanceDays,
  step: 1,
  onChange: ui.util.debounce(function(sliderValue) {
    settings.advanceDays = sliderValue;
    run();
  }, 5000),
  direction: "horizontal",
  style: {
    color: colourCyan,
    backgroundColor: "rgba(255, 255, 255, 0)",
    width: "400px",
    height: "20px",
    position: "top-left",
    padding: "0px 0px 0px 0px",
    margin: "600px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelSettingsDateSliderUnits = ui.Label({
  value: "Days",
  style: {
    fontSize: "14.5px",
    fontWeight: "400",
    color: "#88cce3",
    whiteSpace: "pre-line",
    textAlign: "justify",
    width: "70px",
    height: "20px",
    padding: "0px 0px 0px 0px",
    margin: "608px 0px 0px 388px",
    //border: "2px dashed red"
  }
});

// - Satellite
var labelSettingsSatelliteSubtitle = ui.Label({
  value: "Satellite",
  style: {
    fontSize: "16px",
    fontWeight: "500",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "20px",
    padding: "0px 0px 0px 0px",
    margin: "640px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelSettingsSatelliteInstructions = ui.Label({
  value: "The drop-down menu below shows the available satellites for the date-window you specified. Select the satellite you wish to collect imagery from. Defaults to the latest possible satellite.",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "60px",
    padding: "0px 0px 0px 0px",
    margin: "663px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var satelliteSelect = null; // See input components > satellite filter
var satelliteSelectWrapper = ui.Panel({
  layout: ui.Panel.Layout.absolute(),
  style: {
    height: "33.5px",
    width: "133.5px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    position: "top-center",
    padding: "0px 0px 0px 0px",
    margin: "725px 0px 0px 0px",
    //border: "2px dashed red",
  }
}); // See input components > satellite filter

// - Combine into Settings Panel
var panelSettings = ui.Panel({
  widgets: [
    labelSettingsTitle, labelSettingsIntro,
    labelSettingsTransectSubtitle, labelSettingsTransectDrawinstructions, buttonDraw, labelSettingsTransectSliderinstructions, sliderTransectWidth, labelSettingsTransectSliderUnits,
    labelSettingsDateSubtitle, labelSettingsDateInstructions1, dateSlider, labelSettingsDateInstructions2, advanceDaysSlider, labelSettingsDateSliderUnits,
    labelSettingsSatelliteSubtitle, labelSettingsSatelliteInstructions, satelliteSelectWrapper
    ],
  layout: ui.Panel.Layout.absolute(),
  style: {
    height: "770px",
    width: "stretch",
    //stretch: "vertical",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px 0px",
    //border: "2px dashed red"
  }
});

// Results
var labelResultsTitle = ui.Label({
  value: "Results",
  style: {
    fontSize: "28px",
    fontWeight: "400",
    position: "top-left",
    height: "32px",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px -10px",
    //border: "2px dashed red"
  }
});
var labelResultsInfo = ui.Label({
  value: "The charts loading below show sampled results from the drawn transect. 0 km starts where you began drawing the transect. You can view the source imagery and other rasters in the map layers at the top right of the web page.",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "80px",
    padding: "0px 0px 0px 0px",
    margin: "50px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelResultsWhatshappeningSubtitle = ui.Label({
  value: "What's Happening?",
  style: {
    fontSize: "16px",
    fontWeight: "500",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "20px",
    padding: "0px 0px 0px 0px",
    margin: "140px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelResultsWhatshappeningInfo = ui.Label({
  value: "As you are reading this, the web app will have found any imagery present and has begun to process it live. In short, the algorithm is finding archetypal land surface pixels in order to apply a linear spectral unmixing function on the imagery. This allows us to estimate the percentange cover of snow in every pixel and then take all those above 50%. A simple edge-detection kernel is run over the imagery to find the edges of these predominantly snow pixels. Cloud, water, etc. are masked out and the remaining snow-edges are cross-referenced to the JAXA ALOS terrain model, providing an altitude for each snow-edge. This is the end result of the algorithm as is shown in the 'snow-edge' layer (red dots on the map). This generates a non-sampled, resolution-preserving point-cloud from which the snowline is predicted through an OLS regression (the black line on the snow-edge chart below). Thus, the spatial nature of snowlines can be interrogated at sub-regional scales!\n\nSeeing misclassifications? Zoom in - these are often artefacts of processing at lower resolution.\n\nThe data displayed are available to download via the links below. Note: the results are sampled to limit the size of the dataset so to not crash your web browser.",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "450px",
    padding: "0px 0px 0px 0px",
    margin: "160px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelChartsSubtitle = ui.Label({
  value: "Charts",
  style: {
    fontSize: "16px",
    fontWeight: "500",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "20px",
    padding: "0px 0px 0px 0px",
    margin: "620px 0px 0px 0px",
    //border: "2px dashed red"
  }
});

// - Combine Results Sections into Panel
var panelResults = ui.Panel({
  widgets: [
    labelResultsTitle, labelResultsInfo,
    labelResultsWhatshappeningSubtitle, labelResultsWhatshappeningInfo,
    labelChartsSubtitle
    ],
  layout: ui.Panel.Layout.absolute(),
  style: {
    height: "645px",
    width: "463px",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px 0px",
    //border: "2px dashed blue"
  }
});

// Charts
var loadMessage = ui.Label({
  value: "Waiting for map layers . . . (If page hangs, please wait)",
  style: {
    fontSize: "14px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    color: "#c92c00",
    backgroundColor: "#ffd2ba",
    height: "29px",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var panelChart1 = ui.Panel({
  widgets: [],
  layout: ui.Panel.Layout.flow(),
  style: {
    padding: "0px, 0px, 0px, 0px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    stretch: "vertical",
    width: "459px",
    position: "top-center"
  }
});
var panelChart2 = ui.Panel({
  widgets: [],
  layout: ui.Panel.Layout.flow(),
  style: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    height: "stretch",
    width: "459px",
    position: "top-center",
    padding: "0px, 0px, 0px, 0px",
    margin: "0px, 0px, 0px, 0px",
    //border: "2px dashed red",
  }
});
var panelChart3 = ui.Panel({
  widgets: [],
  layout: ui.Panel.Layout.flow(),
  style: {
    padding: "0px, 0px, 0px, 0px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    stretch: "vertical",
    width: "459px",
    position: "top-center"
  }
});
var panelChart4 = ui.Panel({
  widgets: [],
  layout: ui.Panel.Layout.flow(),
  style: {
    padding: "0px, 0px, 0px, 0px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    stretch: "vertical",
    width: "459px",
    position: "top-center"
  }
});
var panelCharts = ui.Panel({
  widgets: [loadMessage, panelChart1, panelChart2, panelChart3, panelChart4],
  layout: ui.Panel.Layout.flow(),
  style: {
    height: "stretch",
    width: "463px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    position: "top-center",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px 0px",
    //border: "2px dashed red",
  }
});

// Donwload
var labelDownloadSubtitle = ui.Label({
  value: "Download",
  style: {
    fontSize: "16px",
    fontWeight: "500",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "25px",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var loadMessage2 = ui.Label({
  value: "Waiting for map layers . . . (If page hangs, please wait)",
  style: {
    fontSize: "14px",
    fontWeight: "300",
    whiteSpace: "pre-line",
    textAlign: "justify",
    color: "#c92c00",
    backgroundColor: "#ffd2ba",
    height: "29px",
    padding: "0px 0px 0px 0px",
    margin: "5px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var downloadLabelSnowlines = ui.Label({
  value: "Loading . . .",
  style: {
    height: "20px",
    padding: "0px, 0px, 0px, 0px",
    margin: "0px, 0px, 0px, 0px",
    shown: false
  }
});
var downloadLabelClimate = ui.Label({
  value: "Loading . . .",
  style: {
    height: "20px",
    padding: "0px, 0px, 0px, 0px",
    margin: "0px, 0px, 0px, 0px",
    shown: false
  }
});
var panelLinks = ui.Panel({
  widgets: [labelDownloadSubtitle, loadMessage2, downloadLabelSnowlines, downloadLabelClimate],
  layout: ui.Panel.Layout.flow(),
  style: {
    height: "stretch",//"98px",
    width: "463px",
    padding: "0px, 0px, 0px, 0px",
    margin: "0px, 0px, 0px, 0px",
    //border: "2px dashed red",
  }
});

// Credits
var labelCreditsTitle = ui.Label({
  value: "Credits",
  style: {
    fontSize: "28px",
    fontWeight: "400",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "28px",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelSources = ui.Label({
  value: "Data Sources:\n- Imagery from the Landsat programme, USGS\n- Altitude from ALOS World 3D DSM, JAXA EORC\n- Climate data from the ERA5-land Climate Reanalysis (This study contains modified Copernicus Climate Change Service Information 2022 for which neither the European Commission nor ECMWF is responsible)\n- Glacier and ice caps from GLIMS\n- Waterbodies from EU JRC Waterbodies.",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    fontStyle: "italic",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "190px",
    padding: "0px 0px 0px 0px",
    margin: "32px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
var labelCredits = ui.Label({
  value: "Author: Earth Engine app and algorithms created by Laurie Quincey, 2022",
  style: {
    fontSize: "16px",
    fontWeight: "300",
    fontStyle: "italic",
    whiteSpace: "pre-line",
    textAlign: "justify",
    height: "40px",
    padding: "0px 0px 0px 0px",
    margin: "220px 0px 0px 0px",
    //border: "2px dashed red"
  }
});
labelCredits.setUrl("https://github.com/lauriequincey/snowlines");

var panelCredits = ui.Panel({
  widgets: [labelCreditsTitle, labelSources, labelCredits],
  layout: ui.Panel.Layout.absolute(),
  style: {
    height: "275px",
    width: "stretch",
    padding: "0px 0px 0px 0px",
    margin: "25px 0px 0px 0px",
    //border: "2px dashed blue"
  }
});

// Combine to root panel
var panelMain = ui.Panel({
  widgets: [panelIntro, panelSettings, panelResults, panelCharts, panelLinks, panelCredits],
  layout: ui.Panel.Layout.flow(),
  style: {
    height: "100%",
    width: "500px",
    padding: "0px 12px 0px 12px",
    margin: "0px 0px 0px 0px",
    //border: "2px dashed red"
  }
});

/** Initialise **/
ui.root.clear();
ui.root.add(panelMain);
ui.root.add(mapMain);
mapMain.add(panelMiniMap);
mapMain.add(drawMessage);
mapMain.add(errMessage);
transectGenerator();
satelliteFilter();
run();