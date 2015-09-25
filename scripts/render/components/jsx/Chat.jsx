/** @jsx React.DOM */
var React = require('react/addons'),
    io = require('socket.io-client'),
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
    socket = io('localhost:3000');
    
var Message = React.createClass({
    render: function(){
      return(
        <li className = "message">
          {this.props.sender === this.props.buyer ? 
            <p className="messageBuyer">{this.props.sender}</p> : 
            <p className="messageSeller">{this.props.sender}</p>} : {this.props.text}          
        </li>
      )
    }
});

var MessageList = React.createClass({
  render: function(){
    var renderMessage = function(message, i){
      return <Message key = {i} sender = {message.sender} text = {message.message} buyer = {this.props.buyer}/>
    }
    return (
      <ul id="messages" className="chatArea">
        {this.props.messages.map(renderMessage)} 
      </ul>
    );
  }
});

var MessageInputForm = React.createClass({
    getInitialState: function(){
      return {
        message: ''
      };
    },
    handleChange: function(evt) {
      this.setState({
        message: evt.target.value
      });
    },
    handleSubmit : function(e){
      if(/\S/.test(this.state.message)){
        this.props.postMessage(this.state.message);    
      }
      this.setState({
        message: ""
      });
    },
    handleKeyDown: function(evt) {
      if (evt.keyCode == 13 ) {
        return this.handleSubmit(evt);
      }
    },
    render : function(){
      return (
        <textarea id="messageInput" type="text" placeholder="Type to chat" className="chatArea"
         onChange = {this.handleChange} value = {this.state.message} onKeyDown={this.handleKeyDown}>
        </textarea>
      )
    }
});

var Chat = React.createClass({
  render : function(){
    return (
        <div id="chatArea">
          <MessageList messages = {this.props.messages} buyer = {this.props.buyer}/>
          <MessageInputForm postMessage = {this.props.postMessage}/>
        </div>
    )
  }
});

module.exports = Chat;