(function() {




	// map
	//var _draggable = ($(window).width() > 800) ? true : false;

	var _draggable = true;

	var latitude = 55.7348971, //55.804693,
			longitude = 37.5884822; //37.591822;
	var map_zoom = 15; //17
	var marker_url = './build/img/map.png';
	var style = [{
		"featureType": "poi",
		"elementType": "labels",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"stylers": [{
			"hue": "#21313f"
		}, {
			"saturation": -80
		}, {
			"gamma": 1 //2.15
		}, {
			"lightness": 12
		}]
	}, {
		"featureType": "road",
		"elementType": "labels.text.fill",
		"stylers": [{
			"visibility": "on"
		}, {
			"lightness": 24
		}]
	}, {
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [{
			"lightness": 57
		}]
	}];

	var map_options = {
		center: new google.maps.LatLng(latitude, longitude),
		zoom: map_zoom,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		draggable: _draggable, //false,
		styles: style,
	}

	//inizialize map
	var map = new google.maps.Map(document.getElementById('map_canvas'), map_options);
	//add a custom marker to the map
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(latitude, longitude),
		map: map,
		//visible: true,
		animation: google.maps.Animation.BOUNCE,
		icon: marker_url,
	});

	//add custom buttons for the zoom-in/zoom-out
	function CustomZoomControl(controlDiv, map) {
		//grap the zoom elements from the DOM and insert them in the map
		var controlUIzoomIn = document.getElementById('zoom-in'),
			controlUIzoomOut = document.getElementById('zoom-out');
		controlDiv.appendChild(controlUIzoomIn);
		controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
			map.setZoom(map.getZoom() + 1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
			map.setZoom(map.getZoom() - 1)
		});
	}

	var zoomControlDiv = document.createElement('div');
	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

	//insert the zoom div on the top left of the map
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
}());
