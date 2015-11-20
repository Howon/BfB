Websocket syntax
---

Chat Message
```bash
socket.on('receive:chat_message') // receive a new chat message in a class
socket.emit('post:chat_message')  // post a new chat message
{
	sender : String,
	message: String
}
```

Announcement
```bash
socket.on('receive:announcement') // receive a new announcement in a class
socket.emit('post:announcement')  // post a new announcement
{
	poster  : String,
	content : String,
	time    : Date
}
```

Course Data
```bash
socket.on('get:course_data') // get data for a class (messages, announcements, etc)
{
	announcements: [announcement],
	messages: [message]
}
```

Course
```bash
{
	classID		 : String,
	meetingTimes : {},
	summary      : String,
	location	 : String,
	color 		 : String,
	subscribers  : [String],
	courseDataRef: String
}
```

Notification
```bash
socket.on("get:notifications")	  // fetch notifications for individual user on loginretrieves noti
socket.on("update:notifications") // update notifications
socket.on("receive:notification") // receieve a new notification from classes
{
	courseID: String,
	content: String,
	time: Date,
	checked: Boolean
}
```

User
```bash
{
	token: String,	
	info: {
		name: String,
		email: String
	},
	courseRefs: [String]
}
```





