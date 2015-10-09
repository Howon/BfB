import React from "react";     

class Message extends React.Component {    
    render(){
      return(
        <li className = "message">
          {this.props.text}          
        </li>
      )
    }
};

class MessageList extends React.Component {    
  renderMessage(message, i){
      console.log(message)
      return <Message key = {i} text = {message} />
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
      evt.preventDefault();
            
      this.setState({
        message: evt.target.value
      });
    }
    handleSubmit(e){
      if(/\S/.test(this.state.message)){
        this.props.postMessage(this.state.message);    
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
          <MessageList messages = {this.props.messages}/>
          <MessageInputForm postMessage = {this.props.postMessage}/>
        </div>
    )
  }
};

export default Chat;