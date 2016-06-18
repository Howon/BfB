var notificationSock = io(window.location.host + "/notification");
var chatSock = io(window.location.host + "/chat");

var userID = "james"
var userID2 = "howon"

notificationSock.emit("join", userID);
notificationSock.on("match:card", function(userID){
  console.log(userID)
})

$("#panelSlide").jTinder({
  // dislike callback
  onDislike: function (item) {
    console.log("disliked")
    $('#status').html('Dislike image ' + (item.index()+1));
  },
  // like callback
  onLike: function (item) {
    console.log("liked")
    notificationSock.emit("match:card", userID2);
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

