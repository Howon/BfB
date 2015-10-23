import React from "react";     
import io from 'socket.io-client';
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
let socket = io('localhost:3000');

import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";
import Calendar from "../components/Calendar.jsx";
import ClassMenuBar from "../components/ClassMenuBar.jsx";

class Body extends React.Component {    
    constructor(props) {
      super(props);
      this.state = {
        profile : this.props.user_profile,
        calendar : [],
        classNotifications: ["1", "2", "3", "4", "5", "6"]
      }
    }
    componentDidMount(){      
      socket.on("receive:calendar",
        this.receiveCalendar.bind(this)
      );
      socket.on("receive:classNotification",
        this.receiveClassNotification.bind(this)
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
    render(){
      return (
        <div>
          <SideBar profile = { this.state.profile } />
          <NavBar profile = { this.state.profile } /> 
          <Calendar calendar = { this.state.calendar } />
          <ClassMenuBar notifications = { this.state.classNotifications}/>
        </div>
      )
    }
}

//<img id = "background" src = '/images/raymond.jpg' />

export default Body;

