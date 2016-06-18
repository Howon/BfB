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
    }
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}


getLocation()