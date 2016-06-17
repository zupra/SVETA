//window.offsetWidth

(function(){
		'use strict';

		var sections = document.querySelectorAll('.section-scroll');

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


		function clearActiveLink () {
			var links = document.querySelectorAll('#nav a');
			Array.prototype.forEach.call(links, function(el, i){
				el.classList.remove('active');
			});
		}


		window.addEventListener('scroll', callback);

		function callback (event) {
			event.preventDefault();


			clearActiveLink();



			slide.compare.push(document.body.scrollTop);
			if (slide.compare.length > 2) {
				slide.compare.shift();
				(slide.compare[0] < slide.compare[1]) ? slide._scroll('Down'): slide._scroll('Up');
			}

		}


}());




(function() {

      // map
      //var _draggable = window.innerWidth > 800) ? true : false;
			var _draggable = true

      var latitude = 55.82431 //55.7348971, //55.804693,
      longitude = 37.63453, 12 //37.5884822; //37.591822;
      var map_zoom = 17; //17
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
    });
}());
