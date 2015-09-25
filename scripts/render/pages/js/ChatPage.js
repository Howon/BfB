/** @jsx React.DOM */
var React = require('react/addons'),    
    io = require('socket.io-client'),
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
    socket = io('localhost:3000');


var Chat = require('../../components/js/Chat')

var Body = React.createClass({displayName: "Body",
    getInitialState: function(){
    	return {
            name     : '',
            buyer    : '',
            seller   : '',
    		messages : []
    	};
    },
    componentDidMount: function(){
        socket.emit('join', this.props.room.id);
        socket.on('load:chat_messages', this.loadMessages);
    	socket.on('new:chat_message', this.receiveMessage);
    },
    loadMessages : function(data){
        this.setState({
            name     : data.name,
            buyer    : data.buyer,
            seller   : data.seller,
            messages : data.messages
        })
    },
 	receiveMessage: function(message){
        var newMessageArray = this.state.messages.slice();    
        newMessageArray.push(message);   
        this.setState({
        	messages: newMessageArray
        });     
    },
	postMessage: function(message){
        this.receiveMessage(message);
		socket.emit('send:chat_message', {
		    message: message
		});
	},
	render : function(){
    	return (
			React.createElement("div", {id: "container"}, 
				React.createElement(Chat, {messages: this.state.messages, buyer: this.state.buyer, postMessage: this.postMessage})
			)
     	)
  	}
});

module.exports = Body