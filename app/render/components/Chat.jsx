import React from "react";     

class Channel extends React.Component {
  switchChannel(){
    this.props.switchChannel(this.props.channel.name)
  }
  render(){
    return ( 
      <li className = "channels-list-item"
        onClick = { this.switchChannel.bind(this) }> 
        { this.props.channel.name } 
      </li>
    )
  }
}

class Channels extends React.Component {
  switchChannel(channelID){
    this.props.switchChannel(channelID);
  }
  render() {   
    let channels = [];
    let that = this;
    this.props.channels.forEach(function(channel, i){
      channels.push(<Channel key = { i } channel = { channel } switchChannel = { that.props.switchChannel }/>);
    });
    return( 
      <div id = "channels-area">
        <div id = "channels-menu">
          <span id = "channel-menu-title">
            channels            
          </span>
          <i id = "channel-add-button" className = "fa fa-plus"></i> 
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
        <Channels channels = { this.props.channels } switchChannel = { this.props.switchChannel }/>
        <MessageList messages = { this.props.messages }/>
        <MessageInputForm profile = { this.props.profile } postMessage = { this.props.postMessage }/>
      </div>
    )
  }
};

export default Chat;