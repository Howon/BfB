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
}).catch(function(error) {
  // An error occurred
});
