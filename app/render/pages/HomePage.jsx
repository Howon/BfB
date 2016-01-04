import React from "react";
import io from 'socket.io-client';

let socket = io(window.location.host);
let courseSock = io(window.location.host + "/course")

import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";
import Calendar from "../components/Calendar.jsx";
import NotifIcatIonContainer from "../components/Notification.jsx";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile : this.props.app_props.user,
      calendar : [],
      notifications: ["1", "2", "3", "4", "5", "6"]
    }
  }
  componentDidMount(){
    courseSock.emit("get:courses", this.state.profile.id);
    socket.emit("get:notifications");
    courseSock.on("update:calendar",
      this.receiveCalendar.bind(this)
    );
    socket.on("update:notifications",
      this.receiveNotifications.bind(this)
    );
    socket.on("receive:notification",
      this.receiveNotification.bind(this)
    );
  }
  receiveCalendar(data){
    this.setState({
      calendar : data.calendar
    });
  }
  receiveNotifications(notifications){
    this.setState({
      notifications : notifications
    })
  }
  receiveNotification(notification){
    var newNotificationArray = this.state.notifications.slice();
    newNotificationArray.push(notification);
    this.setState({
      notifications: newNotificationArray
    })
  }
  uploadCalendar(e){
    var reader = new FileReader();
    var file = e.target.files[0];

    var jsonObject = {
      'uploader' : this.state.profile.id,
      'calendarData': file
    }
    courseSock.emit('upload:calendar', jsonObject);
    reader.readAsBinaryString(file);
  }
  render(){
    return (
      <div>
        <NavBar name = { this.state.profile.name }
          uploadCalendar = { this.uploadCalendar.bind(this) } />
        <SideBar uploadCalendar = { this.uploadCalendar.bind(this) } />
        <Calendar calendar = { this.state.calendar } />
        <NotifIcatIonContainer notifications = { this.state.notifications } />
      </div>
    )
  }
}

export default Body;