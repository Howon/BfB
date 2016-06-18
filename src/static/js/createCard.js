 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyAfoOHV3ZGqptKBzKVhXsPqi-Joyv10aUo",
     authDomain: "foodtinder-daa92.firebaseapp.com",
     databaseURL: "https://foodtinder-daa92.firebaseio.com",
     storageBucket: "foodtinder-daa92.appspot.com",
 };
 firebase.initializeApp(config);


 function createCard(owner, title, img, description, lat, long, address) {
     var newCard = firebase.database().ref('cards/').push({
         "owner": owner,
         "title": title,
         "img": img,
         "description": description,
         "claimed": false,
         "lat": lat,
         "long": long,
         "address": address
     });
     console.log(newCard);
     var newCardId = newCard.key;


     var userItems = firebase.database().ref('users/' + owner + "/items");
     var myItems = [newCardId]

     userItems.on('value', function(snapshot) {
         myItems.push(snapshot.val());
     });


     var updates = {};
     updates['users/' + owner + "/items"] = myItems;
     firebase.database().ref().update(updates);



 }

 function updateCard(id, owner, title, img, description, lat, long, address) {
     firebase.database().ref('cards/' + id).set({
         "owner": owner,
         "title": title,
         "img": img,
         "description": description,
         "claimed": false,
         "lat": lat,
         "long": long,
         "address": address
     });

 }

 // alert("hi");
 // createCard(0, "a", "a", "asdf", 4, 4, "la");