import React from "react";     
import io from 'socket.io-client';
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
let socket = io('localhost:3000');

import Chat from "../components/Chat.jsx";
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";

class Body extends React.Component{
    constructor(props) {
      super(props);
      console.log(this.props.app_props)
      this.state = {
            profile  : this.props.app_props.user,
            room     : this.props.app_props.room,
            buyer    : '',
            seller   : '',
            messages : []
      }
    }
    componentDidMount(){
        socket.emit('join:class_room', this.state.room.id);
        socket.on('load:chat_messages', this.loadMessages.bind(this));
    	socket.on('new:chat_message', this.receiveMessage.bind(this));
    }
    loadMessages(data){
        this.setState({
            name     : data.name,
            buyer    : data.buyer,
            seller   : data.seller,
            messages : data.messages
        })
    }
 	receiveMessage(message){        
        var newMessageArray = this.state.messages.slice();    
        newMessageArray.push(message);   
        this.setState({
        	messages: newMessageArray
        });     
    }
	postMessage(message){        
        this.receiveMessage(message);
		socket.emit('send:chat_message', {
		    message: message
		});
	}
	render(){
    	return (
			<div>
                <NavBar profile = { this.state.profile } /> 
				<Chat messages = {this.state.messages} 
                  postMessage = {this.postMessage.bind(this)}/>
			</div>
     	)
  	}
}

export default Body;