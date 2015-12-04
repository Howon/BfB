import React from "react";     

class Channel extends React.Component {
  switchChannel(){
    this.props.switchChannel(this.props.channel.name);
  }
  render(){
    return ( 
      <li className = "channels-list-item" onClick = { this.switchChannel.bind(this) } > 
        { this.props.channel.name } 
      </li>
    )
  }
}

class ChannelSubmitForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newChannelName : "",
      newChannelDesc : ""
    }
  }
  handleChannelNameChange(evt) {
    evt.preventDefault();            
    this.setState({
      newChannelName: evt.target.value
    });
  }
  handleChannelDescChange(evt) {
    evt.preventDefault();            
    this.setState({
      newChannelDesc: evt.target.value
    }); 
  }
  submitChannelForm(){
    if(/\S/.test(this.state.newChannelName)){
      this.props.submitChannelForm({
        name : this.state.newChannelName, 
        desc : this.state.newChannelDesc
      });
    }

    this.props.toggleChannelForm();
    
    this.setState({
      newChannelName : "",
      newChannelDesc : ""
    });
  }
  render(){
    let displayStatus = { 
        display : this.props.showChannelForm ? "block" : "none"
    };
    return(
      <div>
        <div style = { displayStatus } id = "channel-form-shader">
        </div>
        <div style = { displayStatus } id = "channel-form">
          <p> Create a new channel </p>
           <textarea id = "channel-name-input" className = "channel-input-form"
            type = "text" 
            placeholder = "Enter name of this channel"
            onChange = { this.handleChannelNameChange.bind(this) } 
            value = { this.state.newChannelName } ></textarea>
           <textarea id = "channel-desc-input" className = "channel-input-form"
            type = "text" 
            placeholder = "Describe this channel"
            onChange = { this.handleChannelDescChange.bind(this) } 
            value = { this.state.newChannelDesc } ></textarea>
          <i id = "submit-channel-form" className = "fa fa-check" 
            onClick = { this.submitChannelForm.bind(this) } ></i>
          <i id = "close-channel-form" className = "fa fa-times" 
            onClick = { this.props.toggleChannelForm.bind(this) } ></i>
        </div>  
      </div>
    )
  }
}

class Channels extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showChannelForm : false
    }
  }
  switchChannel(channelName){
    this.props.switchChannel(channelName);
  }
  toggleChannelForm(){
    this.setState({
      showChannelForm : this.state.showChannelForm ? false : true
    })      
  }
  submitChannelForm(newChannelData){
    this.props.makeChannel(newChannelData);
  }
  render() {   
    console.log(this.props.channels)
    let channels = this.props.channels.map(function(channel, i){
      return (
        <Channel key = { i } channel = { channel } switchChannel = { this.switchChannel.bind(this) }/>
      );
    }, this); 
    
    return(
      <div id = "channels-area">
        <div id = "channels-menu">
          <span id = "channel-current-channel">
            { this.props.currentChannel }    
          </span>
          <i id = "channel-add-button" className = "fa fa-plus"
            onClick = { this.toggleChannelForm.bind(this) } ></i>           
          <ChannelSubmitForm showChannelForm = { this.state.showChannelForm } 
            toggleChannelForm = { this.toggleChannelForm.bind(this) } />
          <ChannelSubmitForm showChannelForm = { this.state.showChannelForm }
            toggleChannelForm = { this.toggleChannelForm.bind(this) } 
            submitChannelForm = { this.submitChannelForm.bind(this) }/>
        </div>
        <ul id = "channels-list">
          { channels }
        </ul>
      </div>
    )
  }
}

class Message extends React.Component {    
  render(){
    return(
      <li className = "message">      
        <div className = "message-sender"> { this.props.sender } </div>
        <div className = "message-content"> { this.props.content } </div>
      </li>
    )
  }
};

class MessageList extends React.Component {    
  render(){    
    var renderMessage = function(message, i){
      return <Message key = { i } sender = { message.sender } content = { message.content } />
    }
    return (
      <ul id = "messages-area" className = "chat-area-component">
        { this.props.messages.map(renderMessage) } 
      </ul>
    );
  }
};

class MessageInputForm extends React.Component {    
  constructor(props){      
    super(props); 
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
      this.props.postMessage({
        content : this.state.message
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
      <div id = "message-input-area" className = "chat-area-component">
        <textarea id = "message-input-text" 
          type = "text" 
          placeholder = "Type to chat"
          onChange = { this.handleChange.bind(this) } 
          value = { this.state.message } 
          onKeyDown = { this.handleKeyDown.bind(this) }>
        </textarea>
        <i id = "message-input-button" className = "fa fa-paper-plane-o"
          onClick = { this.handleSubmit.bind(this) }>
        </i>
      </div>
    )
  }
};

class Chat extends React.Component {
  render() {
    return (
      <div id = "chat-area">
        <Channels currentChannel = { this.props.currentChannel }
          channels = { this.props.channels }
          makeChannel = { this.props.makeChannel.bind(this) } 
          switchChannel = { this.props.switchChannel }/>
        <MessageList messages = { this.props.messages } />
        <MessageInputForm profile = { this.props.profile } 
          postMessage = { this.props.postMessage } />
      </div>
    )
  }
};

export default Chat;