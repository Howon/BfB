 // Initialize Firebase
var config = {
  apiKey: "AIzaSyAfoOHV3ZGqptKBzKVhXsPqi-Joyv10aUo",
  authDomain: "foodtinder-daa92.firebaseapp.com",
  databaseURL: "https://foodtinder-daa92.firebaseio.com",
  storageBucket: "foodtinder-daa92.appspot.com",
};
firebase.initializeApp(config);

var allCards={};

function getAllCards(){
	var ref = firebase.database().ref('cards/');
	ref.orderByChild("title").on("child_added",function(snapshot){
		allCards[snapshot.key] = {
		"owner": snapshot.val().owner,
		"title": snapshot.val().title,
		"img": snapshot.val().img,
		"description": snapshot.val().description,
		"claimed": snapshot.val().claimed,
		"lat": snapshot.val().lat,
		"long": snapshot.val().long,
		"location": snapshot.val().location
		};
	});
}


function createCard(owner, title, img, description,
	lat, long, location){
	var newCard = firebase.database().ref('cards/').push({
		"owner": owner,
		"title": title,
		"img": img,
		"description": description,
		"claimed": false,
		"lat": lat,
		"long": long,
		"location": location
	});

	var newCardId = newCard.key;
	var myOwner = firebase.database().ref('users/' + owner + '/items').push(
		newCard.key
	)
}

function updateCard(id, owner, title, img, description,
	lat, long, location){
	firebase.database().ref('cards/'+id).set({
		"owner": owner,
		"title": title,
		"img": img,
		"description": description,
		"claimed": false,
		"lat": lat,
		"long": long,
		"location": location
	});

}
