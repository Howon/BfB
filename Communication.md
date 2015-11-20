Websocket syntax
---

Chat Message
```bash
socket.on('receive:chat_message')
socket.emit('post:chat_message')
{
	sender : String,
	message: String
}
```

Announcement
```bash
socket.on('receive:announcement')
socket.emit('post:announcement')
{
	poster  : String,
	content : String,
	time    : Date
}
```

Class Data
```bash
socket.on('get:course_data')
{
	announcements: [announcement],
	messages: [message]
}
```
Class
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





