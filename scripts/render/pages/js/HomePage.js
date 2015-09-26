/** @jsx React.DOM */
var React = require('react/addons'),    
    io = require('socket.io-client');
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
    // socket = io('localhost:3000');

var Body = React.createClass({displayName: "Body",
    getInitialState: function(){
        return {
            file : ''
        }
    },
    handleSubmit : function(e){
      var file = e.target.files[0];
      var reader = new FileReader();
      console.log(file);       
    },
    render : function(){
        return (
            React.createElement("div", null, 
                React.createElement("div", null, "Hello World"), 
                React.createElement("input", {type: "file", name: "file", ref: "file", accept: ".ics", onChange: this.handleSubmit})
            )
        )
    }
});

module.exports = Body