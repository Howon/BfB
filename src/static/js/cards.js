var notificationSock = io(window.location.host + "/notification");
var chatSock = io(window.location.host + "/chat");

var notifications = []

var users = [{
  img: "http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg",
  name: "Bill",
  lat: 47.6283102,
  lon:-122.3428749
}, {
  img: "http://images.clipartpanda.com/person-clipart-dc85kMGMi.svg",
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

function renderNotifications(notifications) {
  notifications = notifications.map(x => "<li class='notification' id='notification-"+ x.itemID + "'> Matched with "+
                                            x.from.name + " for "+ x.title +
                                            "<img class='notification-image' src='+x.from.img+'" +
                                            "data-id='"+x.itemID + "data-name='"+x.from.name+"' />"+
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

$("#close-modal").click(function(){
  $("#card-upload-modal").hide()
})

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
    });
    // You might want to show the submit button only when
    // files are dropped here:
    this.on("addedfile", function() {
    // Show submit button here and/or inform user to click it.
    });
  }
};

