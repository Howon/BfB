import React from "react";


function calenDate(icalStr)  {
  let  strYear = icalStr.substr(0,4);
  let  strMonth = parseInt(icalStr.substr(4,2), 10) - 1;
  let  strDay = icalStr.substr(6,2);
  let  strHour = icalStr.substr(9,2);
  let  strMin = icalStr.substr(11,2);
  let  strSec = icalStr.substr(13,2);

  let  oDate =  new Date(strYear, strMonth, strDay, strHour, strMin, strSec)
  return oDate;
}

class Course extends React.Component {
  render() {
    const heightOffset = 40.0;
    let temp = this.props.data;
    let startTime = calenDate(temp.startTime);
    let endTime = calenDate(temp.endTime);

    let differenceMin = Math.round((endTime - startTime) / 60000);

    let courseHeight = heightOffset * (differenceMin / 60.0);
    let courseTopOffset = Math.floor(heightOffset * ((startTime.getHours() - 7) + (startTime.getMinutes() / 60.0)));
    let courseURL = "/course/" + temp.id;
    let blockStyle = {
      height : courseHeight,
      top    : courseTopOffset
    };

    return (
      <div className="calendar-course-item" style = { blockStyle } >
          <a className = "calendar-course-item-courseUrl" href = { courseURL } > { temp.courseName } </a>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    let  courses = this.props.courses.map(function(evt, i) {
      return <Course key = { i } data = { evt }/>;
    });

    return (
      <td className="calendar-day">
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
          id         : tempCal[i]._id,
          courseName : tempCal[i].summary,
          location   : tempCal[i].location,
          startTime  : meetingTimes[j].startTime,
          endTime    : meetingTimes[j].endTime
        }
        coursesArr[day].push(tempCourse);
      }
    }

    let  days = coursesArr.map(function(courses, i) {
      return <Day key={ i } courses = { courses }/> ;
    });

    return (
      <tr className = "calendar-week">
          { days }
      </tr>
    );
  }
}

class Calendar extends React.Component {
  render() {
    let hours = [];
    for (let i = 8; i < 23; i++){
      let time = "";
      if (i <= 11){
        time = i + "am";
      } else if (i == 12){
        time = i + "pm";
      } else {
        time = i - 12 + "pm";
      }
      hours.push(<li key = { i } className = "time-bar-hour"> { time } </li>);
    }
    return (
      <div id = "calendar">
        <ul id = "time-bar">
          { hours }
        </ul>
        <table className="calendar-area">
          <thead>
            <td className = "calendar-week-day"> Monday </td>
            <td className = "calendar-week-day"> Tuesday </td>
            <td className = "calendar-week-day"> Wednesday </td>
            <td className = "calendar-week-day"> Thursday </td>
            <td className = "calendar-week-day"> Friday </td>
          </thead>
          <Week calendar = {this.props.calendar} />
        </table>
      </div>
    );
  }
}

export default Calendar;