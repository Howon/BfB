import React from "react";     
import io from 'socket.io-client';

class Notification extends React.Component {
	render(){
		return(
			<li className = "class_menu_bar_li">
				{ this.props.data }
			</li>
		)
	}
}

class Menu extends React.Component {
	render(){
		var events = this.props.notifications.map(function(message, i) {
      return <Notification key={ i } data={ message }/>;
    });
		return (
			<div id = "class_menu_bar">
				<ul id = "class_menu_bar_list">
				  { events }			
				</ul>
			</div>
		)
	}
}

class ClassMenuBar extends React.Component {
	render(){
		return (
			<Menu notifications = { this.props.notifications }/>
		)
	}
}

export default ClassMenuBar;