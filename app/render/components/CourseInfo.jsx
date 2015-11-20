import React from "react";     

import Chat from "./Chat.jsx";

function calenDate(icalStr)  { 
  let strYear = icalStr.substr(0,4);
  let strMonth = parseInt(icalStr.substr(4,2), 10) - 1;
  let strDay = icalStr.substr(6,2);
  let strHour = icalStr.substr(9,2);
  let strMin = icalStr.substr(11,2);
  let strSec = icalStr.substr(13,2);

  let oDate =  new Date(strYear, strMonth, strDay, strHour, strMin, strSec)
  return oDate;
}

let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

class CourseTime extends React.Component {        
  render(){
    let times;
    if(this.props.meetingTimes){
        times = this.props.meetingTimes.map(function(time){
        let startTime = calenDate(time.startTime);
        let endTime = calenDate(time.endTime);
        let day = days[startTime.getDay()];
        let duration = startTime.getHours() + ":" + startTime.getMinutes() + " - " + endTime.getHours() + ":" + startTime.getMinutes();  
        return <p className = "courseTime"> { day + " " + duration } </p>
      });
    }
    return(
      <div className = "courseTime">
        { times }   
      </div>
    )
  }
};

class CourseInfo extends React.Component {
  render() {
    return (
      <div id = "courseInfo"> 
        <div id = "courseSummary">
          <p id = "courseName"> { this.props.courseInfo.summary } </p>
          <p id = "courseLocation"> { this.props.courseInfo.location } </p>
          <CourseTime meetingTimes = { this.props.courseInfo.meetingTimes }/>
        </div>
        <Chat messages = { this.props.messages } 
          postMessage = { this.props.postMessage } />
      </div>
    )
  }
};

export default CourseInfo;