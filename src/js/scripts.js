(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    var map_style = [
      {
          "elementType": "labels.icon",
          "stylers": [
              {
                  "color": "#365779"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape",
          "stylers": [
              {
                  "color": "#042E58"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "stylers": [
              {
                  "color": "#A51A1D"
              }, 
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.local",
          "stylers": [
              {
                  "color": "#808080"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "stylers": [
              {
                  "color": "#808080"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "elementType": "labels.text",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "weight": 0.1
              }
          ]
      },
      {
          "featureType": "poi",
          "stylers": [
              {
                  "color": "#365779"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "water"
      },
      {
          "featureType": "transit",
          "stylers": [
              {
                  "color": "#365779"
              }
          ]
      }
    ]
    var center = {lat: 21.767, lng: 78.871};
    var src = 'https://gist.githubusercontent.com/excerebrose/40f78d5fa5f04efa08d789f42e7c38a4/raw/a4e78bb837778dc9f6e57844b32ae50ef6b0b49c/location.json';
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: center,
      disableDefaultUI: true,
      zoomControl: true,      
      styles: map_style
    });
    map.data.loadGeoJson(src, null, function(features) {
      features.forEach(function(f) {
        var category = f.getProperty('Category');
        var fillColor = '#FFFFFF';
        switch(category) {
          case 'Walking':
            fillColor = '#009688';
            break;
          case 'On a train':
            fillColor = '#F44336';
            break;
          case 'On a bus':
            fillColor = '#FFC107';
            break;
          case 'Driving':
            fillColor = '#8BC34A';
            break;
          default:
            break;
        }
        map.data.overrideStyle(f, {
          strokeColor: fillColor,
          fillColor: fillColor,
          strokeWidth: 5,
        }
      );

      });
    });
    var infowindow = new google.maps.InfoWindow();
    map.data.addListener('mouseover', function(event) {
      var heading = event.feature.getProperty("Category");
      var begin = new Date(event.feature.getProperty('timespan').begin);
      var end = new Date(event.feature.getProperty('timespan').end);
      var timeString = 'From ' + begin.toUTCString() + ' to ' + end.toUTCString();
      infowindow.setContent("<div class='infoPopUp'><span>"+ heading+ "</span><span>" + timeString + "</span></div>");
      infowindow.setPosition(event.feature.getGeometry().getAt(0))
      infowindow.open(map);
    });
  });

})(jQuery, window, document);
