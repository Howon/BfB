/** @jsx React.DOM */
var React = require('react/addons'),
    io = require('socket.io-client'),
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
    socket = io('localhost:3000');
    
var Message = React.createClass({displayName: "Message",
    render: function(){
      return(
        React.createElement("li", {className: "message"}, 
          this.props.sender === this.props.buyer ? 
            React.createElement("p", {className: "messageBuyer"}, this.props.sender) : 
            React.createElement("p", {className: "messageSeller"}, this.props.sender), " : ", this.props.text
        )
      )
    }
});

var MessageList = React.createClass({displayName: "MessageList",
  render: function(){
    var renderMessage = function(message, i){
      return React.createElement(Message, {key: i, sender: message.sender, text: message.message, buyer: this.props.buyer})
    }
    return (
      React.createElement("ul", {id: "messages", className: "chatArea"}, 
        this.props.messages.map(renderMessage)
      )
    );
  }
});

var MessageInputForm = React.createClass({displayName: "MessageInputForm",
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
        React.createElement("textarea", {id: "messageInput", type: "text", placeholder: "Type to chat", className: "chatArea", 
         onChange: this.handleChange, value: this.state.message, onKeyDown: this.handleKeyDown}
        )
      )
    }
});

var Chat = React.createClass({displayName: "Chat",
  render : function(){
    return (
        React.createElement("div", {id: "chatArea"}, 
          React.createElement(MessageList, {messages: this.props.messages, buyer: this.props.buyer}), 
          React.createElement(MessageInputForm, {postMessage: this.props.postMessage})
        )
    )
  }
});

module.exports = Chat;