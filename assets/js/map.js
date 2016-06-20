function initMap() {




	// map
	//var _draggable = ($(window).width() > 800) ? true : false;

	var _draggable = true;

	var latitude = 55.7041,
			longitude = 37.8445726;
	var marker_url = './assets/img/map.png';



	var style = [{
		"stylers": [{
			"hue": "#21313f"
		}, {
			"saturation": -80
		}, {
			"gamma": 2.15 //1
		}, {
			"lightness": 5//12
		}]
	}];

	var map_options = {
		//center: new google.maps.LatLng(latitude, longitude),
		center: {lat: 55.7032172, lng: 37.8484306},
		zoom: 17,
		panControl: true,
		zoomControl: true,
		mapTypeControl: false,
		streetViewControl: true,
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
		//animation: google.maps.Animation.BOUNCE,
		//icon: marker_url,
	});

	var marker2 = new google.maps.Marker({
    position: {lat: 55.701986, lng: 37.8502428},
    map: map,
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
};
