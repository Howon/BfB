import React from "react";     
import io from 'socket.io-client';

class Notification extends React.Component {
	render(){
		return(
			<li className = "notification-bar-item">
				{ this.props.data }
			</li>
		)
	}
}

class NotificationList extends React.Component {
	render(){
	  let  events = this.props.notifications.map(function(message, i) {
      return <Notification key={ i } data={ message }/>;
    });
		return (
			<div id = "notification-bar">
				<ul id = "notification-bar-list">
				  { events }			
				</ul>
			</div>
		)
	}
}

class NotificationContainer extends React.Component {
	render(){
		return (
			<NotificationList notifications = { this.props.notifications }/>
		)
	}
}

export default NotificationContainer;