/** @jsx React.DOM */
var React = require('react/addons');

var Home = React.createClass({
  render : function(){
    return (
        <div id="eventHome">
          <div id="title" className="eventHome">            
          </div>
          <div id="picture" className="eventHome">           
          </div>
          <div id="time" className="eventHome">
          </div>
          <div id="location" className="eventHome">            
          </div>
          <div id="description" className="eventHome"></div>
        </div>
    )
  }
});

module.exports = Home;