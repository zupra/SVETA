function initMap() {

	//var _draggable = (document.documentElement.clientWidth > 800 ) ? true : false;
	var _draggable = true;


	var latitude = 55.7041,
			longitude = 37.8445726;
	//var marker_url = './assets/img/map.png';


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

	var _zoom = (document.documentElement.clientWidth > 800 ) ? 16 : 15;
	 var _styles = (document.documentElement.clientWidth > 800 ) ? style : [];

	var map_options = {
		center: {lat: 55.7032172, lng: 37.8484306},
		zoom: _zoom ,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		draggable: _draggable, //false,
		styles: _styles
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





var form = document.querySelector('form');
var btn = document.querySelector('button');

form.addEventListener('submit', function(e) {
	e.preventDefault();


	var data = new FormData(form);
	var req = new XMLHttpRequest();
	req.open('POST', 'https://docs.google.com/forms/d/1a6YgeSv3xfBlIfWBOyywhCbALccyIuwgOOcKwvVYN-A/formResponse', true);



	req.send(data);

	btn.classList.add('success');
	btn.innerHTML = 'Готово!';
	form.reset();
		setTimeout(function(){
			btn.classList.remove('success');
			btn.innerHTML = 'Записаться';

		}, 600);


}, false);







var myscroller = function(){
		'use strict';

		var sections = document.querySelectorAll('section');

		var Slides = function(sections) {
			this.elements = sections; //document.querySelectorAll('.section-scroll');
		  this.elements[0].classList.add('active');
		  this.isMoving = false;
		  this.compare = [];
		  this.requestId;

		};


		Slides.prototype = {

			_scroll: function(direction) {

				var i, thisElement, j;

				for (i = 0; i < this.elements.length; i++) {
					thisElement = this.elements[i];

					if (thisElement.classList.contains('active')) {
						var currentItemIndex = i;

						thisElement.classList.remove('active');

						//Down
						if (currentItemIndex < this.elements.length - 1 && direction === 'Down') {
							j = currentItemIndex + 1;

							this.elements[j].classList.add('active');
							this.isMoving = true;
							this._scrollToTarget();
							return false;
						}

						if (currentItemIndex === this.elements.length - 1) {
							j = i;
							this.elements[j].classList.add('active');
						}

						//Up
						if (currentItemIndex === 0 && direction === 'Up') {
							j = 0;
							this.elements[j].classList.add('active');
						}

						if (currentItemIndex > 0 && direction === 'Up') {
							j = currentItemIndex - 1;
							this.elements[j].classList.add('active');
							this.isMoving = true;
							this._scrollToTarget();

							return false;
						}

					}

				}

			},

			_isMoving: function() {
				if (this.isMoving === true) {
					document.body.style.overflow = 'hidden';
				} else {
					return false;
				}
			},

			_scrollToTarget: function() {

				var self = this;
				this._isMoving();

				this.documentPos = document.body.scrollTop;
				this.activePos = document.querySelector('.active').offsetTop;

				this.requestId = requestAnimationFrame(function() {
					self._scrollToTarget();

					if (self.activePos > self.documentPos + 50) {
						self.documentPos = self.documentPos + 25;
						window.scrollTo(0, self.documentPos);
						self.compare = [];
					}

					if (self.activePos < self.documentPos - 50) {
						self.documentPos = self.documentPos - 25;
						window.scrollTo(0, self.documentPos);
						self.compare = [];
					}

					if (self.documentPos + 50 >= self.activePos && self.documentPos - 50 <= self.activePos) {
						self.stop();
						window.scrollTo(0, self.activePos);
						self.compare = [];
						self.isMoving = false;
						setTimeout(function() {
							document.body.style.overflow = 'scroll';
						}, 900);
						return false;
					}

				});
			},

			stop: function() {
				window.cancelAnimationFrame(this.requestId);
			}

		};

		//init

		var slide = new Slides(sections);


		// WTF
		if (document.documentElement.clientWidth > 800 ) {
			var nav = document.querySelector('#nav');
			nav.addEventListener('click', function(event) {
				var target = event.target;
				if (target.tagName != 'A') return;
				window.removeEventListener('scroll', callback);
				clearActiveLink();
				event.target.classList.add('active');
				Array.prototype.forEach.call(sections, function(el, i){
					el.classList.remove('active');
				});

				document.querySelector(target.getAttribute('href')).classList.add('active');
				slide.compare.shift();
				setTimeout(function() {
					window.addEventListener('scroll', callback);
				}, 1000);

			});
		}



		function clearActiveLink () {
			var links = document.querySelectorAll('#nav a');
			Array.prototype.forEach.call(links, function(el, i){
				el.classList.remove('active');
			});
		}





		window.addEventListener('scroll', callback);

		function callback (event) {

			//WTF
			if (document.documentElement.clientWidth < 800 ) return;

			event.preventDefault();
			clearActiveLink();

			slide.compare.push(document.body.scrollTop);
			if (slide.compare.length > 2) {
				slide.compare.shift();
				(slide.compare[0] < slide.compare[1]) ? slide._scroll('Down'): slide._scroll('Up');
			}


		}


};

if (document.documentElement.clientWidth > 800 ) {
	myscroller();
}
