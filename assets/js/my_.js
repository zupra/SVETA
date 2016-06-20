var form = document.querySelector('form');

form.addEventListener('submit', function(e) {

	var data = new FormData(form);

	var req = new XMLHttpRequest();
	req.open('POST', 'https://docs.google.com/forms/d/1a6YgeSv3xfBlIfWBOyywhCbALccyIuwgOOcKwvVYN-A/formResponse', true);

	req.send(data);

  e.preventDefault();
}, false);







var myscroller = function(){
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


};


//window.addEventListener('resize', function() {});

if ( document.documentElement.clientWidth > 800 ) {
	myscroller();
}
