function initMap(){function e(e,t){var o=document.getElementById("zoom-in"),s=document.getElementById("zoom-out");e.appendChild(o),e.appendChild(s),google.maps.event.addDomListener(o,"click",function(){t.setZoom(t.getZoom()+1)}),google.maps.event.addDomListener(s,"click",function(){t.setZoom(t.getZoom()-1)})}var t=!0,o=55.7041,s=37.8445726,n=[{stylers:[{hue:"#21313f"},{saturation:-80},{gamma:2.15},{lightness:5}]}],c={center:{lat:55.7032172,lng:37.8484306},zoom:16,panControl:!1,zoomControl:!1,mapTypeControl:!1,streetViewControl:!1,mapTypeId:google.maps.MapTypeId.ROADMAP,scrollwheel:!1,draggable:t,styles:n},i=new google.maps.Map(document.getElementById("map_canvas"),c),r=(new google.maps.Marker({position:new google.maps.LatLng(o,s),map:i}),new google.maps.Marker({position:{lat:55.701986,lng:37.8502428},map:i}),document.createElement("div"));new e(r,i);i.controls[google.maps.ControlPosition.LEFT_TOP].push(r)}var form=document.querySelector("form"),btn=document.querySelector("button");form.addEventListener("submit",function(e){e.preventDefault();var t=new FormData(form),o=new XMLHttpRequest;o.open("POST","https://docs.google.com/forms/d/1a6YgeSv3xfBlIfWBOyywhCbALccyIuwgOOcKwvVYN-A/formResponse",!0),o.send(t),btn.classList.add("success"),btn.innerHTML="Готово!",form.reset(),setTimeout(function(){btn.classList.remove("success"),btn.innerHTML="Записаться"},2e3)},!1);var myscroller=function(){"use strict";function e(){var e=document.querySelectorAll("#nav a");Array.prototype.forEach.call(e,function(e,t){e.classList.remove("active")})}function t(t){document.documentElement.clientWidth<800||(t.preventDefault(),e(),n.compare.push(document.body.scrollTop),n.compare.length>2&&(n.compare.shift(),n.compare[0]<n.compare[1]?n._scroll("Down"):n._scroll("Up")))}var o=document.querySelectorAll(".section-scroll"),s=function(e){this.elements=e,this.elements[0].classList.add("active"),this.isMoving=!1,this.compare=[],this.requestId};s.prototype={_scroll:function(e){var t,o,s;for(t=0;t<this.elements.length;t++)if(o=this.elements[t],o.classList.contains("active")){var n=t;if(o.classList.remove("active"),n<this.elements.length-1&&"Down"===e)return s=n+1,this.elements[s].classList.add("active"),this.isMoving=!0,this._scrollToTarget(),!1;if(n===this.elements.length-1&&(s=t,this.elements[s].classList.add("active")),0===n&&"Up"===e&&(s=0,this.elements[s].classList.add("active")),n>0&&"Up"===e)return s=n-1,this.elements[s].classList.add("active"),this.isMoving=!0,this._scrollToTarget(),!1}},_isMoving:function(){return this.isMoving!==!0?!1:void(document.body.style.overflow="hidden")},_scrollToTarget:function(){var e=this;this._isMoving(),this.documentPos=document.body.scrollTop,this.activePos=document.querySelector(".active").offsetTop,this.requestId=requestAnimationFrame(function(){return e._scrollToTarget(),e.activePos>e.documentPos+50&&(e.documentPos=e.documentPos+25,window.scrollTo(0,e.documentPos),e.compare=[]),e.activePos<e.documentPos-50&&(e.documentPos=e.documentPos-25,window.scrollTo(0,e.documentPos),e.compare=[]),e.documentPos+50>=e.activePos&&e.documentPos-50<=e.activePos?(e.stop(),window.scrollTo(0,e.activePos),e.compare=[],e.isMoving=!1,setTimeout(function(){document.body.style.overflow="scroll"},900),!1):void 0})},stop:function(){window.cancelAnimationFrame(this.requestId)}};var n=new s(o);if(document.documentElement.clientWidth>800){var c=document.querySelector("#nav");c.addEventListener("click",function(s){var c=s.target;"A"==c.tagName&&(window.removeEventListener("scroll",t),e(),s.target.classList.add("active"),Array.prototype.forEach.call(o,function(e,t){e.classList.remove("active")}),document.querySelector(c.getAttribute("href")).classList.add("active"),n.compare.shift(),setTimeout(function(){window.addEventListener("scroll",t)},1e3))})}window.addEventListener("scroll",t)};myscroller();