function createUser() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAfoOHV3ZGqptKBzKVhXsPqi-Joyv10aUo",
        authDomain: "foodtinder-daa92.firebaseapp.com",
        databaseURL: "https://foodtinder-daa92.firebaseio.com",
        storageBucket: "foodtinder-daa92.appspot.com",
    };
    firebase.initializeApp(config);

    var rootRef = firebase.database().ref();

    var auth = firebase.auth();

    var provider = new firebase.auth.FacebookAuthProvider();

    auth.signInWithPopup(provider).then(function(result) {
        // User signed in!
        console.log(result);
        var uid = result.user.uid;
        var name = result.user.displayName;

        firebase.database().ref('users/' + uid).once('value', function(snapshot) {
            if (snapshot.exists() == false) {
                navigator.geolocation.getCurrentPosition(success, error);

                function success(position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    console.log(lat);
                    console.log(lng);

                    var userData = {
                        id: uid,
                        name: name,
                        items: [3, 4, 5],
                        lat: lat,
                        lng: lng
                    };

                    console.log(userData);

                    firebase.database().ref('users/' + uid).set(userData);
                };

                function error() {
                    console.log('error')

                    var userData = {
                        id: uid,
                        name: name,
                        items: [],
                        lat: null,
                        lng: null
                    };

                    console.log(userData);

                    firebase.database().ref('users/' + uid).set(userData);
                };
            } else {
                console.log('user exists, so we do nothing');
            }
            button = document.getElementById('facebook')
            button.innerHTML = name;

        })
    }).catch(function(error) {
        // An error occurred

    });

}

$('facebook').click(function(){
    createUser();
});