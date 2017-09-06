(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    var map_style = [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "poi",
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
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
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
                  "color": "#46bcec"
              },
              {
                  "visibility": "on"
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
        console.log(category);
        var strokeColor = '#FFFFFF';
        var fillColor = '#FFFFFF';
        switch(category) {
          case 'Walking':
            strokeColor = 'red';
            fillColor = 'red';
            break;
          case 'On a train':
            strokeColor = 'black';
            fillColor = 'black';
            break;
          case 'On a bus':
            strokeColor = 'Yellow';
            fillColor = 'Yellow';
            break;
          case 'Driving':
            strokeColor = 'Green';
            fillColor = 'Green';
            break;
          default:
            break;
        }
        map.data.overrideStyle(f, {
          strokeColor: strokeColor,
          fillColor: fillColor,
        }
      );

      });
    });

  });

})(jQuery, window, document);
