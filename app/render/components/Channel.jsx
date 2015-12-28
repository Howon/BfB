import React from "react";

class Channel extends React.Component {
  joinChannel(){
    this.props.joinChannel(this.props.channel.name);
  }
  render(){
    let channelSelect = "channels-list-item";
    return (
      <li className = { channelSelect } onClick = { this.joinChannel.bind(this) } >
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

class ChannelArea extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showChannelForm : false
    }
  }
  joinChannel(channelName){
    this.props.joinChannel(channelName);
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
    let channels = this.props.channels.map(function(channel, i){
      return (
        <Channel key = { i } channel = { channel } joinChannel = { this.joinChannel.bind(this) }/>
      );
    }, this);

    return(
      <div id = "channels-area">
        <div id = "channels-menu">
          <span id = "channel-current-channel">
            channels
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

export default ChannelArea;