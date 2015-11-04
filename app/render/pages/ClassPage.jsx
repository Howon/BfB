import React from "react";     
import io from 'socket.io-client';
let socket = io(window.location.host);

import Chat from "../components/Chat.jsx";
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";
import crypto from 'crypto'; 

class Body extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
            profile  : this.props.app_props.user,
            room     : this.props.app_props.room.id,
            messages : []
      }
    }
    componentDidMount(){        
        socket.emit('enter:class_room', this.state.room);
        socket.on('receive:user_course', this.receiveCourseData.bind(this));
    	socket.on('receive:chat_message', this.receiveMessage.bind(this));    
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
            messages : data.courseData.messages
        })        
    }
	postMessage(message){        
        this.receiveMessage(message);        
		socket.emit('send:chat_message', message);
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
    }
	render(){
    	return (
			<div>
                <SideBar profile = { this.state.profile } uploadCalendar = { this.uploadCalendar.bind(this) }/>
                <NavBar profile = { this.state.profile } /> 
				<Chat profile = { this.state.profile } messages = { this.state.messages } postMessage = { this.postMessage.bind(this) }/>
			</div>
     	)
  	}
}

export default Body;