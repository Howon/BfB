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



