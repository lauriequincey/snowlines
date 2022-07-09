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

/** Variables **/
// Aesthetics (clientside)
var colourCyan = "#88cce3";
var colourGreen = "#56fc03";
var colourBlack = "Black";
var colourRed = "Red";
var colourGrey = "#a3a3a3";

// subpanel State (clientside)
var widgetState = {
  transect: 0,
  date: 0,
  advanceDays: 0,
  satelliteSelect: 0,
  lapseRate: 0,
  run: 0
};
// results panel State
var resultsState = 0;

// Transect
var drawTools = mapMain.drawingTools().setShown(false); // (clientside)
var drawLineState = 0; // Clientside
var drawMessage = ui.Label({});
var transectLine = null;

// Satellite
var availableSatellites = ee.List(["Landsat 7", "Landsat 8"]);

// Empty Error Message
var errMessage = ui.Label({
  style: {
    color: "red",
    shown: false,
    position: "top-center"
  }
});

// Settings (clientside)
var settings = {
  
  // Check Purpose
  purposeSnowline: false,
  purposeClimate: false,
  purposeValidation: false,
  
  // Transect
  transect: null,
  ltCoord: null,
  lbCoord: null,
  transectWidth: 40,
  
  // Dates
  startDate: "2018-06-02",
  advanceDays: 16,
  
  // Satellite
  satelliteName: ['Landsat 7', 'Landsat 8'],
};

// Results (by dict level: client/client/server)
var results = {
  snowline: {},
  climate: {},
};

/** Functions **/
function recolour(widgetValue, widget) {
  if(widgetValue === true) {
    widget.style().set("color", colourCyan);
  } else {
    widget.style().set("color", colourGrey);
  }
}
function showHideWidgets(checkValue, widgetList) {
  
  // Why the scoring state thing? means multiple inputs can be used without turning the widget off when it one of the inputs is still on.
  // If checkbox is true...
    if(checkValue === true) {
      
      // ...go through each widget supplied and...
      widgetList.map(function(widget) {
        
        // ...add 1 to their widget state
        widgetState[widget] = widgetState[widget] + 1;
        
        // ...if there widget state is higher than 0, turn on
        if (widgetState[widget] > 0) {subpanel[widget].style().set("shown", true)}
        
      });
      
    // If checkbox is false...
    } else {
      
      // ...go through each widget supplied and...
      widgetList.map(function(widget) {
        
        // ...minus 1 to their widget state
        widgetState[widget] = widgetState[widget] - 1;
        
        // ...if there widget state is equal to 0, turn off
        if (widgetState[widget] === 0) {subpanel[widget].style().set("shown", false)}
        
      });
    }
} // (clientside)
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
    widgets.buttonDraw.style().set("color", colourCyan);
  
  // If there is a drawing...
  } else {
    
    // ...close drawing tools, completing the shape
    drawTools.stop();
    
    // ...set draw state to off
      drawLineState = 0;
    
    // ...set button to drawing mode off colour
    widgets.buttonDraw.style().set("color", colourBlack);
  }
  
  /** Code for displaying drawing messages **/
  // When something is drawn
  drawTools.onDraw(function(input) {
    mapMain.remove(drawMessage);
    mapMain.add(drawMessage);
    drawMessage.setValue("Transect Set").style().set("color", colourGreen);
  });
  // When drawing is removed
  drawTools.onLayerRemove(function() {
    mapMain.remove(drawMessage);
    mapMain.add(drawMessage);
    drawMessage.setValue("Drawing Cleared").style().set("color", colourRed);
  });
  // Remove messages after half a second
  ui.util.setTimeout(function() {mapMain.remove(drawMessage)}, 500);
  }
function transectGenerator() {
    
  /** Get geometry **/
  var transectLine = drawTools.layers().get(0).geometries().get(0);
  
  /** Buffer Line Geometry **/
  // Buffer by half that of the desired transect width and retrieve coordinates of the new geometry
  var bufferedLine = transectLine.buffer(ee.Number(settings.transectWidth).multiply(1000).divide(2));
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
  
  /** Remove from / add to maps **/
  if(mapMain.layers().length() > 0) {
      mapMain.remove(mapMain.layers().get(0));
      mapMini.remove(mapMini.layers().get(0));
  }
  mapMain.addLayer(transect, {}, "Transect");
  mapMini.addLayer(transect, {}, "Transect");
  
  /** Write to Settings **/
  settings.transect = transect;
  settings.ltCoord = ltCoord;
  settings.lbCoord = lbCoord;
}
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
        "dateRange": ee.DateRange("1982-08-22", "1993-06-24"),
        "platform": ["Landsat 4"]
      }),
      ee.Feature(null, {
        "dateRange": ee.DateRange("1984-03-16", "2012-05-05"),
        "platform": ["Landsat 5"]
      }),
      ee.Feature(null, {
        "dateRange": ee.DateRange("1999-05-28", "2022-04-06"),
        "platform": ["Landsat 7"]
      }),
      ee.Feature(null, {
        "dateRange": ee.DateRange("2013-03-18", ee.Date(Date.now())),
        "platform": ["Landsat 8"]
      }),
      ee.Feature(null, {
        "dateRange": ee.DateRange("2021-10-31", ee.Date(Date.now())),
        "platform": ["Landsat 9"]
      })
    ]);
    
    /** Compare sliderValue to feature collection date range and write to settings **/
    availableSatellites = satelliteDates.filter(ee.Filter.dateRangeContains({
      leftField: "dateRange",
      rightValue: ee.Date(settings.startDate)
    }));
    
    /** Declare and Refresh satellitePicker Widget **/
    // Evaluate so start up is quicker as there is no use of get.Info()
    availableSatellites.aggregate_array("platform").flatten().evaluate(function(evalAvailableSatellites) {
      widgets.satelliteSelect = ui.Select({
        items: evalAvailableSatellites,
        placeholder: "Select Satellite",
        value: null,
        onChange: function(selectedValue) {
          
          /** Write sliderValue to settings **/
          settings.satelliteName = selectedValue;
          
          /** Change menu colour when option is selected **/
          widgets.satelliteSelect.style().set("color", colourCyan);
          
        },
        style: {
          color: "#a3a3a3",
          backgroundColor: "rgba(255, 255, 255, 0)",
          width: "435px",
          position: "top-center",
          padding: "0px 0px 0px 0px"
        }
      });
      widgets.satelliteSelectWrapper.add(widgets.satelliteSelect);
    });
  }
function imageryChecker(startDate, advanceDays, satelliteName, transect) {
  
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
}
function snowlines(startDate, advanceDays, satelliteName, transect, ltCoord, lbCoord, imagery) {
  
  /** Glacier and Water Masks **/
  
  // Glacer Mask
  var glacierMask = ee.FeatureCollection("GLIMS/current")
    .filterBounds(transect)
    .select('area')
    
    // Rasterise
    .reduceToImage({
      properties: ['area'],
      reducer: ee.Reducer.mean()})
    .rename('glacierMask')
    
    // Buffer area (after rasterisation is quicker)
    .focal_max({
      radius: 180,
      kernelType: 'square',
      units: 'meters', 
      iterations: 1
    })
    
    // Invert mask so non-glaciers are white
    .eq(1)
    .unmask(1);
  
  // Water Mask
  var waterMask = ee.Image("JRC/GSW1_3/GlobalSurfaceWater")
    .select(['max_extent'], ['waterMask'])
    .focal_max({
      radius: 100,
      kernelType: 'square',
      units: 'meters', 
      iterations: 1
    })
    
    // Invert mask so non-waters are white
    .eq(0);
  
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
    ])
    
    // Convert to Double
    .double();
  
  /** Endmembers **/
  
  // Cloud and Cloud Shadows Mask
  var imagery = imagery.map(function(image) {
    return image.addBands([
      
      // Add cloud and cloud shadow masks to each image
      ee.Image.constant(1).updateMask(
        // Cloud
        image.select('QA_PIXEL')
             .bitwiseAnd(1 << 3)
             .eq(0)
        .and(
        // Cloud Shadows
        image.select('QA_PIXEL')
             .bitwiseAnd(1 << 4)
             .eq(0)))
      .rename('cloudMask').unmask(),
      
      // Add Unix Time bands to each image
      ee.Image.constant(ee.Date(image
        .get('DATE_ACQUIRED'))
        .millis()
        )
        .int64()
        .rename('aqcuisition_time')
    ]);
  });
  
  // Cloudless Mosaic
  var qualityMosaic = imagery.qualityMosaic('cloudMask');
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
      
    // Water (1 / MNDWI)
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
  
  /** Snow-edge **/
  var snowEdge = imagery.map(function(image) {
    
    /** Snowcap **/ 
    var snowCap = image
    
      /** Linear Spectral Unmixing **/
      .select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
      .unmix({
        endmembers: endmembers,
        sumToOne: true,
        nonNegative: true
      })
      .rename('snow_component', 'vegetation_component', 'water_component', 'rock_component')
    
      /** Find 50% and above snow pixels **/
      .select(['snow_component'], ['snow_extent'])
      .gte(0.5);
      
    /** Snow-edge **/
    return snowCap
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
      
      /** Mask **/
      .updateMask(
        
        /** Glacier **/
        glacierMask
        
        /** Water **/
        .and(waterMask
        
        /** Rocky Outcrops **/
          .and(snowCap
          // Invert Snowcap mask
            .not()
            .selfMask()
            // Run Connected Components
            .connectedComponents({
              connectedness: ee.Kernel.square({
                radius: 1, // msut be 1 for edge detection
                units: 'pixels'
              }),
              maxSize: 150 // a nice size for each component
            })
            // Create Mask
            .select('labels') // select the components band
            .neq(0) // all the components
            .unmask() // unmask...
            .not() // ...and invert for masking
              
        /** Clouds **/
            .and(image.expression('((Green * (NIR - SWIR)) / ((Green + NIR) * (NIR + SWIR)))',
                                 {'Green': image.select('Green'),
                                  'NIR':   image.select('NIR'),
                                  'SWIR':  image.select('SWIR_1')}
                                  ).gt(0.21)
            )
          )
        )
      )
      
      /** Add Metrics **/
      .addBands([
        image.select("aqcuisition_time"), // Aqcuisition time of image
        metrics, // environmental image
        ee.Image(ee.Number(ee.Image(image).get('SUN_ELEVATION'))).rename(['sun_elevation']) // sun elevations
      ]);
  });
  
  /** Vectorise **/
  var snowEdgeVector = snowEdge.map(function(edge) {
    // Vectorise the snow_edge image with metrics into a table of results (feature collection), a row per pixel
    return edge.sampleRegions({
      collection: transect,
      scale: 30,
      tileScale: 4,
      geometries: true
    })
    // add transect distances to the results table
    .map(function(feature) {
      return feature.set(
        // Property Name
        'distance',
        // Property Values
        feature
          // Get geom
          .geometry()
          // find distance to start line created from transect coords
          .distance(ee.Geometry.LineString([ltCoord.coordinates(), lbCoord.coordinates()]))
          // put into km
          .divide(1000)
        );
    });
  });
  
  /** Remove Nulls **/
  //snowEdgeVector = snowEdgeVector.flatten().filter(ee.Filter.notNull(ee.Feature(snowEdgeVector.first()).propertyNames()));
  
  /** Write to Results Dictionary **/
  results.snowline = {
    "imagery": imagery,
    "glacierMask": glacierMask,
    "waterMask": waterMask,
    "qualityMosaic": qualityMosaic,
    "snowEdge": snowEdge,
    "snowEdgeVector": snowEdgeVector.flatten(),
  };
}
function climate(startDate, transect, ltCoord, lbCoord) {
 
   /** Year **/
  var year = ee.Date(startDate);
  
  /** Metrics (Land Elevation and Transect Distance) **/
  
  // Import Land Surface Elevation 
  var metrics = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
    .filterBounds(transect)
    .select(['DSM'], ['altitude'])
    .mosaic() // mosaic as the JAXA data are an image collection not single raster.
    
  // Reduce Elevation to scale of climate data by their mean
    .setDefaultProjection({crs: "EPSG:4326", scale: 11132})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort: true
    })
  
  // Vectorise
    .sampleRegions({
      collection: transect,
      properties: null,
      scale: 11132, // at scale of climate data
      projection: null,
      tileScale: 1,
      geometries: true
    })
  
  // Add Transect Distances (in km)
    .map(function(point) {
      
      // How far is each point...
      var distance = point
        .geometry()
        .distance(
          // ... to the start of the transect (a line between the left hand coordinates)
          ee.Geometry.LineString([ltCoord, lbCoord])
        );
      return point.set('distance', distance.divide(1000)); // in km
    
    });
  
  /** Climate **/
  var climateVariables = ee.List([
    'temperature_2m',
    'snowfall',
    'snowmelt',
    'surface_latent_heat_flux',
    'surface_sensible_heat_flux',
    'surface_solar_radiation_downwards',
    'snow_evaporation'
  ]);
  
  var climate = ee.ImageCollection(ee.FeatureCollection([
    
    // Import
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year'), 06, 01), ee.Date.fromYMD(year.get('year'), 8, 31))),
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year').subtract(1), 12, 01), ee.Date.fromYMD(year.get('year'), 02, 28))),
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year'), 03, 01), ee.Date.fromYMD(year.get('year'), 05, 28))),
    ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
     .select(climateVariables)
     .filterBounds(transect)
     .filterDate(ee.DateRange(ee.Date.fromYMD(year.get('year').subtract(1), 9, 01), ee.Date.fromYMD(year.get('year'), 11, 30)))
  ])
  
    // Reduce seasons...
    .map(function(season) {
      
      // ...to means
      var seasonMean = ee.ImageCollection(season).reduce(ee.Reducer.mean());
      
      // ...and SEMs
      var seasonSem = ee.ImageCollection(season).reduce(ee.Reducer.stdDev()).divide(ee.ImageCollection(season).size().sqrt())
      
        // Rename bands from the default "stdDev" to "_sem" as we calculate the standard error of the mean.
        .rename(ee.Image(seasonMean).bandNames().map(function(name){return ee.String(name).cat("_sem")}));
      
    return seasonMean.addBands(seasonSem);
  
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
  
  /** Sample Climate at Metrics Points (Vectorising) **/
  var climateVector = climate.reduceRegions({
      collection: metrics,
      reducer: ee.Reducer.mean(),
      scale: 11132
  });
  
  /** Remove Nulls **/
  climateVector = climateVector.filter(ee.Filter.notNull(ee.Feature(climateVector.first()).propertyNames()));
  
  /** Write to Settings **/
  results.climate = climateVector;
}
function convertTemperature(climateData) {
  return climateData.map(function(feature) {
    return ee.Feature(feature).set("summer_temperature_mean", ee.Number(ee.Feature(feature).get("summer_temperature_mean")).subtract(273.1),
                                   "winter_temperature_mean", ee.Number(ee.Feature(feature).get("winter_temperature_mean")).subtract(273.1),
                                   "spring_temperature_mean", ee.Number(ee.Feature(feature).get("spring_temperature_mean")).subtract(273.1),
                                   "autumn_temperature_mean", ee.Number(ee.Feature(feature).get("autumn_temperature_mean")).subtract(273.1));
  });
}
function correctTemperature(climateData) {
  
  return climateData.map(function(feature) {
    return ee.Feature(feature).set(
      "summer_temperature_mean",
      ee.Number.expression({
        expression: " input + ((altitude / 100) * lapseRate)",
        vars: {
          input: ee.Number(ee.Feature(feature).get("summer_temperature_mean")),
          altitude: ee.Number(ee.Feature(feature).get("altitude")),
          lapseRate: 0.65
        }
      }),
      "autumn_temperature_mean",
      ee.Number.expression({
        expression: " input + ((altitude / 100) * lapseRate)",
        vars: {
          input: ee.Number(ee.Feature(feature).get("autumn_temperature_mean")),
          altitude: ee.Number(ee.Feature(feature).get("altitude")),
          lapseRate: 0.65
        }
      }),
      "winter_temperature_mean",
      ee.Number.expression({
        expression: " input + ((altitude / 100) * lapseRate)",
        vars: {
          input: ee.Number(ee.Feature(feature).get("winter_temperature_mean")),
          altitude: ee.Number(ee.Feature(feature).get("altitude")),
          lapseRate: 0.65
        }
      }),
      "spring_temperature_mean",
      ee.Number.expression({
        expression: " input + ((altitude / 100) * lapseRate)",
        vars: {
          input: ee.Number(ee.Feature(feature).get("spring_temperature_mean")),
          altitude: ee.Number(ee.Feature(feature).get("altitude")),
          lapseRate: 0.65
        }
      })
    );
  });
  
}
function chartSample(featureCollection, samplingDistribution, rows, xProperty, yProperties, title, hAxisTitle, vAxisTitle, colors, dataOpacity) {
  
  // Filter each feature by the x and the y columns to remove all rows that are nulls
  featureCollection = featureCollection.filter(ee.Filter.notNull([xProperty, yProperties]));
  
  var sample = ee.FeatureCollection(featureCollection)
    // Add random number column
    .randomColumn({
      columnName: 'random',
      seed: 2,
      distribution: samplingDistribution
    })
    // Limit row number based on ascending random number order (thereby creating a random sample of a feature collection!)
    .limit({
      max: rows,
      property: 'random',
      ascending: true
    });
  
  return ui.Chart.feature.byFeature({
    features: sample,
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
      viewWindow: {min: 0, max: sample.aggregate_max(xProperty)}
    },
    vAxis: {
      title: vAxisTitle,
      titleTextStyle: {italic: false, bold: true},
      gridlines: {count: 0},
      viewWindow: {min: 0, max: sample.aggregate_max(yProperties)}
    },
    width: "460px",
    height: "291.875px", // golden ratio (10:16)
    colors: colors,
    chartArea: {backgroundColor: "white"},
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
    }
  })
  .setDownloadable(true);
}
function chartSample2(featureCollection, samplingDistribution, rows, xProperty, yProperties, chartType, title, hAxisTitle, vAxisTitle, colorsList, dataOpacity) {
  
  /** Prep **/
  // Filter each feature by the x and the y columns to remove all rows that are nulls
  featureCollection = featureCollection.filter(ee.Filter.notNull(ee.List([xProperty, yProperties]).flatten()));
  
  /** Sample **/
  var sample = ee.FeatureCollection(featureCollection)
    // Add random number column
    .randomColumn({
      columnName: 'random',
      seed: 2,
      distribution: samplingDistribution
    })
    // Limit row number based on ascending random number order (thereby creating a random sample of a feature collection!)
    .limit({
      max: rows,
      property: 'random',
      ascending: true
    });
  
  /** Chart **/
  return ui.Chart.feature.byFeature({
    features: sample,
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
      viewWindow: {min: 0, max: sample.aggregate_max(xProperty)}
    },
    vAxis: {
      title: vAxisTitle,
      titleTextStyle: {italic: false, bold: true},
      gridlines: {count: 0},
    },
    colors: colorsList,
    dataOpacity: dataOpacity,
  })
  .setDownloadable(true);
}

/** Widgets (clientside) **/
var widgets = {
  /** User Inputs **/
  checkSnowline: ui.Checkbox({
    label: "Resolve Snowlines",
    value: settings.purposeSnowline,
    onChange: function(checkValue) {
      
      /** Write checkValue to settings **/
      settings.purposeSnowline = checkValue;
      
      /** showHideWidgets **/
      showHideWidgets(checkValue, ["transect", "date", "advanceDays", "satelliteSelect", "run"]);
      
      /** Recolour **/
      recolour(checkValue, widgets.checkSnowline);
      
    },
    style: {
      color: colourGrey,
      position: "bottom-left",
      padding: "10px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    }
  }),
  checkClimate: ui.Checkbox({
    label: "Explore Climate",
    value: settings.purposeClimate,
    onChange: function(checkValue) {
      
      /** Write checkValue to settings **/
      settings.purposeClimate = checkValue;
      
      /** showHideWidgets **/
      showHideWidgets(checkValue, ["transect", "date", "lapseRate", "run"]);
      
      /** Recolour **/
      recolour(checkValue, widgets.checkClimate);
      
    },
    style: {
      color: colourGrey,
      position: "bottom-right",
      padding: "10px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    }
  }),
  buttonDraw: ui.Button({
    label: "✏️ Start/Stop Drawing",
    onClick: function() {
      
      /** Run drawLine Function **/
      drawLine();
      
      /** If there is a shape drawn, generate a transect **/
      // Removes error messages by doing this.
      if (drawTools.layers().get(0).geometries().length() === 1) {
        transectGenerator();
      }
    },
    style: {
      position: "bottom-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    }
  }),
  sliderTransectWidth: ui.Slider({
    min: 1,
    max: 100,
    value: 40,
    step: 1,
    onChange: function(sliderValue) {
      
      /** Write the slider value to the settings **/
      settings.transectWidth = sliderValue;
      
      /** If there is a shape drawn, generate a transect **/
      // Removes error messages by doing this.
      if (drawTools.layers().get(0).geometries().length() === 1) {
        transectGenerator();
      }
    },
    direction: "horizontal",
    style: {
      width: "250px",
      color: colourCyan,
      position: "bottom-right",
      padding: "0px 30px 5px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    }
  }),
  dateSlider: ui.DateSlider({
    start: "1982-08-22",
    value: settings.startDate,
    period: 1,
    onChange: function(sliderValue) {
      
      /** Write slider value to settings **/
      settings.startDate = sliderValue.start();
      
      /** Update Satellite Picker **/
      // Refresh the satellite picker panel with new options. Stops users from picking satellites with no imagery for the date.
      // A simple throttle stops most calls (eg. quickly picking different days).
      // However, fast scrolling the years send onChange values very fast so I use rate limit at 10 milliseconds to stop this.
      ui.util.rateLimit(ui.util.throttle(satelliteFilter(), 10), 1000);
      
    },
    style: {
      width: "430px",
      position: "bottom-center",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    }
  }),
  advanceDaysSlider: ui.Slider({
    min: 1,
    max: 31,
    value: settings.advanceDays,
    step: 1,
    onChange: function(sliderValue) {
      
      /** Write sliderValue to settings **/
      settings.advanceDays = sliderValue;
      
    },
    direction: "horizontal",
    style: {
      color: colourCyan,
      position: "bottom-left",
      width: "415px",
      padding: "10px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    }
  }),
  satelliteSelect: null,
  satelliteSelectWrapper: ui.Panel({
    layout: ui.Panel.Layout.absolute(),
    style: {
      height: "80px",
      width: "451px",
      position: "bottom-center",
      padding: "0px 0px 50px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    }
  }),
  lapseRateCheck: ui.Checkbox({
    label: "Correct Temperature",
    value: true,
    onChange: function(checkValue) {
      
      /** Recolour **/
      recolour(checkValue, widgets.lapseRateCheck);
      
    },
    style: {
      color: colourGrey,
      position: "bottom-left",
      padding: "10px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    }
  }),
  /** Actions **/
  buttonRun: ui.Button({
    label: "Run",
    onClick: function() {
      /** Clear Results **/
      resultsBottomSplit.clear();
      subpanel.resultsLinks.clear();
      
      var transectLayer = mapMain.layers().get(0);
      mapMain.layers().reset();
      mapMain.layers().add(transectLayer);
      /** Snowlines **/
      // If the user has selected snowlines...
      if (widgets.checkSnowline.getValue() === true) {
        
        // ...make sure the user has selected all the necessary settings...
        if (drawTools.layers().length() === 0 || drawTools.layers().get(0).geometries().length() === 0 || widgets.satelliteSelect.getValue() === null) {
          
          // ... if not then show error message.
           errMessage.setValue("You've missed some settings!");
           errMessage.style().set('shown', true);
           ui.util.setTimeout(function() {errMessage.style().set('shown', false)}, 2000);
           
        } else {
          
          // ...if they have then check for imagery...
          var imagery = imageryChecker(settings.startDate, settings.advanceDays, settings.satelliteName, settings.transect);
          imagery.size().evaluate(function(input) {
            
            if (input === 0) {
            
              // ...if there is no imagery display error message.
              errMessage.setValue("No imagery available for this date");
              errMessage.style().set('shown', true);
              ui.util.setTimeout(function() {errMessage.style().set('shown', false)}, 2000);
              
            } else {
              
              //...if there is imagery then continue to show results...
              /** Show Results Panel **/
              panelResults.style().set('shown', true);
              
              /** Run snowlines algorithm **/
              snowlines(settings.startDate, settings.advanceDays, settings.satelliteName, settings.transect, settings.ltCoord, settings.lbCoord, imagery);
              
              /** Visualise **/
              mapMain.addLayer(results.snowline.imagery, {}, "Raw Imagery", 0);
              mapMain.addLayer(results.snowline.glacierMask.selfMask(), {palette: 'cyan'}, "Glaciers", 0);
              mapMain.addLayer(results.snowline.waterMask.selfMask(), {palette: 'blue'}, "Water Bodies", 0);
              mapMain.addLayer(results.snowline.qualityMosaic, {}, "Mosaicked Imagery", 1);
              mapMain.addLayer(results.snowline.snowEdge.select("snow_edge"), {palette: 'red'}, "Snow Edge", 1);
                
              /** Chart Sample of Results **/
              var chartSnowline = chartSample(
                results.snowline.snowEdgeVector,
                'normal',
                5000,
                'distance',
                'altitude',
                'Snow-edge Altitude by Distance',
                'Distance (km)',
                'Altitude (m asl)',
                ['red'],
                0.05
              );
              resultsBottomSplit.add(chartSnowline);
              
              /** Download Data **/
              // Print label with value to show its loading 
              var downloadLabelSnowlines = ui.Label({value: " . . . loading"});
              subpanel.resultsLinks.add(downloadLabelSnowlines);
              
              // Get url to download...
              results.snowline.snowEdgeVector.getDownloadURL({
                format: "csv",
                filename: "snowlines-snowline-" + settings.startDate,
                callback: function(url) {
                  // ...and once url is retrieved update the label value and set it as a url link.
                  downloadLabelSnowlines.setValue("Download Full Snowlines Dataset");
                  downloadLabelSnowlines = downloadLabelSnowlines.setUrl(url);
                }
              });            
              }
          });
        }
      }
      /** Climate **/
      if (widgets.checkClimate.getValue() === true) {
        /** Show Results Panel **/
        panelResults.style().set('shown', true);
        
        /** Run Climate Algorithm **/
        climate(settings.startDate, settings.transect, settings.ltCoord, settings.lbCoord);
        results.climate = convertTemperature(results.climate);
        
        if(widgets.lapseRateCheck.getValue() === true) {
          results.climate = correctTemperature(results.climate);
        }
        
        /** Chart Sample of Results **/
        var chartClimateTemperature = chartSample2(
          results.climate,
          'normal',
          5000,
          'distance',
          ['autumn_temperature_mean', 'spring_temperature_mean', 'summer_temperature_mean', 'winter_temperature_mean'],
          'ScatterChart',
          'Seasonal Mean Surface Temperature by Distance',
          'Distance (km)',
          'Temperature (°C)',
          ['orange', 'green', 'yellow', 'blue'],
          0.1
        );
        resultsBottomSplit.add(chartClimateTemperature);
        
        var chartClimateSnowfall = chartSample2(
          results.climate,
          'normal',
          5000,
          'distance',
          ['autumn_snowfall_mean', 'spring_snowfall_mean', 'summer_snowfall_mean', 'winter_snowfall_mean'],
          'ScatterChart',
          'Seasonal Mean Snowfall by Distance',
          'Distance (km)',
          'Snowfall (m S.W.E)',
          ['orange', 'green', 'yellow', 'blue'],
          0.1
        );
        resultsBottomSplit.add(chartClimateSnowfall);
        
        var chartClimateSolar = chartSample2(
          results.climate,
          'normal',
          5000,
          'distance',
          ['autumn_surface_solar_radiation_downwards_mean', 'spring_surface_solar_radiation_downwards_mean', 'summer_surface_solar_radiation_downwards_mean', 'winter_surface_solar_radiation_downwards_mean'],
          'ScatterChart',
          'Seasonal Mean Downwelling Solar Radiation by Distance',
          'Distance (km)',
          'Solar Radiation Downwards (kJ)',
          ['orange', 'green', 'yellow', 'blue'],
          0.1
        );
        resultsBottomSplit.add(chartClimateSolar);
        
        /** Download Data **/
        // Print label with value to show its loading 
        var downloadLabelClimate = ui.Label({value: " . . . loading"});
        subpanel.resultsLinks.add(downloadLabelClimate);
        
        // Get url to download...
        results.climate.getDownloadURL({
          format: "csv",
          filename: "snowlines-climate-" + settings.startDate,
          callback: function(url) {
            // ...and once url is retrieved update the label value and set it as a url link.
            downloadLabelClimate.setValue( "Download Full Climate Dataset");
            downloadLabelClimate = downloadLabelClimate.setUrl(url);
          }
        });
        
      }
      /** Link to Transect Shapefile **/
      // Print label with value to show its loading 
      // var downloadLabelTransect = ui.Label({value: " . . . loading"});
      // subpanel.resultsLinks.add(downloadLabelTransect);
      
      // Get url to download...
      // mapMain.layers().get(0).getDownloadURL({
      //   format: "csv",
      //   filename: "snowlines-transect-",
      //   callback: function(url) {
      //     // ...and once url is retrieved update the label value and set it as a url link.
      //     downloadLabelTransect.setValue( "Download Transect Shapefile");
      //     downloadLabelTransect = downloadLabelTransect.setUrl(url);
      //   }
      // });
    },
    style: {
      width: "435px",
      position: "top-center",
      backgroundColor: "rgba(255, 255, 255, 0)"
    }
  }),
  buttonClose: ui.Button({
    label: "Minimise Results",
    onClick: function() {
      panelResults.style().set('shown', false);
      widgets.buttonOpen.style().set('shown', true);
    },
    style: {
      position: "bottom-center",
      backgroundColor: "rgba(255, 255, 255, 0)"
    }
  }),
  buttonOpen: ui.Button({
  label: "Re-open Results",
  onClick: function() {
    panelResults.style().set('shown', true);
    widgets.buttonOpen.style().set('shown', false);
  },
  style: {
    position: "bottom-center",
    backgroundColor: "rgba(255, 255, 255, 0)",
    shown: false
  }
}),
  /** Text **/
  // Story
  // Top Split
  title: ui.Label({
    value: "Snowlines",
    style: {
     fontSize: "48px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     textAlign: "center",
     position: "top-center",
     padding: "0px 0px 0px 0px",
     
    }
  }),
  subtitle: ui.Label({
    value: "Resolve off-glacial mountain snowline altitudes at 30m resolution using Landsats 4-9.",
    style: {
     fontSize: "18px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     textAlign: "center",
     position: "top-left",
     padding: "70px 0px 0px 0px",
    }
  }),
  aboutSubTitle: ui.Label({
    value: "About",
    style: {
     fontSize: "36px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  aboutText: ui.Label({
    value: "Snow is an important constituent of the cryosphere, especially important in light of climate change. As good barometers of climate, mountains exhibit the effects in snow extent, thickness, and season length. These alterations have profound environmental effects ranging from sub-nival microbial habitats and regional scale climates and ecology to social pressures on energy and water resources.",
    style: {
     fontSize: "14px",
     fontWeight: "200",
     textAlign: "justify",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "45px 0px 0px 0px",
    }
  }),
  snowlineClimateSubTitle: ui.Label({
    value: "Climate and The Snowline",
    style: {
     fontSize: "24px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  snowlineClimateText: ui.Label({
    value: "As our climate changes, so too does snow. Primarily, snow is forced by the quantity of snowfall (accumulation) and the energy input into the snowpack, e.g. air temperature (ablation). The balance point between these is realised in the snowline. This is the hypothetical boundary between snow and non-snow surfaces of a mountainside. Therefore, if the climate changes, the balance point changes, thus changing the altitude at which the snowline is found. As a result the snowline reflects climatic trends and provides a metric to measure the 'health' of snow cover.",
    style: {
     fontSize: "14px",
     fontWeight: "200",
     textAlign: "justify",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "30px 0px 0px 0px",
    }
  }),
  soWhatSubTitle: ui.Label({
    value: "So, What Does this Do?",
    style: {
     fontSize: "24px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  soWhatText: ui.Label({
    value: "This web application can resolve mountain snowlines at 30m resolution for 'anywhere' in the world and explore the climate for the region of interest too.",
    style: {
     fontSize: "14px",
     fontWeight: "200",
     textAlign: "justify",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "30px 0px 0px 0px",
    }
  }),
  lapseRateText: ui.Label({
    value: "Convert Temperature to ASL with Mean Lapse Rate?",
    style: {
     fontSize: "24px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  // Bottom Split
  analysisTitle: ui.Label({
    value: "Analysis",
    style: {
     fontSize: "36px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  analysisBreif: ui.Label({
    value: "Select if you'd like to resolve snowlines or explore climates or both, then follow the instructions for setting the necessary parameters...",
    style: {
     fontSize: "14px",
     fontWeight: "200",
     textAlign: "justify",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "45px 0px 0px 0px",
    }
  }),
  checkText: ui.Label({
    value: "What would you like to do?",
    style: {
     fontSize: "24px",
     fontWeight: "200",
     textAlign: "justify",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  transectSubTitle: ui.Label({
    value: "Draw a transect and set the width...",
    style: {
     fontSize: "24px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  transectText: ui.Label({
    value: "km Wide",
    style: {
     fontSize: "14px",
     fontWeight: "200",
     textAlign: "right",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-right",
     padding: "40px 0px 0px 0px",
    }
  }),
  dateSubTitle: ui.Label({
    value: "Choose a date...",
    style: {
     fontSize: "24px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  advanceDaysSubTitle: ui.Label({
    value: "Choose the operation window...",
    style: {
     fontSize: "24px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  advanceDaysText: ui.Label({
    value: "days",
    style: {
     fontSize: "14px",
     fontWeight: "200",
     textAlign: "right",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-right",
     padding: "35px 0px 0px 0px",
    }
  }),
  satelliteSubTitle: ui.Label({
    value: "Select the satellite...",
    style: {
     fontSize: "24px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  // Results
  // Top Split
  resultsSubtitle: ui.Label({
    value: "Results",
    style: {
     fontSize: "36px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  resultsWhatSubtitle: ui.Label({
    value: "What Did I Just Do?",
    style: {
     fontSize: "24px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  resultsWhatText: ui.Label({
    value: "Depending on what you chose to do, the graphs below will show how either or both the snowline altitude and climate change across the transect. Zero distance along the transect is at the first point you clicked. The map will also show many layers (also dependent on what you chose to do). These show the imagery and data used to find the snowline, the snow-edges resolved by the algorithm, and the climate data. Also shown is a linear regression of the snow-edge altitudes that acts to interpolate the data and provide a 3D view of the snowline altitude in the drawn transect (lat, long, and snowline altitude in colour). Graphs may take a few minutes to load.",
    style: {
     fontSize: "14px",
     fontWeight: "200",
     textAlign: "justify",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "30px 0px 0px 0px",
    }
  }),
  resultsDownloadSubtitle: ui.Label({
    value: "Download",
    style: {
     fontSize: "24px",
     fontWeight: "100",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "0px 0px 0px 0px",
    }
  }),
  resultsDownloadText: ui.Label({
    value: "Download the data you just processed using the links below. To download the graphs as images and the sampled data used in the graphs click the full screen pop out icon at the top right of each graph.",
    style: {
     fontSize: "14px",
     fontWeight: "200",
     textAlign: "justify",
     backgroundColor: "rgba(255, 255, 255, 0)",
     position: "top-left",
     padding: "30px 0px 0px 0px",
    }
  }),
  // Bottom Split
};

/** Sub Panels **/
var subpanel = {
  /** Story **/
  // Top Split
  about: ui.Panel({
    widgets: [widgets.aboutSubTitle, widgets.aboutText],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "180px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  snowlineClimate: ui.Panel({
    widgets: [widgets.snowlineClimateSubTitle, widgets.snowlineClimateText],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "200px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  soWhat: ui.Panel({
    widgets: [widgets.soWhatSubTitle, widgets.soWhatText],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "100px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  // Bottom Split
  analysisTitle: ui.Panel({
    widgets: [widgets.analysisTitle, widgets.analysisBreif],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "100px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  checks: ui.Panel({
    widgets: [widgets.checkText, widgets.checkSnowline, widgets.checkClimate],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "95px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  transect: ui.Panel({
    widgets: [widgets.transectSubTitle, widgets.buttonDraw, widgets.sliderTransectWidth, widgets.transectText],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "100px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  date: ui.Panel({
    widgets: [widgets.dateSubTitle, widgets.dateSlider],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "170px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  advanceDays: ui.Panel({
    widgets: [widgets.advanceDaysSubTitle, widgets.advanceDaysSlider, widgets.advanceDaysText],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "90px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  satelliteSelect: ui.Panel({
    widgets: [widgets.satelliteSubTitle, widgets.satelliteSelectWrapper],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "120px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  lapseRate: ui.Panel({
    widgets: [widgets.lapseRateText, widgets.lapseRateCheck],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "120px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  run: ui.Panel({
    widgets: [widgets.buttonRun, widgets.buttonOpen],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "140px",
      position: "top-center",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
  }),
  /** Results **/
  resultsIntro: ui.Panel({
    widgets: [widgets.resultsSubtitle, widgets.buttonClose],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "120px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
  }),
  resultsWhat: ui.Panel({
    widgets: [widgets.resultsWhatSubtitle, widgets.resultsWhatText],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "225px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
  }),
  resultsDownload: ui.Panel({
    widgets: [widgets.resultsDownloadSubtitle, widgets.resultsDownloadText],
    layout: ui.Panel.Layout.absolute(),
    style: {
      width: "452px",
      height: "115px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
  }),
  resultsLinks: ui.Panel({
    widgets: [],
    layout: ui.Panel.Layout.flow(),
    style: {
      width: "452px",
      height: "80px",
      position: "top-left",
      padding: "0px 0px 0px 0px",
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
  }),
};
var resultsTopSplit = ui.Panel({
  widgets: [subpanel.resultsIntro, subpanel.resultsWhat, subpanel.resultsDownload, subpanel.resultsLinks],
  layout: ui.Panel.Layout.flow({direction: "vertical", wrap: true}),
  style: {
    width: "467px",
    position: "bottom-left",
    height: "600px",
    padding: "0px 0px 0px 0px",
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
});
var resultsBottomSplit = ui.Panel({
  widgets: [],
  layout: ui.Panel.Layout.flow({direction: "vertical", wrap: true}),
  style: {
    width: "468px",
    position: "bottom-left",
    height: "900px",
    padding: "0px 0px 0px 0px",
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
});

/** Panels **/
// Minimap
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

// About, Analysis, and Results
var panelWrapper = ui.Panel({
  widgets: [],
  layout: ui.Panel.Layout.flow({
    direction: "horizontal"
  }),
  style: {
    height: "97%",
    stretch: "horizontal",
    position: "middle-left",
    padding: "0px 0px 0px 0px",
    backgroundColor: "rgba(255, 255, 255, 0)"
  }
});
var panelStory = ui.Panel({
  widgets: [
    /** Title **/
    ui.Panel({
      widgets: [widgets.title, widgets.subtitle],
      layout: ui.Panel.Layout.absolute(),
      style: {
        width: "468px",
        height: "150px",
        position: "top-left",
        padding: "0px 0px 0px 0px",
        backgroundColor: "rgba(255, 255, 255, 0)"
      },
    }),
    /** Split **/
    ui.SplitPanel({
      firstPanel: ui.Panel({
        widgets: [subpanel.about, subpanel.snowlineClimate, subpanel.soWhat],
        layout: ui.Panel.Layout.flow({direction: "vertical", wrap: true}),
        style: {
          width: "468px",
          minHeight: "60px",
          maxHeight: "93%",
          padding: "0px 0px 0px 0px",
          backgroundColor: "rgba(255, 255, 255, 0)"
        },
      }),
      secondPanel: ui.Panel({
        widgets: [subpanel.analysisTitle, subpanel.checks, subpanel.transect, subpanel.date, subpanel.advanceDays, subpanel.satelliteSelect, subpanel.lapseRate, subpanel.run],
        layout: ui.Panel.Layout.flow({direction: "vertical", wrap: true}),
        style: {
          width: "468px",
          position: "bottom-left",
          height: "800px",
          padding: "0px 0px 0px 0px",
          backgroundColor: "rgba(255, 255, 255, 0)"
        },
      }),
      orientation: 'vertical',
      wipe: false,
      style: {
        stretch: "vertical",
        width: "484px",
        padding: "0px 0px 0px 0px",
        position: "middle-left",
        backgroundColor: "rgba(255, 255, 255, 0)"
      },
    }),
    ],
  layout: ui.Panel.Layout.flow(),
  style: {
    stretch: "vertical",
    height: " 100%",
    width: "500px",
    padding: "0px 0px 0px 0px",
    position: "middle-left",
    backgroundColor: "white",//"rgba(255, 255, 255, 0.8)",
    border: "8px solid white"
    },
});
var panelResults = ui.Panel({
  widgets: [
    ui.SplitPanel({
      firstPanel: ui.Panel({
        widgets: [resultsTopSplit],
        layout: ui.Panel.Layout.flow({direction: "vertical", wrap: true}),
        style: {
          width: "468px",
          minHeight: "120px",
          maxHeight: "93%",
          padding: "0px 0px 0px 0px",
          backgroundColor: "rgba(255, 255, 255, 0)"
        },
      }),
      secondPanel: resultsBottomSplit,
      orientation: 'vertical',
      wipe: false,
      style: {
        stretch: "vertical",
        width: "484px",
        padding: "0px 0px 0px 0px",
        position: "middle-left",
        backgroundColor: "rgba(255, 255, 255, 0)"
      },
    }),
    ],
  layout: ui.Panel.Layout.flow(),
  style: {
    stretch: "vertical",
    height: " 100%",
    width: "500px",
    padding: "0px 0px 0px 0px",
    position: "middle-left",
    backgroundColor: "white",//"rgba(255, 255, 255, 0.8)",
    border: "8px solid white"
    },
});

// Legend
var panelLegend = ui.Panel({
  widgets: [],
  layout: ui.Panel.Layout.flow(),
  style: {
    height: "250px",
    width: "250px",
    padding: "0px 0px 0px 0px",
    position: "bottom-right",
    border: "8px solid white",
    },
});

/** Initialise **/
function initialiseSession() {
  
  /** Clear **/
  ui.root.clear();
 
  /** Root **/
  ui.root.add(mapMain);
  mapMain.add(panelMiniMap);
  ui.Map.Linker([mapMain, mapMini], "change-center");
  
  /** GUI **/
  mapMain.add(panelWrapper);
  panelWrapper.add(panelStory);
  panelWrapper.add(panelResults);
  mapMain.add(errMessage);
  //mapMain.add(panelLegend);
  
  /** Run Starter Functions **/
  satelliteFilter();

}
function initialiseStates() {
  
  /** Hide Objects **/
  panelResults.style().set('shown', false);
  subpanel.transect.style().set("shown", false);
  subpanel.date.style().set("shown", false);
  subpanel.advanceDays.style().set("shown", false);
  subpanel.satelliteSelect.style().set("shown", false);
  subpanel.lapseRate.style().set("shown", false);
  subpanel.run.style().set("shown", false);
}

/** Run **/
initialiseSession();
initialiseStates();