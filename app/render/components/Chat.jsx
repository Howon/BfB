import React from "react";     

class Message extends React.Component {    
    render(){
      return(
        <li className = "message">
          <span> {this.props.sender} : </span>      
          {this.props.text}          
        </li>
      )
    }
};

class MessageList extends React.Component {    
  renderMessage(message, i){
    return <Message key = {i} sender = { message.sender } text = { message.message } />
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
    constructor(props){      
        super(props); 
        this.state = {
          sender : this.props.profile.name,
          message: ''          
        }
    }
    handleChange(evt) {
      evt.preventDefault();            
      this.setState({
        message: evt.target.value
      });
    }
    handleSubmit(e){
      if(/\S/.test(this.state.message)){
        this.props.postMessage({
          sender  : this.state.sender,
          message : this.state.message
        });    
      }
      e.preventDefault();
      this.setState({
        message: ""
      });
    }
    handleKeyDown(evt) {
      if (evt.keyCode == 13 ) {
        this.handleSubmit(evt);
      }
    }
    render(){
      return (
        <textarea id="messageInput" type="text" placeholder="Type to chat" className="chatArea"
         onChange = {this.handleChange.bind(this)} value = {this.state.message} onKeyDown={this.handleKeyDown.bind(this)}>
        </textarea>
      )
    }
};

class Chat extends React.Component {
  render() {
    return (
        <div id="chatArea">
          <MessageList messages = { this.props.messages }/>
          <MessageInputForm profile = { this.props.profile } postMessage = { this.props.postMessage }/>
        </div>
    )
  }
};

export default Chat;