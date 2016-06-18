var currLat;
var currLon;
var address;

function getLocation() {
    if (navigator.geolocation) {
        function reverseGeoCodingGenerator(lat, lon, key) {
            return "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=" + key;
        }

        function showPosition(position) {
            currLat = position.coords.latitude;
            currLon = position.coords.longitude;

            var xhr = new XMLHttpRequest();
            var apiKey = "AIzaSyC3RB-TqPKhqFjiigOwAX15HEmjvziKc4M";

            xhr.open('GET', reverseGeoCodingGenerator(currLat, currLon, apiKey), true);
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

function showMap(lat, lon, zoom) {
    var center = new google.maps.LatLng(parseFloat(lat), parseFloat(lon));
    var markers = [];
    var iterator = 0;
    var map;

    function initMap() {
        var mapOptions = {
            zoom: zoom,
            center: center
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        google.maps.event.trigger(map, 'resize');
        markers.push(new google.maps.Marker({
            position: center,
            map: map,
            draggable: false
        }));
    }
    initMap();
}

function createMap(lat, lon, zoom) {
    var center = new google.maps.LatLng(lat, lon);
    var neighborhoods = []
    for (var i = 0; i < props.cards.length; i++) {
        neighborhood = new google.maps.LatLng(props.cards[i].lat, props.cards[i].lon);
        neighborhoods.push(neighborhood);
    }

    var markers = [];
    var iterator = 0;
    var map;

    function initMap() {

        var mapOptions = {
            zoom: zoom,
            center: center
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        google.maps.event.trigger(map, 'resize');
        for (var i = 0; i < neighborhoods.length; i++) {
            // console.log(neighborhoods[i]);
            markers.push(new google.maps.Marker({
                position: neighborhoods[i],
                map: map,
                draggable: false
            }));
        }
    }
    initMap();
}