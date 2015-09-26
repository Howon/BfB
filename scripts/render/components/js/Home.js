/** @jsx React.DOM */
var React = require('react/addons');

var Home = React.createClass({displayName: "Home",
  render : function(){
    return (
        React.createElement("div", {id: "eventHome"}, 
          React.createElement("div", {id: "title", className: "eventHome"}
          ), 
          React.createElement("div", {id: "picture", className: "eventHome"}
          ), 
          React.createElement("div", {id: "time", className: "eventHome"}
          ), 
          React.createElement("div", {id: "location", className: "eventHome"}
          ), 
          React.createElement("div", {id: "description", className: "eventHome"})
        )
    )
  }
});

module.exports = Home;