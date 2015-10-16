import React from "react";     
import io from 'socket.io-client';
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
let socket = io('localhost:3000');

import Chat from "../components/Chat.jsx";

class Body extends React.Component{
    constructor() {
      super();
      this.state = {
            name     : '',
            buyer    : '',
            seller   : '',
            messages : []
      }
    }
    componentDidMount(){
        //socket.emit('join', this.props.room.id);
        socket.on('load:chat_messages', this.loadMessages);
    	socket.on('new:chat_message', this.receiveMessage);
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
			<div id="container">
				<Chat messages = {this.state.messages} 
                  postMessage = {this.postMessage.bind(this)}/>
			</div>
     	)
  	}
}

export default Body;