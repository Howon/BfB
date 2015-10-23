// from alan

import React from "react";  

function formatTime(d) {
  var timeString = "";
  var hour = d.getHours();

  timeString += hour % 12 || 12;

  // Humanize minutes.
  if (d.getMinutes() < 10) {
    timeString += ":0" + d.getMinutes();
  }
  else {
    timeString += ":" + d.getMinutes();
  }

  return timeString;
}

function calenDate(icalStr)  { 
  var strYear = icalStr.substr(0,4);
  var strMonth = parseInt(icalStr.substr(4,2), 10) - 1;
  var strDay = icalStr.substr(6,2);
  var strHour = icalStr.substr(9,2);
  var strMin = icalStr.substr(11,2);
  var strSec = icalStr.substr(13,2);

  var oDate =  new Date(strYear,strMonth, strDay, strHour, strMin, strSec)
  return oDate;
}

function AMPM(d) {
  // Determine whether the time is AM or PM.
  return d.getHours() < 12 ? "AM" : "PM";
}

class Course extends React.Component {
  render() {
    let temp = this.props.data;
    let startTime = calenDate(temp.startTime);
    let endTime = calenDate(temp.endTime);

    let differenceMin = Math.round((endTime - startTime) / 60000);    

    let classHeight = 40.0 * (differenceMin / 60.0);    
    let classTopOffset = Math.floor(40*((startTime.getHours() - 7) + (startTime.getMinutes() / 60.0)));

    let blockStyle = { 
        height : classHeight,
        top    : classTopOffset 
    };

    let timeString = formatTime(startTime) + AMPM(startTime);
    timeString += " \u2013 " + formatTime(endTime) + AMPM(endTime);

    return (
      <div className="calendar_course_item" style = { blockStyle }>
          { temp.className } <br />
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    var courses = this.props.courses.map(function(evt, i) {
      return <Course key = { i } data = { evt }/>;
    });

    return (
      <td className="calendar_day">
        { courses }
      </td>
    );
  }
}

class Week extends React.Component {
  render() {
    let coursesArr = [[], [], [], [], []];
    let tempCal = this.props.calendar;

    for(let i = 0; i < tempCal.length; i++){      
      let meetingTimes = tempCal[i].meetingTimes;
      for(let j = 0; j < meetingTimes.length; j++){
        let day = calenDate(meetingTimes[j].startTime).getDay() - 1;
        let tempCourse = {
          id        : tempCal[i]._id,
          className : tempCal[i].summary,
          location  : tempCal[i].location,
          startTime : meetingTimes[j].startTime,
          endTime   : meetingTimes[j].endTime
        }     
        coursesArr[day].push(tempCourse);
      }      
    }

    var days = coursesArr.map(function(courses, i) {
      return <Day key={ i } courses = { courses }/> ;
    });

    return (
      <tr className = "calendar_week">
          { days }
      </tr>
    );
  }
}

class Calendar extends React.Component { 
  render() {
    var hours = [];
    for (var i = 8; i < 23; i++){
      var time = "";
      if (i <= 11){
        time = i + "am";
      } else if (i == 12){
        time = i + "pm";
      } else {
        time = i - 12 + "pm";
      }
      hours.push(<li className = "time_bar_hour">{ time }</li>);
    }
    return (      
      <div id = "calendar">
        <ul id = "time_bar"> 
          { hours } 
        </ul>
        <table className="calendar_area">        
          <thead>          
            <td className = "calendar_week_day"> Monday </td>
            <td className = "calendar_week_day"> Tuesday </td>
            <td className = "calendar_week_day"> Wednesday </td>
            <td className = "calendar_week_day"> Thursday </td>
            <td className = "calendar_week_day"> Friday </td>
          </thead>
          <Week calendar = {this.props.calendar} />
        </table>
      </div>
    );
  }    
}

export default Calendar;