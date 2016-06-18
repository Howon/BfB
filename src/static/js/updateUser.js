function updateUser(userId) {

  var userData = {
    id: uid,
    name: name,
    items: [],
    lat: lat,
    lng: lng
  };

  firebase.database().ref('users/' + uid).set(userData);

}