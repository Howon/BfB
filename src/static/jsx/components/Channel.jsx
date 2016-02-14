import React from "react";

class Channel extends React.Component {
  joinChannel(){
    this.props.joinChannel(this.props.channel.name);
  }
  render(){
    let channelSelect = this.props.currentChannel === this.props.channel.name ? "channels-list-item active" : "channels-list-item";
    let channelName = this.props.channel.name;
    if(channelName.length > 15){
      channelName = channelName.substring(0, 15) + "...";
    }

    return (
      <li className = { channelSelect }
        onClick = { this.props.joinChannel.bind(this, this.props.channel.name) } >
        { channelName }
      </li>
    )
  }
}

class ChannelSubmitForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newChannelName : "",
      newChannelDesc : "",
      titleWarning : false,
      titleWarningMessage : ""
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
  toggleChannelForm(){
    this.props.toggleChannelForm();
    this.setState({
      newChannelName : "",
      newChannelDesc : "",
      titleWarning : false,
      titleWarningMessage : ""
    });
  }
  makeChannel(){
    let newChannelName = this.state.newChannelName.trim();
    if(!/\S/.test(newChannelName)){
      console.log("here")
      this.setState({
        titleWarning : true,
        titleWarningMessage : "Please enter new channel name"
      });
    } else if (this.props.channelList.indexOf(newChannelName) > 0){
      this.setState({
        titleWarning : true,
        titleWarningMessage : "This channel exists already!"
      });
    } else {
      this.props.makeChannel({
        name : newChannelName,
        desc : this.state.newChannelDesc,
        messages : []
      });

      this.toggleChannelForm();
    }
  }
  render(){
    let displayStatus = {
      display : this.props.displayChannelForm ? "block" : "none"
    };

    let displayWarning = {
      display : this.state.titleWarning ? "block" : "none"
    };

    return(
      <div id = "channel-form-area" style = { displayStatus } >
        <div id = "channel-form-shader" className = "page-shader" >
        </div>
        <div id = "channel-form" className = "input-form" >
          <div id = "channel-input-form-title" className = "form-title" >
              New Channel
            </div>
          <textarea id = "channel-name-input" className = "channel-input-form"
            type = "text"
            placeholder = "Name this channel!"
            onChange = { this.handleChannelNameChange.bind(this) }
            value = { this.state.newChannelName } ></textarea>
          <textarea id = "channel-desc-input" className = "channel-input-form"
            type = "text"
            placeholder = "What is it for?"
            onChange = { this.handleChannelDescChange.bind(this) }
            value = { this.state.newChannelDesc } ></textarea>
          <div style = { displayWarning } className = "form-warning"
            id = "channel-title-warning">
            { this.state.titleWarningMessage }
          </div>
          <i id = "close-channel-form" className = "fa fa-times button-close-form"
            onClick = { this.toggleChannelForm.bind(this) } >
          </i>
          <span id = "submit-channel-form" className = "button-submit-form"
            onClick = { this.makeChannel.bind(this) } >
            make
          </span>
        </div>
      </div>
    )
  }
}

class ChannelArea extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayChannelForm : false
    }
  }
  joinChannel(channelName){
    this.props.joinChannel(channelName);
  }
  toggleChannelForm(){
    this.setState({
      displayChannelForm : !this.state.displayChannelForm
    })
  }
  makeChannel(newChannelData){
    this.props.makeChannel(newChannelData);
  }
  render() {
    let channels = this.props.channels.map(function(channel, i){
      return (
        <Channel key = { i } currentChannel = { this.props.currentChannel } channel = { channel } joinChannel = { this.joinChannel.bind(this) }/>
      );
    }, this);

    let channelFormToggle = "show-channel-form"
    if(this.state.displayChannelForm){
      channelFormToggle += " active"
    };

    return(
      <div id = "channels-area">
        <div id = "channels-menu">
          <span id = "channels-menu-area">
            channels
          </span>
          <i id = "channel-add-button" className = { "fa fa-plus" + " " + channelFormToggle }
            onClick = { this.toggleChannelForm.bind(this) } ></i>
          <ChannelSubmitForm displayChannelForm = { this.state.displayChannelForm }
            channelList = { this.props.channels.map(x => x.name) }
            toggleChannelForm = { this.toggleChannelForm.bind(this) }
            makeChannel = { this.makeChannel.bind(this) }/>
        </div>
        <ul id = "channels-list">
          { channels }
        </ul>
      </div>
    )
  }
}

export default ChannelArea;