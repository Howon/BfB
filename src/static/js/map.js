var lat;
var lon;
var address;

function getLocation() {
    if (navigator.geolocation) {
        function reverseGeoCodingGenerator(lat, lon, key) {
            return "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=" + key;
        }

        function showPosition(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            var xhr = new XMLHttpRequest();
            var apiKey = "AIzaSyC3RB-TqPKhqFjiigOwAX15HEmjvziKc4M";

            xhr.open('GET', reverseGeoCodingGenerator(lat, lon, apiKey), true);
            xhr.send();

            xhr.onreadystatechange = processRequest;

            function processRequest(e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    address = response.results[0].formatted_address;
                    document.getElementById("location-mount-point").innerHTML = address;
                }
            }
            createMap();
        }
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}


getLocation()

function createMap() {
  console.log(47.6282888, -122.34286349999998);
  var center = new google.maps.LatLng(47.6282888, -122.34286349999998);
  var neighborhoods = [
      new google.maps.LatLng(52.511467, 13.447179),
      new google.maps.LatLng(52.549061, 13.422975),
      new google.maps.LatLng(52.497622, 13.396110),
      new google.maps.LatLng(52.517683, 13.394393)
  ];
  var markers = [];
  var iterator = 0;
  var map;

  function initialize() {
      var mapOptions = {
          zoom: 12,
          center: center
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

      for (var i = 0; i < neighborhoods.length; i++) {
          setTimeout(function() {
              addMarker();
          }, i * 200);
      }
  }

  function addMarker() {
      markers.push(new google.maps.Marker({
          position: neighborhoods[iterator],
          map: map,
          draggable: false,
          animation: google.maps.Animation.DROP
      }));
      iterator++;
  }
  google.maps.event.addDomListener(window, 'load', initialize);
}

createMap()