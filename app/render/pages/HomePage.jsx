import React from "react";     
import io from 'socket.io-client';
let socket = io(window.location.host);

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
        classNotifications: ["1", "2", "3", "4", "5", "6"]
      }
    }
    componentDidMount(){    
      socket.emit("get:user_courses", this.state.profile.id);  
      socket.on("receive:calendar",
        this.receiveCalendar.bind(this)
      );
      socket.on("receive:class_notification",
        this.receiveClassNotification.bind(this)
      );
      socket.on("receive:user_courses",
        this.receiveCalendar.bind(this)
      );
    }
    receiveCalendar(data){
      this.setState({
        calendar : data.calendar
      });
    }
    receiveClassNotification(message){
      var newClassNotificationArray = this.state.classNotifications.slice();    
      newClassNotificationArray.push(message);   
      this.setState({
        classNotifications: newClassNotificationArray
      })
    }
    uploadCalendar(e){
      var reader = new FileReader();
      var file = e.target.files[0];

      var jsonObject = {
          'uploader' : this.state.profile.id,
          'calendarData': file
      }
      socket.emit('upload:calendar', jsonObject);
      reader.readAsBinaryString(file);
    }
    render(){
      return (
        <div>
          <NavBar profile = { this.state.profile } /> 
          <SideBar profile = { this.state.profile } uploadCalendar = { this.uploadCalendar.bind(this) }/>
          <Calendar calendar = { this.state.calendar } />
          <NotifIcatIonContainer notifications = { this.state.classNotifications}/>
        </div>
      )
    }
}


export default Body;