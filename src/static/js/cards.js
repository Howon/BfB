var notificationSock = io(window.location.host + "/notification");
var chatSock = io(window.location.host + "/chat");

var notifications = []

var users = [{
  img: "http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg",
  name: "Bill",
  lat: 47.6283102,
  lon:-122.3428749
}, {
  img: "http://media.vanityfair.com/photos/55ddc2f8e8f804624a2ff49c/master/h_590,c_limit/donald-trump-history-hair-ss09.jpg",
  name: "Not_Donald",
  lat: 47.6286920,
  lon:-122.3428
}]

var user = users[props.userID];

var notificationModals = {}

notificationSock.on("match:card", function(notification){
  notifications.push(notification);
  renderNotifications(notifications)
})

chatSock.on("start:chat", startChat);

function startChat(){

}

$(".card-container").on('click', 'li.card > i', displayCardLocation);

function displayCardLocation(item) {
  var lat = notification.currentTarget.dataset.lat;
  var lon = notification.currentTarget.dataset.lon;

  //james
}

function renderNotifications(notifications) {
  notifications = notifications.map(x => "<li class='notification' id='notification-"+ x.itemID + "'> Matched with "+
                                            "<div>" + x.from.name + " for "+ x.title + "</div>" +
                                            "<img class='notification-image' src='"+ x.from.img + "' "+
                                            "data-id='"+ x.itemID + "' data-name='"+x.from.name+"' />"+
                                            "<i class='dismiss-notification fa fa-times' data-id='"+ x.itemID +"'></i>" +
                                         "</li>")
  $("#notification-hook").html(notifications)
}

 $("#notification-hook").on('click', 'li.notification > img', notificationClicked)
 $("#notification-hook").on('click', 'li.notification > .dismiss-notification', notificationDismissed)

function notificationClicked(notification) {
  var name = notification.currentTarget.dataset.name
  chatSock.emit("start:chat", name);
}

function notificationDismissed(notification) {
  var listID = notification.currentTarget.dataset.id
  $("#notification-hook > #notification-" + listID).remove()
}

$("#panelSlide").jTinder({
  // dislike callback
  onDislike: function (item) {
    $('#status').html('Dislike image ' + (item.index()+1));
  },
  // like callback
  onLike: function (item) {
    var card = item[0];

    notificationSock.emit("match:card", {
      from: user,
      itemID: card.dataset.id,
      title : card.children[1].innerHTML,
      content : card.children
    });
    $('#status').html('Like image ' + (item.index()+1));
  },
  animationRevertSpeed: 200,
  animationSpeed: 400,
  threshold: 1,
  likeSelector: '.like',
  dislikeSelector: '.dislike'
});

$("#card-uploader").click(function() {
  $("#card-upload-modal").toggle()
})

$("#show-map").click(function() {
  $("#map-modal").toggle()
})

$("#close-upload-modal").click(function(){
  $("#card-upload-modal").hide()
})

$("#close-map-modal").click(function(){
  $("#map-modal").hide()
})

var image;

Dropzone.options.imageUploadZone = {
  acceptedFiles: "image/*",
  maxFilesize: 10, // MB
  autoProcessQueue: false,
  dictDefaultMessage:"Upload images here",
  init: function() {
    var submitButton = document.querySelector("#submit-card")
    myDropzone = this; // closure
    submitButton.addEventListener("click", function() {
      myDropzone.processQueue(); // Tell Dropzone to process all queued files.
      var title = $('#card-modal-title-form').val();
      var description = $('#card-modal-desc-form').val();
      // console.log(image);
      // var asdf = document.getElementById('card-uploader');
      // asdf.innerHTML = "<img src=" + image + "></img>";
      createCard(userID, title, image, description, lat, lon, address);


    });
    // You might want to show the submit button only when
    // files are dropped here:
    this.on("addedfile", function(data) {
    // Show submit button here and/or inform user to click it.
      // console.log(data);
      var reader = new FileReader();
      reader.onload = function(){
        var dataURL = reader.result;
        var output = document.getElementById('output');
        image = dataURL;
      };
      reader.readAsDataURL(data);


          });
  }
};



