let notificationSock = io(window.location.host + "/notification");
let chatSock = io(window.location.host + "/chat");

let notifications = []

let user = props.users[props.userID];

let notificationModals = {}

notificationSock.on("match:card", function(notification) {
    notifications.push(notification);
    renderNotifications(notifications)
})

chatSock.on("start:chat", startChat);

chatDisabled = {}

chatSock.on("close:chat", function(user) {
    let messageItem = "<li class = 'message message-close'>" +
        "<div class = 'message-sender'>" + user.name + "</div>" +
        "<div class = 'message-content'> left the chat</div>" +
        "</li>"
    $("#messages-area").prepend(messageItem);
    chatDisabled[user.name] = true;
});

chatSock.on("receive:message", addMessage);

function addMessage(message) {
    let messageItem = "<li class = 'message'>" +
        "<img class = 'message-sender' src='" + message.sender.img + "' />" +
        "<div class = 'message-content'> " + message.message + "</div>" +
        "</li>"
    $("#messages-area").append(messageItem);
}

function startChat(chatData) {
    $("#chat-header-anchor").html("Chat between " + chatData.from + " and " + chatData.to);
    $("#chat-area").show();
}

function clearChat() {
    $("#chat-area").hide();
    $("#message-input-text").val('');
    $("#messages-area").empty();
}

$("#chat").on('click', 'i#close-chat-area', function() {
    clearChat();
    chatSock.emit("close:chat", user);
});

$(document).keypress(function(e) {
    if (e.which == 13) {
        let message = $("#message-input-text").val();
        if (!/^\s*$/.test(message)) {
            let messagePacket = { sender: user, message: message };
            chatSock.emit("post:message", messagePacket);
            addMessage(messagePacket);
            $("#message-input-text").val("");
        }
    }
});

function sendChatMessage() {
    let message = $("#message-input-text").val();
    console.log(message);
}

$(".card-container").on('click', 'li.card > i', displayCardLocation);

function displayCardLocation(item) {
    let lat = notification.currentTarget.dataset.lat;
    let lon = notification.currentTarget.dataset.lon;

    //james
}

function renderNotifications(notifications) {
    notifications = notifications.map(x => "<li class='notification' id='notification-" + x.itemID + "'> Matched with " +
        "<div>" + x.from.name + " for " + x.title + "</div>" +
        "<img class='notification-image' src='" + x.from.img + "' " +
        "data-id='" + x.itemID + "' data-name='" + x.from.name + "' />" +
        "<i class='dismiss-notification fa fa-times' data-id='" + x.itemID + "'></i>" +
        "</li>")
    $("#notification-hook").html(notifications)
}

$("#notification-hook").on('click', 'li.notification > img', notificationClicked)
$("#notification-hook").on('click', 'li.notification > .dismiss-notification', notificationDismissed)

function notificationClicked(notification) {
    let name = notification.currentTarget.dataset.name
    if (!name in chatDisabled || !chatDisabled[name]) {
        let chatData = { from: user.name, to: name }
        chatSock.emit("start:chat", chatData);
        startChat(chatData)
    }
}

function notificationDismissed(notification) {
    let listID = notification.currentTarget.dataset.id
    $("#notification-hook > #notification-" + listID).remove()
}

$("#panelSlide").jTinder({
    // dislike callback
    onDislike: function(item) {
        $('#status').html('Dislike image ' + (item.index() + 1));
    },
    // like callback
    onLike: function(item) {
        let card = item[0];
        notificationSock.emit("match:card", {
            from: user,
            itemID: card.dataset.id,
            title: $(card)[0].children[1].children[0].innerHTML
        });
        $('#status').html('Like image ' + (item.index() + 1));
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

$(".card-text").on('click', "#showCardMap", function(item) {
    let lat = item.currentTarget.dataset.lat
    let lon = item.currentTarget.dataset.lon
    $("#map-modal").toggle()
    $(".background-shader").show()
    showMap(lat, lon, 14)
})

$("#show-map").click(function() {
    $("#map-modal").toggle()
    $(".background-shader").show()
    createMap(currLat, currLon, 14)
})

$("#close-upload-modal").click(function() {
    $("#card-upload-modal").hide()
})

$("#close-map-modal").click(function() {
    $("#map-modal").hide()
})

let image;

Dropzone.options.imageUploadZone = {
    acceptedFiles: "image/*",
    maxFilesize: 10, // MB
    autoProcessQueue: false,
    dictDefaultMessage: "Upload images here",
    init: function() {
        let submitButton = document.querySelector("#submit-card")
        myDropzone = this; // closure
        submitButton.addEventListener("click", function() {
            myDropzone.processQueue(); // Tell Dropzone to process all queued files.
            let title = $('#card-modal-title-form').val();
            let description = $('#card-modal-desc-form').val();
            // console.log(image);
            // let asdf = document.getElementById('card-uploader');
            // asdf.innerHTML = "<img src=" + image + "></img>";
            createCard(userID, title, image, description, lat, lon, address);


        });
        // You might want to show the submit button only when
        // files are dropped here:
        this.on("addedfile", function(data) {
            // Show submit button here and/or inform user to click it.
            // console.log(data);
            let reader = new FileReader();
            reader.onload = function() {
                let dataURL = reader.result;
                let output = document.getElementById('output');
                image = dataURL;
            };
            reader.readAsDataURL(data);


        });
    }
};