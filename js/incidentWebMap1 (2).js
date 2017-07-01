(function() {
	var formatWFS = new ol.format.WFS ({
		
	});
	
	var formatGML = new ol.format.GML({
    featureNS: 'http://gmt.frikancarto.co.za',
    featureType: 'incidents',
    srsName: 'EPSG:3857'
	});
	
	var xs = new XMLSerializer();

		
	var sourceWFS = new ol.source.Vector({
	  loader: function(extent) {
		$.ajax('http://frikancarto.co.za:8080/geoserver/Viva/ows?', {
		  type: 'GET',
		  data: {
			service: 'WFS',
			version: '1.1.0',
			request: 'GetFeature',
			typename:'Viva:incidents',
			srsName:'EPSG:3857',
			bbox: extent.join(',') + ',EPSG:3857'
			
		  }
		}).done(function(response) {
		  sourceWFS.addFeatures(formatWFS.readFeatures(response));
		  
		});
	  },
	  
	  //strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ()),
	  strategy: ol.loadingstrategy.bbox,
	  projection: 'EPSG:4326'
	});
	
		
    
		  
	/**
     * Define a namespace for the applications.
     */
    window.app = {};
    var app = window.app;

    // Define zoom extent control.
     /**
     * @constructor
     * @extends {ol.control.Control}
     * @param {Object=} opt_options Control options.
     */
    app.ZoomExtentControl = function (opt_options) {

        var options = opt_options || {};
        this.extent_ = options.extent;

        var anchor = document.createElement('a');
        anchor.href = '#zoom-to';
        anchor.className = 'zoom-to';

        var this_ = this;
        var handleZoomTo = function (e) {
            this_.handleZoomTo(e);
        };

        anchor.addEventListener('click', handleZoomTo, false);
        anchor.addEventListener('touchstart', handleZoomTo, false);

        var element = document.createElement('div');
        element.className = 'zoom-extent ol-unselectable';
        element.appendChild(anchor);

        ol.control.Control.call(this, {
            element: element,
            map: options.map,
            target: options.target
        });

    };
    ol.inherits(app.ZoomExtentControl, ol.control.Control);
	
	

    /**
     * @param {Event} e Browser event.
     */
    app.ZoomExtentControl.prototype.handleZoomTo = function (e) {
        // prevent #zoomTo anchor from getting appended to the url
        e.preventDefault();

        var map = this.getMap();
        var view = map.getView();
        view.fit(this.extent_, map.getSize());
    };


    /**
     * Overload setMap to use the view projection's validity extent
     * if no extent was passed to the constructor.
     * @param {ol.Map} map Map.
     */
    app.ZoomExtentControl.prototype.setMap = function (map) {
        ol.control.Control.prototype.setMap.call(this, map);
        if (map && !this.extent_) {
            this.extent_ = map.getView().getProjection().getExtent();
        }
    };
		// Draw add incident control on map
		var DrawControl = function(opt_options) {
            var options = opt_options || {};
            this.active = options.active || false;
            var draw = new ol.interaction.Draw({
                source: sourceWFS.source,
                type: 'Point',
				
			});
			draw.on('drawstart', function(e) {
						});
			
			//Sets incident properties when addBuilding-button is clicked and changes status of edit to false
		    draw.on('drawend', function(e) {
			var f = e.feature;
			f.set('reporter_name', document.getElementById('inpSubmitterName').value, true);
			f.set('vic_firstname', document.getElementById('inpName').value, true);
			f.set('vic_surname', document.getElementById('inpSurname').value, true);
			f.set('vic_id', document.getElementById('inpIdNum').value, true);
			f.set('vic_sex', document.getElementById('inpSex').value, true);
			f.set('vic_cell', document.getElementById('inpPhoneNumber').value, true);
			f.set('vic_email', document.getElementById('inpEmailAdress').value, true);
			f.set('vic_postcode', document.getElementById('inpPostCode').value, true);
			f.set('vic_postbox', document.getElementById('inpPostBox').value, true);
			f.set('vic_postarea', document.getElementById('inpPostarea').value, true);
			f.set('inc_date', document.getElementById('inpIncidentDate').value, true);
			f.set('abuse_repeat', document.querySelector('h3.radio-toolbar input[name=rRepeated]:checked').value, true);
			//f.set('abuse_repeat', document.getElementById('inpRepeated').value, true);
			f.set('inc_summary', document.getElementById('textaIncident').value, true);
			//radiogroups			
			f.set('know_perp', document.querySelector('h3.radio-toolbar input[name=rknowsPerp]:checked').value, true);
			f.set('contact_perp', document.querySelector('h3.radio-toolbar input[name=rContactPerp]:checked').value, true);
			//f.set('police_contact', document.querySelector('h3.radio-toolbar input[name=textaIncidentReported]:checked').value, true);
			f.set('ong_investigation', document.querySelector('h3.radio-toolbar input[name=rOngInvest]:checked').value, true);
			f.set('request_contact', document.querySelector('h3.radio-toolbar input[name=rRequestContact]:checked').value, true);
			f.set('request_service', document.querySelector('h3.radio-toolbar input[name=rRequestService]:checked').value, true);
			//f.set('know_perp', document.getElementById('rKnowsPerp').value, true);
			//f.set('contact_perp', document.getElementById('rContactPerp').value, true);
			f.set('police_contact', document.getElementById('textaIncidentReported').value, true);
			//f.set('ong_investigation', document.getElementById('rOngInvest').value, true);
			//f.set('request_contact', document.getElementById('rRequestContact').value, true);
			//f.set('request_service', document.getElementById('rRequesService').value, true);
			f.set('extra_info', document.getElementById('textaOtherInfo').value, true);
			
			transactWFS('insert', f);
						
					
		  });
            var this_ = this;
            var handleDrawPoint = function(e) {
                e.preventDefault();
                if (!this.active) {
                    this_.getMap().addInteraction(draw);
					this.active = true;
                } else {
                 
					this.active = false;
                }
              };

            // This will be the ui of the component
            var anchor = document.createElement('div');
            anchor.href = '#draw-point';
            anchor.innerHTML = 'incident';

            // Bind to click and touchevents to support mobile
            anchor.addEventListener('click', handleDrawPoint, false);
            anchor.addEventListener('touchstart', handleDrawPoint, false);
			// Create incident button
            var element = document.createElement('div');
            element.className = 'ol-control draw-point ol-unselectable';
            element.appendChild(anchor);

            ol.control.Control.call(this, {
                element: element,
				map: options.map,
                target: options.target
            });
        };
        // Inherit base functionality from ol.control.Control
        ol.inherits(DrawControl, ol.control.Control);
		

	  // Define the styles for the incident layer (unselected and selected)
			    var incidentLayerStyle = new ol.style.Style({
        		image: new ol.style.Icon({
                scale: 0.05,
        		src: 'assets/img/Alert.svg'
                
              })
      		});

      		var incidentLayerSelectedStyle = new ol.style.Style({
        		image: new ol.style.Icon({
                scale: 0.05,
        		src: 'assets/img/homePinSel.svg',
                fill: new ol.style.Fill({
                  color: '#11d473'
                })
              })
      		});


		
	// Set WFSlayer from ajax source call
	 var layerWFS = new ol.layer.Vector({
		title: 'Incidents',
		source: sourceWFS,
		style:incidentLayerStyle,
		maxResolution:0.29858214173896974});
	  
	// Make Building layer selectable and set the corresponding style			 
		var selectInteraction = new ol.interaction.Select({
        layers: function(layerWFS) {
          return layerWFS.get('selectable') == true;
        },
        style: [incidentLayerSelectedStyle]
      });
	//Set cluster to accomodate high volume of features in view
	
	  var clusterSource = new ol.source.Cluster({
              source: sourceWFS
      });
	  
	  var styleCache = {};
	  var clusterLayer = new ol.layer.Vector({
		title: 'Clusters',
        source: clusterSource,
		minResolution:0.29858214173896974,
		style: function(feature) {
          var size = feature.get('features').length;
          var style = styleCache[size];
          if (!style) {
            style = new ol.style.Style({
              image: new ol.style.Circle({
                radius: 10,
                stroke: new ol.style.Stroke({
                  color: '#fff'
                }),
                fill: new ol.style.Fill({
                  color: '#80b3ff'
                })
              }),
              text: new ol.style.Text({
                text: size.toString(),
                fill: new ol.style.Fill({
                  color: '#fff'
                })
              })
            });
            styleCache[size] = style;
          }
          return style;
        }
      });
      
	  
	  var vivaCenter = ol.proj.fromLonLat([28.44708 ,-25.73141]);
	  //Set view of map
	  var View = new ol.View({
          center: vivaCenter, //-25.73141, 28.44708	28.44708 ,-25.73141
          zoom: 17,
		  maxZoom: 20,
		  minZoom: 16, 
		   
	     });
	//Initialize Map
    var incidentmap = new ol.Map({
        target: 'mapid2',
		interaction: selectInteraction,	
        layers: [
            new ol.layer.Group({
                title: '',
                layers: [new ol.layer.Tile({
							source: new ol.source.XYZ({url:'https://api.mapbox.com/styles/v1/frikan/ciuy0zfu501aq2jl84yq2hxah/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpa2FuIiwiYSI6ImNpc3dzc2FrbDAwMmEydHBkMnB2dXRjNXUifQ.Nf2lV7VkWbzMA5OTJxFesw'
							})
								})
			
                    
                    ]
            }),
            new ol.layer.Group({
                title: 'Overlays',
                layers: [
                    new ol.layer.Tile({
                        title: 'Paths',
                        source: new ol.source.TileWMS({
                            url: 'http://frikancarto.co.za:8080/geoserver/Viva/wms?',
                            params: {'LAYERS': 'paths',
									 'format': 'image/png',
									 'transparent': true,
									 },
                            serverType: 'geoserver' 
						})
					}),
				   
                    
				
					 layerWFS, 
					 clusterLayer
				
                    
                ]
            })
        ],
        view: View
		
    });
		//Setup of WFS Transaction
		var transactWFS = function (mode, f) {
		var node;
		switch (mode) {
			case 'insert':
				node = formatWFS.writeTransaction([f], null, null, formatGML);
				break;
			case 'update':
				node = formatWFS.writeTransaction(null, [f], null, formatGML);
				break;
			case 'delete':
				node = formatWFS.writeTransaction(null, null, [f], formatGML);
				break;
		}
		var payload = xs.serializeToString(node);
		$.ajax('http://frikancarto.co.za:8080/geoserver/wfs?', {
			type: 'POST',
			dataType: 'xml',
			processData: false,
			contentType: 'text/xml',
			data: payload
		}).done(function() {
			sourceWFS.clear();
			var gidNew= f.get('gid');
		    
		});
	};
	
	//LayerSwitcher
    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Layers' // Optional label for button
    });
	
    incidentmap.addControl(layerSwitcher);
	
	//Custom Viva button with coordinates
	incidentmap.addControl(
    new app.ZoomExtentControl({
        extent: [3166407.767024855, -2966020.0977410455, 3166551.3850350315, -2965870.8066701763]
    }));
	// Custom add incident control 
	incidentmap.addControl(new DrawControl());
	
	// Adds select interaction	and enables selection for incident layer
	incidentmap.getInteractions().extend([selectInteraction]);	
	layerWFS.set('selectable',true);	
		
	 // Set the corresponding style for interaction
			    var select = new ol.interaction.Select({
    			  layers: [layerWFS],
    			  style:  [incidentLayerSelectedStyle]
			  
			  
       		});
			

    
})();