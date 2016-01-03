import React from "react";

import ChannelArea from "../components/Channel.jsx";

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
    let renderMessage = function(message, i){
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
  constructor(props){
    super(props);
    this.state = {
      displayChannels : false
    }
  }
  toggleDisplayChannels(){
    this.setState({
      displayChannels : this.props.showPostInput ? false : true
    })
  }
  render() {
    return (
      <div id = "chat-area">
        <ChannelArea currentChannel = { this.props.currentChannel }
          channels = { this.props.channels }
          makeChannel = { this.props.makeChannel.bind(this) }
          joinChannel = { this.props.joinChannel } />
        <MessageList messages = { this.props.messages } />
        <MessageInputForm profile = { this.props.profile }
          postMessage = { this.props.postMessage } />
      </div>
    )
  }
};

export default Chat;