import React from "react";     
import io from 'socket.io-client';
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
let socket = io('localhost:3000');
    
class Message extends React.Component {    
    render(){
      return(
        <li className = "message">
          {this.props.sender === this.props.buyer ? 
            <p className="messageBuyer">{this.props.sender}</p> : 
            <p className="messageSeller">{this.props.sender}</p>} : {this.props.text}          
        </li>
      )
    }
};

class MessageList extends React.Component {    
  renderMessage(message, i){
      return <Message key = {i} sender = {message.sender} text = {message.message} buyer = {this.props.buyer}/>
  }
  render(){    
    return (
      <ul id="messages" className="chatArea">
        {this.props.messages.map(this.renderMessage)} 
      </ul>
    );
  }
};

class MessageInputForm extends React.Component {    
    constructor(){      
        super();
        this.state = {
          message: ''
        }
    }
    handleChange(evt) {
      this.setState({
        message: evt.target.value
      });
    }
    handleSubmit(e){
      if(/\S/.test(this.state.message)){
        this.props.postMessage(this.state.message);    
      }
      this.setState({
        message: ""
      });
    }
    handleKeyDown(evt) {
      if (evt.keyCode == 13 ) {
        return this.handleSubmit(evt);
      }
    }
    render(){
      return (
        <textarea id="messageInput" type="text" placeholder="Type to chat" className="chatArea"
         onChange = {this.handleChange} value = {this.state.message} onKeyDown={this.handleKeyDown}>
        </textarea>
      )
    }
};

class Chat extends React.Component {
  render() {
    return (
        <div id="chatArea">
          <MessageList messages = {this.props.messages} buyer = {this.props.buyer}/>
          <MessageInputForm postMessage = {this.props.postMessage}/>
        </div>
    )
  }
};

export default Chat;