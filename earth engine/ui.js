/** UI **/
// Map Panel 
ui.root.clear();
var base_map = ui.Map({
  center: { // Center map on are, sweden
    lat: 63.3971469,
    lon: 13.0705005}
})
  .setOptions({
  styles: {
    'Map':
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
  types: ['Map', 'Satellite']
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

/** Geometry Drawer **/
// Get Drawing tools and hide
var drawingTools = base_map.drawingTools();
drawingTools.setShown(false);
// While loop to remove old geometries
while (drawingTools.layers().length() > 0) {
    var layer = drawingTools.layers().get(0);
    drawingTools.layers().remove(layer);
  }
// Initialise Geometry
var dummyGeometry = ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
// Clear Geometry
function clearGeometry() {
    var layers = drawingTools.layers();
    layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  }
// Draw Rectangle Function
var draw_mode_off = 0;
function drawLine() {
    drawingTools.setShape('line');
    drawingTools.draw();
  }
function stop_drawing() {drawingTools.stop();
}

/** Widgets **/
// Title
var label_start_title = ui.Label({
    value: 'Snowlines Application',
    style: {
      whiteSpace: 'pre',
      fontSize: '22px',
      fontWeight: 'bold',
      textAlign: 'centre',
    }
  });
  
// Drawing
var label_drawing_title = ui.Label({
    value: '1) Draw Transect Length',
    style: {
      whiteSpace: 'pre',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'centre',
    }
  });
var label_drawing_text = ui.Label({
    value: "Use the following butons to set the transect length." +
           "\nClick 'Start Drawing' to enter the drawing mode..." +
           "\nClick on the map to add line vertices..." +
           "\nClick on the 'Stop Drawing' button to finish the line and exit the drawing mode (Do not create a loop)..." +
           "\nClick the 'Clear Drawing' button to remove the last drawn line." +
           "\nTo give an idea of scale, a recommended length is around 200km/the width mountain range.",
    style: {
      whiteSpace: 'pre',
      fontSize: '12px',
      fontWeight: '100',
      textAlign: 'centre'
    }
  });
var button_drawing_start = ui.Button({
  label: 'Start Drawing',
  onClick: drawLine,
  style: {
    width: '150px'
  }
});
var button_drawing_clear = ui.Button({
  label: 'Clear Drawing',
  onClick: clearGeometry,
  style: {
    width: '150px',
  }
});
var button_drawing_stop = ui.Button({
  label: 'Stop Drawing',
  onClick: stop_drawing,
  style: {
    width: '150px'
  }
});

// Transect Width
var label_transect_width_title = ui.Label({
    value: '2) Set Transect Width',
    style: {
      whiteSpace: 'pre',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'centre',
    }
  });
var label_transect_width_text = ui.Label({
    value: 'Enter the transect width in metres below. Longer transects tend to need smaller widths.',
    style: {
    fontSize: '12px',
    fontWeight: '100',
    textAlign: 'centre'
  }
  });
var textbox_transect_width = ui.Textbox({
  placeholder: 'e.g. 20000',
  value: null,
  disabled: false,
  style: {
    width: '150px'
  }
  });

// Date Range
var label_date_range_title = ui.Label({
    value: '3) Set Date',
    style: {
      whiteSpace: 'pre',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'centre',
    }
  });
var label_date_range_text = ui.Label({
    value: 'Enter the date range below in the format YYYY-MM-DD, e.g. 2013-07-01 and 2013-08-01',
    style: {
    fontSize: '12px',
    fontWeight: '100',
    textAlign: 'centre'
  }
  });
var textbox_date_range_start = ui.Textbox({
  placeholder: 'Start Date',
  value: null,
  disabled: false,
  style: {
    width: '150px'
  }
  });
var textbox_date_range_end = ui.Textbox({
  placeholder: 'End Date',
  value: null,
  disabled: false,
  style: {
    width: '150px'
  }
  });
  
// Pick Satellite
var label_pick_satellite_title = ui.Label({
    value: '4) Pick Corrosponding Satellite',
    style: {
      whiteSpace: 'pre',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'centre',
    }
  });
var label_pick_satellite_text = ui.Label({
    value: 'Pick a satellite that matches the dates you entered. For every date there should be 2 satellites in operation.' +
           '\nFor example, the dates: 2013-07-01 to 2013-08-01, would give you a choice between Landsat 7 and Landsat 8.',
    style: {
      whiteSpace: 'pre',
      fontSize: '12px',
      fontWeight: '100',
      textAlign: 'centre'
    }
  });
var label_pick_satellite_text2 = ui.Label({
  value:  'Satellite Date Ranges:' +
          '\nLandsat 4: 1982-08-22, 1993-12-14' +
          '\nLandsat 5: 1984-01-01, 2012-05-05' +
          '\nLandsat 7: 1999-01-01, 2021-07-31' +
          '\nLandsat 8: 2013-04-11, 2021-08-14',
  style: {
    whiteSpace: 'pre',
    fontSize: '12px',
    fontWeight: '100',
    textAlign: 'centre'
}
});
var landsat_4 = 'Landsat_4';
var landsat_5 = 'Landsat_5';
var landsat_7 = 'Landsat_7';
var landsat_8 = 'Landsat_8';
var textbox_pick_satellite = ui.Select({
  items: [landsat_4, landsat_5, landsat_7, landsat_8],
  placeholder: 'Select a satellite...',
  value: null,
  disabled: false,
  style: {
    width: '150px'
  }
  });

// Run
var label_run_text = ui.Label({
    value: "All set? Let's run the algorithm!",
    style: {
    fontSize: '12px',
    fontWeight: '100',
    textAlign: 'centre'
  }
  });
var button_run = ui.Button({
  label: 'Run',
  onClick: function() {
    
    // Hide Itself cos we dont wany anymore runs otherwise it gets messy
    button_run.style().set('shown', false);
    label_run_text.style().set('shown', false);
    
    // Get user inputs
    var transect = drawingTools.layers().get(0).toGeometry();
    var transect_width = textbox_transect_width.getValue();
    var date_start = ee.Date(ee.String(textbox_date_range_start.getValue()));
    var date_end = ee.Date(ee.String(textbox_date_range_end.getValue()));
    var date_range = ee.DateRange(date_start, date_end);
    var satellite_name = textbox_pick_satellite.getValue();
    
    // Create Transect
    var sample_area_output = generate_sample_area(transect, transect_width);
    var sample_area = ee.Geometry(ee.Dictionary(sample_area_output).get('sample_area'));
    var lt_coord = ee.Dictionary(sample_area_output).get('lt_coord');
    var lb_coord = ee.Dictionary(sample_area_output).get('lb_coord');
    
    // Get Imagery
    var collection = import_imagery(sample_area, satellite_name, date_range);
    
    // Run algorithm
    var algorithm_output = algorithm(collection, sample_area, date_range);
    var snowline_geometry = ee.FeatureCollection(ee.Dictionary(algorithm_output).get('snowline_geometry'));
    var snowline_pixels = ee.Image(ee.Dictionary(algorithm_output).get('snowline_pixels'));
    
    // Construct Evnironmental Image
    var environmental_image_constructor_output = environmental_image_constructor(snowline_geometry, lt_coord, lb_coord, snowline_pixels, sample_area, date_range);
    var environmental_image = ee.Image(ee.Dictionary(environmental_image_constructor_output).get('environmental_image'));
    var results = ee.FeatureCollection(ee.Dictionary(environmental_image_constructor_output).get('results'));
    
    // Graphing
    grapher(environmental_image, snowline_geometry);
    
    // Export
    panel_story.add(ui.Button({
      label: 'Export Data',
      onClick: function exporter() {
        
        // Pull info to client side
        var collection_name = ee.String(satellite_name).replace('_', '').getInfo();
        var start_date = date_start.format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
        var end_date = date_end.format('YYYY, MM, dd').replace(', ', '').replace(', ', '').getInfo();
        var pixel_count = snowline_geometry.size().getInfo();
        
        // Export
        /*Export.table.toDrive({
          collection: results,
          description: 'NSL_' + collection_name + '_DAT' + start_date + end_date + '_PIX' + pixel_count,
          folder: 'NSL_Main/'+ collection_name,
          fileNamePrefix: 'NSL_' + collection_name + '_DAT' + start_date + end_date + '_PIX' + pixel_count,
          fileFormat: 'CSV'
        });*/
        var url = results.getDownloadURL({
          format: 'CSV',
          filename: 'NSL_' + collection_name + '_DAT' + start_date + end_date + '_PIX' + pixel_count
        });
        var label_url = ui.Label({
          value: 'Click this link to download the data',
          style: {
            whiteSpace: 'pre',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'centre',
          }
        });
        panel_story.add(label_url.setUrl(url));
      },
    style: {
      width: '150px',
      color: 'blue'
    }
    }));
  },
  style: {
    width: '150px',
    color: 'blue'
  }
});

// Reset
var button_reset = ui.Button({
  label: 'Reset',
  onClick: function() {
    
    // Reset Map
    base_map.clear();
    base_map.setCenter(13.0705005, 63.3971469, 4);
    base_map.setOptions({
  styles: {
    'Map':
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
  types: ['Map', 'Satellite']
})
    base_map.setControlVisibility({
  all: true,
  layerList: true,
  zoomControl: false,
  scaleControl: false,
  mapTypeControl: true,
  fullscreenControl: true,
  drawingToolsControl: false
});
    
    // Clear Geometry
    drawingTools.clear();
    
    // Clear variables
    textbox_transect_width = textbox_transect_width.setValue(null);
    textbox_date_range_start = textbox_date_range_start.setValue(null);
    textbox_date_range_end = textbox_date_range_end.setValue(null);
    textbox_pick_satellite = textbox_pick_satellite.setValue(null);
    
    // Clear Results
    panel_story.clear();
    panel_story.add(label_start_title);
    panel_story.add(label_drawing_title);
    panel_story.add(label_drawing_text);
    panel_story.add(button_drawing_start);
    panel_story.add(button_drawing_clear);
    panel_story.add(button_drawing_stop);
    panel_story.add(label_transect_width_title);
    panel_story.add(label_transect_width_text);
    panel_story.add(textbox_transect_width);
    panel_story.add(label_date_range_title);
    panel_story.add(label_date_range_text);
    panel_story.add(textbox_date_range_start);
    panel_story.add(textbox_date_range_end);
    panel_story.add(label_pick_satellite_title);
    panel_story.add(label_pick_satellite_text);
    panel_story.add(label_pick_satellite_text2);
    panel_story.add(textbox_pick_satellite);
    panel_story.add(label_run_text);
    panel_story.add(button_run);
    panel_story.add(button_reset);
    
    // Unhide Run Button
    button_run.style().set('shown', true);
    label_run_text.style().set('shown', true);
  },
  style: {
    width: '150px',
    color: 'red'
  }
});

/** Panels **/
var panel_story = ui.Panel({
  widgets: [
    label_start_title,
    label_drawing_title,
    label_drawing_text,
    button_drawing_start,
    button_drawing_clear,
    button_drawing_stop,
    label_transect_width_title,
    label_transect_width_text,
    textbox_transect_width,
    label_date_range_title,
    label_date_range_text,
    textbox_date_range_start,
    textbox_date_range_end,
    label_pick_satellite_title,
    label_pick_satellite_text,
    label_pick_satellite_text2,
    textbox_pick_satellite,
    label_run_text,
    button_run,
    button_reset
    ],
  style: {width: '600px'},
  layout: ui.Panel.Layout.flow({
    direction: 'vertical',
    wrap: true
  }),
});

/** Initialise UI **/
ui.root.add(base_map);
ui.root.add(panel_story);

/** Generate Geodesic Multi-Direction Rectangle **/
function generate_sample_area(transect, transect_width) {
  var buffered_transect_line = transect.buffer(transect_width/2);
  var buffered_transect_line_coords = ee.List(buffered_transect_line.coordinates().get(0));
  var lt_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(0)));  // left top
  var lb_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(11))); // left bottom
  var rb_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(13))); // right bottom
  var rt_coord = ee.Geometry.Point(ee.List(buffered_transect_line_coords.get(24))); // right top
  return {
    sample_area: ee.Geometry.Polygon({
    coords: [lt_coord, lb_coord, rb_coord, rt_coord],
    geodesic: true,
    }),
    lt_coord: lt_coord,
    lb_coord: lb_coord
  };
}

/** Import Imagery **/
function import_imagery(sample_area, satellite_name, date_range) {
  base_map.centerObject(sample_area);
  var collections = ee.Dictionary([
    'Landsat_4', ee.ImageCollection('LANDSAT/LT04/C02/T1_L2')
      .filterBounds(sample_area)
      .filterDate(date_range)
      .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat_5', ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
      .filterBounds(sample_area)
      .filterDate(date_range)
      .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat_7', ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
      .filterBounds(sample_area)
      .filterDate(date_range)
      .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6', 'QA_PIXEL'], 
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL']),
    'Landsat_8', ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
      .filterBounds(sample_area)
      .filterDate(date_range)
      .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10', 'QA_PIXEL'],
              ['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR', 'QA_PIXEL'])
  ]);
  var collection = ee.ImageCollection(collections.get(satellite_name));
  return collection;
}

/** Algorithm **/
function algorithm(collection, sample_area, date_range) {
  // Extract Cloud and Cloud Shadows Mask
  var collection = collection.map(function(image) {
    var clouds = image.select('QA_PIXEL').bitwiseAnd(1 << 3).eq(0);
    var cloud_shadows = image.select('QA_PIXEL').bitwiseAnd(1 << 4).eq(0);
    var combined = ee.Image.constant(1).updateMask(clouds.and(cloud_shadows)).rename('clouds_and_cloud_shadows_mask');
    return image.addBands(combined.unmask());
  });
  
  // Add Unix Time to Each Pixel
  var collection = collection.map(function(image) {
    return image.addBands(
      ee.Image.constant(ee.Date(image
        .get('DATE_ACQUIRED'))
        .millis()
      )
      .int64()
      .rename('aqcuisition_time')
    );
  });
  
  // Mosaic Imagery
  var quality_mosaic = collection.qualityMosaic('clouds_and_cloud_shadows_mask');
  base_map.addLayer(quality_mosaic, {bands: ['Red', 'Green', 'Blue'], gamma: 1.5}, 'Quality Mosaic', 1);
  base_map.addLayer(sample_area, {}, 'Transect');
  
  // Create Cloudless Mosaic for Endmember Extraction
  // (Cloud mask includes snow edges so cannot be used for the unmixing)
  var cloudless_mosaic = quality_mosaic.updateMask(quality_mosaic.select('clouds_and_cloud_shadows_mask'));
  
  // Calculate Indicies:
  // Snow Index (SWI)
  var snow_index = cloudless_mosaic.expression('((Green * (NIR - SWIR)) / ((Green + NIR) * (NIR + SWIR)))',
    {'Green': cloudless_mosaic.select('Green'),
     'NIR':   cloudless_mosaic.select('NIR'),
     'SWIR':  cloudless_mosaic.select('SWIR_1')});
  
  // Vegetation Index (GVI)
  var vegetation_index = cloudless_mosaic.expression(' (-0.2848 * Blue) + (-0.2435 * Green) + (-0.5436 * Red) + (0.7243 * NIR) + (0.0840 * SWIR1) + (-0.1800 * SWIR2)',
    {'Blue': cloudless_mosaic.select('Blue'),
     'Green': cloudless_mosaic.select('Green'),
     'Red': cloudless_mosaic.select('Red'),
     'NIR': cloudless_mosaic.select('NIR'),
     'SWIR1': cloudless_mosaic.select('SWIR_1'),
     'SWIR2': cloudless_mosaic.select('SWIR_2')});
  
  // Water Index (MNDWIinv)
  var water_index = cloudless_mosaic.expression('1 / ((Green - SWIR) + (NIR - SWIR) / (Green + SWIR) + (NIR + SWIR))',
    {'Green': cloudless_mosaic.select('Green'),
     'NIR': cloudless_mosaic.select('NIR'),
     'SWIR': cloudless_mosaic.select('SWIR_1')});
  
  // Rock Index (NDBI)
  var rock_index = cloudless_mosaic.expression('(SWIR - NIR) / (SWIR + NIR)',
    {'NIR': cloudless_mosaic.select('NIR'),
     'SWIR': cloudless_mosaic.select('SWIR_1')});
  
  // Find Endmembers
  var indicies = ee.List([snow_index, vegetation_index, water_index, rock_index]);
  var endmembers = indicies.map(function(index) {
    var percentile = ee.Number(
      ee.Image(index).reduceRegion({
        reducer: ee.Reducer.percentile({percentiles: [95]}),
        geometry: sample_area,
        scale: 30,
        maxPixels: 1000000, // set to  value which is large enough to create accurate endmembers but not too large to make computation time too long.
        bestEffort: true
      })
    .values()
    .get(0)
    );
    var thresholded_index = ee.Image(index).gt(percentile);
    var masked_image = cloudless_mosaic.updateMask(thresholded_index);
    return masked_image.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: sample_area,
        scale: 30,
        bestEffort: true
      })
    .values();
  });
  
  // Linear Spectral Unmixing
  var unmixed_mosaic = quality_mosaic.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR_1', 'SWIR_2', 'TIR'])
    .unmix({
      endmembers: endmembers,
      sumToOne: true,
      nonNegative: true})
    .rename('snow_component', 'vegetation_component', 'water_component', 'rock_component');
  base_map.addLayer(unmixed_mosaic, {}, 'Unmixed Mosaic', 0);
  
  // Find 50% and above snow pixels
  var snowcap = unmixed_mosaic
    .select(['snow_component'], ['mask'])
    .gt(0.5)
    .selfMask();
  base_map.addLayer(snowcap, {}, 'Snowcap', 0);
  
  // Fill Holes in Snowcap
  var inverted_snowcap = snowcap.unmask().eq(0).selfMask(); // invert snowcap and selfmask to avoid inverted components in next step. Remove this if you want to get rid of little patches of snowline
  var connected_components = inverted_snowcap
    .connectedComponents({
      connectedness: ee.Kernel.square({
        radius: 1, // distance away from other 'on' pixels. set to 1 (the minimum) as otherwise, gaps near the edge are not detected
        units: 'pixels'
      }),
    maxSize: 150 // maximum number of pixels in each patch. 150 seems good.
    })
    .select(['labels'], ['mask'])
    .eq(0)
    .add(1)
    .eq(1);
  var filled_snowcap = ee.ImageCollection([snowcap, connected_components]).mosaic();
  base_map.addLayer(filled_snowcap, {}, 'Filled Snowcap', 0);
  
  // Find Filled Snowcap Edge
  var snowcap_edge = filled_snowcap.reduceNeighborhood({
    reducer: ee.Reducer.count(),
    kernel: ee.Kernel.plus({
      radius: 1,
      units: 'pixels'
      })
    })
    /*.reproject({
      crs: 'EPSG:4326',
      scale: 30
      })*/ // ensures pixels are left not lines. Not neccessary, just uses more memory
    .updateMask(filled_snowcap)
    .lt(5)
    .rename('snow_edge')
    .selfMask();
  base_map.addLayer(snowcap_edge, {}, 'Snowcap Edge', 0);
  
  // Create Glacier and Water Masks
  var glacier_mask = ee.FeatureCollection("GLIMS/current")
    .filterBounds(sample_area)
    .select('area')
    .map(function(feature) {
      return feature.buffer({
        distance: 180,
        maxError: 1000
      });
    })
    .reduceToImage({
      properties: ['area'],
      reducer: ee.Reducer.mean().unweighted()})
    .rename('glacier_mask')
    .unmask(1);
  var water_mask = ee.Image("JRC/GSW1_3/GlobalSurfaceWater")
    .select(['max_extent'], ['Water_Mask'])
    .eq(1)
    .focal_max({
      radius: 100,
      kernelType: 'square',
      units: 'meters', 
      iterations: 1
    })
    .eq(0)
    .unmask(0);
  var SWI_mask = snow_index.gt(0.21);
  base_map.addLayer(glacier_mask, {}, 'Glacier Mask', 0);
  base_map.addLayer(water_mask, {}, 'Water Mask', 0);
  
  // Mask the Snowline
  var snowline_pixels = quality_mosaic.select('aqcuisition_time')
    .updateMask( // mosaic is masked to keep the pixel times.
      snowcap_edge
      .and(glacier_mask)
      .and(water_mask)
      .and(SWI_mask) // cloud removal. Can't use the cloud mask as it removes the snow edge! unfortunately this also takes out many of my snowline pixels. A better cloud removal technique would be very beneficial.
    );
  base_map.addLayer(snowline_pixels, {palette: 'Red'}, 'Snowline Pixels', 1);
  
  // Convert each pixel into a point
  var snowline_geometry = snowline_pixels.sampleRegions({ // turns each pixel into a point feature
    collection: sample_area,
    properties: null,
    scale: 30,
    projection: null,
    tileScale: 1,
    geometries: true
  });
  return {
    snowline_pixels: snowline_pixels,
    snowline_geometry: snowline_geometry
  };
}

/** Construct Environmental Data Image **/
function environmental_image_constructor(snowline_geometry, lt_coord, lb_coord, snowline_pixels, sample_area, date_range) {
  // Metrics
  // Add Distances along transect
  var start_line = ee.Geometry.LineString([lt_coord, lb_coord]);
  var transect_distances = snowline_geometry.map(function(point) {
    var distance = point.geometry().distance(start_line);
    return point.set('distance', distance);
  });
  var transect_distances = transect_distances.reduceToImage(['distance'], ee.Reducer.mean())
    .rename('Distance_from_Start_of_Transect_/_m')
    .divide(1000);
  
  // Retrieve Pixel Time
  var acquisition_time = snowline_pixels.select(['aqcuisition_time'], ['Unix_Time_of_Pixel_Acquisition_/_unix_milliseconds']);
  
  // Coordinates
  var coordinates = ee.Image.pixelLonLat()
    .rename(['Longitude_/_degrees', 'Latitude_/_degrees']);
  
  // Terrain
  // Elevation
  var elevation = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2")
    .filterBounds(sample_area)
    .select(['DSM'], ['Elevation_/_m'])
    .mosaic()
    .reproject({crs: 'EPSG:4326', scale: 30}); // reproject so the mosaic is uniform for the terrain calculations. Necessary, see: https://developers.google.com/earth-engine/guides/projections#reprojecting
  
  // Aspect
  var aspect = ee.Terrain.aspect(elevation)
    .rename('Aspect_/_degrees')
    .double();
  
  // Slope Angle
  var slope = ee.Terrain.slope(elevation)
    .rename('Slope_/_degrees')
    .double();
    
  // Snowfall
  // Cumulative Snowfall in Date Range
  var cumulative_snowfall_by_date_range = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filter(ee.Filter.date(date_range))
    .sum()
    .select(['snowfall'], ['Cumulative_Snowfall_By_Date_Range_/_m_of_water_equivalent']);
  // Cumulative Snowfall in Year
  var cumulative_snowfall_by_year = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 01, 01), ee.Date.fromYMD(date_range.end().get('year'), 12, 31)))
    .sum()
    .select(['snowfall'],['Cumulative_Snowfall_By_Year_/_m_of_water_equivalent']);
  // Cumulative Snowfall in Summer
  var cumulative_snowfall_by_summer = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 06, 01), ee.Date.fromYMD(date_range.end().get('year'), 8, 31))) // Meteorological Seasons
    .sum()
    .select(['snowfall'],['Cumulative_Snowfall_By_Summer_/_m_of_water_equivalent']);
  // Cumulative Snowfall in Winter
  var cumulative_snowfall_by_winter = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 12, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 02, 28))) // Meteorological Seasons
    .sum()
    .select(['snowfall'],['Cumulative_Snowfall_By_Winter_/_m_of_water_equivalent']);
  // Cumulative Snowfall in Autumn
  var cumulative_snowfall_by_autumn = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 9, 01), ee.Date.fromYMD(date_range.end().get('year'), 11, 30))) // Meteorological Seasons
    .sum()
    .select(['snowfall'],['Cumulative_Snowfall_By_Autumn_/_m_of_water_equivalent']);
  // Cumulative Snowfall in Spring
  var cumulative_snowfall_by_spring = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 03, 01), ee.Date.fromYMD(date_range.end().get('year'), 05, 31))) // Meteorological Seasons
    .sum()
    .select(['snowfall'],['Cumulative_Snowfall_By_Spring_/_m_of_water_equivalent']);
  
  // Snowmelt
  // Cumulative Snowmelt in Date Range
  var cumulative_snowmelt_by_date_range = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filter(ee.Filter.date(date_range))
    .sum()
    .select(['snowmelt'], ['Cumulative_Snowmelt_By_Date_Range_/_m_of_water_equivalent']);
  // Cumulative Snowmelt in Year
  var cumulative_snowmelt_by_year = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 01, 01), ee.Date.fromYMD(date_range.end().get('year'), 12, 31)))
    .sum()
    .select(['snowmelt'],['Cumulative_Snowmelt_By_Year_/_m_of_water_equivalent']);
  // Cumulative Snowmelt in Summer
  var cumulative_snowmelt_by_summer = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 06, 01), ee.Date.fromYMD(date_range.end().get('year'), 8, 31))) // Meteorological Seasons
    .sum()
    .select(['snowmelt'],['Cumulative_Snowmelt_By_Summer_/_m_of_water_equivalent']);
  // Cumulative Snowmelt in Winter
  var cumulative_snowmelt_by_winter = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 12, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 02, 28))) // Meteorological Seasons
    .sum()
    .select(['snowmelt'],['Cumulative_Snowmelt_By_Winter_/_m_of_water_equivalent']);
  // Cumulative Snowmelt in Autumn
  var cumulative_snowmelt_by_autumn = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 9, 01), ee.Date.fromYMD(date_range.end().get('year'), 11, 30))) // Meteorological Seasons
    .sum()
    .select(['snowmelt'],['Cumulative_Snowmelt_By_Autumn_/_m_of_water_equivalent']);
  // Cumulative Snow in Spring
  var cumulative_snowmelt_by_spring = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_BY_HOUR")
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 03, 01), ee.Date.fromYMD(date_range.end().get('year'), 05, 31))) // Meteorological Seasons
    .sum()
    .select(['snowmelt'],['Cumulative_Snowmelt_By_Spring_/_m_of_water_equivalent']);
    
  // Temperature
  // Average Temperature in Date Range
  var mean_temperature_by_date_range = ee.ImageCollection('ECMWF/ERA5/DAILY')
    .filterBounds(sample_area)
    .filterDate(date_range)
    .mean()
    .subtract(273.15)
    .select(['mean_2m_air_temperature'], ['Mean_2m_Temperature_By_Date_Range_/_K']);
  // Average Temperature in Year
  var mean_temperature_by_year = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 01, 01), ee.Date.fromYMD(date_range.end().get('year'), 12, 31)))
    .mean()
    .subtract(273.15)
    .select(['mean_2m_air_temperature'], ['Mean_2m_Temperature_By_Year_/_K']);
  // Average Temperature in Summer
  var mean_temperature_by_summer = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 06, 01), ee.Date.fromYMD(date_range.end().get('year'), 8, 31))) // Meteorological Seasons
    .mean()
    .subtract(273.15)
    .select(['mean_2m_air_temperature'], ['Mean_2m_Temperature_By_Summer_/_K']);
  // Average Temperature in Winter
  var mean_temperature_by_winter = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 12, 01), ee.Date.fromYMD(date_range.end().get('year').add(1), 02, 28))) // Meteorological Seasons
    .mean()
    .subtract(273.15)
    .select(['mean_2m_air_temperature'], ['Mean_2m_Temperature_By_Winter_/_K']);
  // Average Temperature in Spring
  var mean_temperature_by_spring = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 03, 01), ee.Date.fromYMD(date_range.end().get('year'), 05, 28))) // Meteorological Seasons
    .mean()
    .subtract(273.15)
    .select(['mean_2m_air_temperature'], ['Mean_2m_Temperature_By_Spring_/_K']);
  // Average Temperature in autumn
  var mean_temperature_by_autumn = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
    .filterBounds(sample_area)
    .filterDate(ee.DateRange(ee.Date.fromYMD(date_range.start().get('year'), 9, 01), ee.Date.fromYMD(date_range.end().get('year'), 11, 30))) // Meteorological Seasons
    .mean()
    .subtract(273.15)
    .select(['mean_2m_air_temperature'], ['Mean_2m_Temperature_By_Autumn_/_K']);
    
  // Heat Flux
  
  // Wind
  
  // Errors
  /*// Distance Error
  var error_distance = ee.Image.constant(0.015).rename('error_distance_/_km');
  // Elevation Error
  var error_distance = ee.Image.constant(2.5).rename('error_elevation_/_m');
  // Snowfall Errors
  var error_snowfall_date_range = cumulative_snowfall_by_date_range.reduce(ee.Reducer.stdDev()).rename('error_snowfall_date_range_/_m_of_water_equivalent');
  var error_snowfall_winter = cumulative_snowfall_by_winter.reduce(ee.Reducer.stdDev()).rename('error_snowfall_winter_/_m_of_water_equivalent');
  base_map.addLayer(cumulative_snowfall_by_winter.reduce(ee.Reducer.stdDev()));*/
  
  // Put them together...
  var environmental_image = ee.Image()
    .addBands([
      transect_distances,
      acquisition_time,
      coordinates,
      elevation,
      aspect,
      slope,
      cumulative_snowfall_by_date_range,
      cumulative_snowfall_by_year,
      cumulative_snowfall_by_summer,
      cumulative_snowfall_by_autumn,
      cumulative_snowfall_by_spring,
      cumulative_snowfall_by_winter,
      cumulative_snowmelt_by_date_range,
      cumulative_snowmelt_by_year,
      cumulative_snowmelt_by_summer,
      cumulative_snowmelt_by_autumn,
      cumulative_snowmelt_by_spring,
      cumulative_snowmelt_by_winter,
      mean_temperature_by_date_range,
      mean_temperature_by_year,
      mean_temperature_by_summer,
      mean_temperature_by_winter,
      mean_temperature_by_spring,
      mean_temperature_by_autumn
    ]);
    
  // Create Table of Results by Reducing the Environmental Image by the Snowline Feature Collection
  var results = environmental_image.reduceRegions({
    collection: snowline_geometry,
    reducer: ee.Reducer.mean(),
    scale: 30
    })
    .select(environmental_image.bandNames().remove('constant'), environmental_image.bandNames().remove('constant'), false); // false removes geometry
  
  return {
    results: results,
    environmental_image: environmental_image
  };
}

/** Graphing **/
function grapher(environmental_image, snowline_geometry) {
    
  // Sample the environmental image with the snowline geometry
  var pixel_values = environmental_image.reduceRegion({
    reducer: ee.Reducer.toList(),
    geometry: snowline_geometry.geometry(),
    scale: 2000,
  });
  
  // Create Plotting Function
  function scatterplotter(pixel_values, y_vars, x_var, series_names, colours, title_main, title_y, title_x) {
      var y_values = pixel_values.toArray(y_vars);
      var x_values = ee.List(pixel_values.get(x_var));
      var scatterchart = ui.Chart.array.values({
        array: y_values, axis: 1, xLabels: x_values
      })
        .setSeriesNames(series_names)
        .setOptions({
          title: title_main,
          colors: colours,
          pointSize: 4,
          dataOpacity: 0.2,
          hAxis: {
            'title': title_x,
            titleTextStyle: {italic: false, bold: true}
          },
          vAxis: {
            'title': title_y,
            titleTextStyle: {italic: false, bold: true}
          },
        explorer: {
          axis: 'horizontal',
          maxZoomOut: 2,
          maxZoomIn: 0.1}
        });
      panel_story.add(scatterchart);
  }
  
  // add title
  panel_story.add(ui.Label({
    value: 'Results',
    style: {
      whiteSpace: 'pre',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'centre',
    }
  }));
  
  // Display Pixel Count
  var pixel_count = ui.Label({
    value: null,
    style: {
          fontSize: '12px',
          fontWeight: '100',
          textAlign: 'centre',
          shown: false
        }
  });
  panel_story.add(pixel_count);
  var pixel_button = ui.Button({
    label: 'Calculate Number of Pixels/Metres of Snowline Detected',
    onClick: function() {
      pixel_count.setValue('Number of snowline pixels/points found: ' + snowline_geometry.size().getInfo());
      pixel_count.style().set('shown', true);
      pixel_button.style().set('shown', false);
      },
      style: {
        width: '150px'
      }
  });
  panel_story.add(pixel_button);
  
  // Call plots on button press
  panel_story.add(ui.Button({
    label: 'Generate Graphs',
    onClick: function() {
      scatterplotter(
      pixel_values,
      ['Elevation_/_m'],
      'Distance_from_Start_of_Transect_/_m',
      ['Elevation'],
      ['Red'],
      'Snowline Elevation by Tansect Distance',
      'Elevation / m asl',
      'Distance / km'
      );
    },
  style: {
    width: '150px'
  }
  }));
}