import React from "react";     
import io from 'socket.io-client';
let socket = io(window.location.host);

import Announcement from "../components/Announcement.jsx";  
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";  
import ClassInfo from "../components/ClassInfo.jsx";  

class Body extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      profile       : this.props.app_props.user,
      room          : this.props.app_props.room.id,
      classInfo     : [],
      announcements : [],
      messages      : []
    }
  }
  componentDidMount(){        
      socket.emit('enter:class_room', this.state.room);
      socket.on('receive:class_data', this.receiveCourseData.bind(this));
    	socket.on('receive:chat_message', this.receiveMessage.bind(this)); 
      socket.on('receive:announcement', this.receiveAnnouncement.bind(this));    
  }
 	receiveMessage(message){        
    var newMessageArray = this.state.messages.slice();    
    newMessageArray.push(message);   
    this.setState({
    	messages: newMessageArray
    });     
  }
  receiveCourseData(data){    
    this.setState({
      classInfo      : data.course,
      announcements  : data.courseData.announcements,
      messages       : data.courseData.messages    
    })        
  }
	postMessage(message){        
    message.sender = this.state.profile.name,
    this.receiveMessage(message);        
		socket.emit('post:chat_message', message);
	}
  postAnnouncement(data){
    var announcement = data;
    announcement.poster = this.state.profile.name;
    announcement.time = new Date();
    this.receiveAnnouncement(announcement);
    socket.emit('post:announcement', announcement);
  }
  receiveAnnouncement(announcement){  
    var newAnnouncementArray = this.state.announcements.slice();    
    newAnnouncementArray.push(announcement);   
    this.setState({
      announcements: newAnnouncementArray
    });     
  }
  uploadCalendar(e){
    var reader = new FileReader();
    var file = e.target.files[0];

    var jsonObject = {
      'uploader' : this.state.profile.id,
      'calendarData': file
    }
    socket.emit('upload:calendar', jsonObject);
    reader.readAsBinaryString(file);
    window.location = "/home"
  }
	render(){
  	return (
		<div>
      <SideBar profile = { this.state.profile } 
        uploadCalendar = { this.uploadCalendar.bind(this) } />
      <NavBar profile = { this.state.profile } /> 
      <div id="contentArea">
        <ClassInfo classInfo = { this.state.classInfo } 
          messages = { this.state.messages } 
          postMessage = { this.postMessage.bind(this) } />
        <Announcement announcements = { this.state.announcements } 
          postAnnouncement = { this.postAnnouncement.bind(this) } />
      </div>
		</div>
   	)
  }
}

export default Body;