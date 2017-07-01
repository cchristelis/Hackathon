(function() {
	// initailize editSwitch with True allowing edit
	var editSwitch = "true"
	//initialize gidNew
	var gidNew = "unset"
	var formatWFS = new ol.format.WFS ({
		
	});
	
	var formatGML = new ol.format.GML({
    featureNS: 'http://gmt.frikancarto.co.za',
    featureType: 'building',
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
			typename:'Viva:building',
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
		// Draw add building control on map
		var DrawControl = function(opt_options) {
            var options = opt_options || {};
            this.active = options.active || false;
            var draw = new ol.interaction.Draw({
                source: sourceWFS.source,
                type: 'Point',
			});
			draw.on('drawstart', function(e) {
						});
			
			//Sets building properties when addBuilding-button is clicked and changes status of edit to false
		    draw.on('drawend', function(e) {
			var f = e.feature;
			f.set('prim_add', document.getElementById('inpPriAddress').value, true);
			f.set('sec_add', document.getElementById('inpSecAddress').value, true);
			f.set('ter_add', document.getElementById('inpTerAddress').value, true);
			f.set('build_Type', document.getElementById('inpBuildingType').value, true);
			f.set('Build_mat', document.getElementById('inpBuildingMaterial').value, true);
			f.set('Build_own', document.getElementById('inpHouseOwner').value, true);
			
			
			transactWFS('insert', f);
			'http://frikancarto.co.za:8080/geoserver/Viva/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Viva:building&maxFeatures=50&outputFormat=application%2Fjson'
					
					
		  });
            var this_ = this;
            var handleDrawPoint = function(e) {
                e.preventDefault();
                if (!this.active) {
                    this_.getMap().addInteraction(draw);
					this.active = true;
                } else {
                    this_.getMap().removeInteraction(draw);
					
                    var geoJsonUrl =' http://frikancarto.co.za:8080/geoserver/Viva/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Viva:building&maxFeatures=50&outputFormat=application%2Fjson' ;
                    var format = new ol.format.GeoJSON();	


                    $.get(geoJsonUrl).success(function(data){
                        var feature = "";
                        for(var i=0; i<data.features.length; i++){
                            feature = format.readFeature(data.features[i]);
                        }
                        console.log(feature.get('gid'));
                        localStorage.setItem('residentGID', feature.get('gid'));
                    });
					this.active = false;
                }
              };

            // This will be the ui of the component
            var anchor = document.createElement('div');
            anchor.href = '#draw-point';
            anchor.innerHTML = 'Building';

            // Bind to click and touchevents to support mobile
            anchor.addEventListener('click', handleDrawPoint, false);
            anchor.addEventListener('touchstart', handleDrawPoint, false);
			// Create building button
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
		

	  // Define the styles for the buildings layer (unselected and selected)
			    var buildingLayerStyle = new ol.style.Style({
        		image: new ol.style.Icon({
                scale: 0.05,
        		src: 'assets/img/homePin.svg',
                fill: new ol.style.Fill({
                  color: '#11d473'
                })
              })
      		});

      		var buildingLayerSelectedStyle = new ol.style.Style({
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
		title: 'Building',
		source: sourceWFS,
		style:buildingLayerStyle,
		maxResolution:0.29858214173896974});
	  
	// Make Building layer selectable and set the corresponding style			 
		var selectInteraction = new ol.interaction.Select({
        layers: function(layerWFS) {
          return layerWFS.get('selectable') == true;
        },
        style: [buildingLayerSelectedStyle]
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
    var buildingmap = new ol.Map({
        target: 'mapid',
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
	
    buildingmap.addControl(layerSwitcher);
	
	//Custom Viva button with coordinates
	buildingmap.addControl(
    new app.ZoomExtentControl({
        extent: [3166407.767024855, -2966020.0977410455, 3166551.3850350315, -2965870.8066701763]
    }));
	// Custom add building control 
	buildingmap.addControl(new DrawControl());
	
	// Adds select interaction	and enables selection for building layer
	buildingmap.getInteractions().extend([selectInteraction]);	
	layerWFS.set('selectable',true);	
		
	 // Set the corresponding style for interaction
			    var select = new ol.interaction.Select({
    			  layers: [layerWFS],
    			  style:  [buildingLayerSelectedStyle]
			  
			  
       		});
			
	//Popup	for building info	
	
	/**
	* Popup
	**/
	var
		container = document.getElementById('popup'),
		content_element = document.getElementById('popup-content'),
		closer = document.getElementById('popup-closer');

	closer.onclick = function() {
		overlay.setPosition(undefined);
		closer.blur();
		return false;
	};
	var overlay = new ol.Overlay({
		element: container,
		autoPan: true,
		offset: [0, -10]
	});
	buildingmap.addOverlay(overlay);
	
    var enableExamine = false;
    
    //toggle examine map
    $('#buttonID').click(function(e) {
        
        e.preventDefault();
        
        if(enableExamine) {
            enableExamine = false;
        } else {
            enableExamine = true;
        }
    });
    
    //Click event and content for building
    buildingmap.on('click', function(evt) {
        
        if(enableExamine) {
            
            var feature = buildingmap.forEachFeatureAtPixel(evt.pixel,
              function(feature, layer) {
                return feature;
            });
            if (feature) {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();

                var content =  '<h5> Primary Address: ' + feature.get('prim_add') + '</h5>';
                    content += '<h5> Secondary Address: ' + feature.get('sec_add') + '</h5>';
                    content += '<h5> Owner: ' + feature.get('Build_own') + '</h5>';
                    content += '<h5> Gid: ' + feature.get('gid') + '</h5>';


                content_element.innerHTML = content;
                overlay.setPosition(coord);
            }else{
                content =  '<h5> No building at click loccation </h5>';
            }
        }
    });
    buildingmap.on('pointermove', function(e) {
        
        if(enableExamine) {
            if (e.dragging) return;

            var pixel = buildingmap.getEventPixel(e.originalEvent);
            var hit = buildingmap.hasFeatureAtPixel(pixel);
        }
    });
    
})();