import React from "react";    
function formatTime(d) {
    // Remove the minutes if the time is on the hour
    var timeString = "";
    var hour = d.getHours();

    // Humanize hours.
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

function AMPM(d) {
    // Determine whether the time is AM or PM.
    return d.getHours() < 12 ? "AM" : "PM";
}

class Event extends React.Component {
    render() {
        var start = new Date(this.props.data.start);
        
        var timeString = formatTime(start);
        if (this.props.data.end !== null) {
            var end = new Date(this.props.data.end);
            var endTimeString = formatTime(end);

            // \u2013 is a -
            timeString += AMPM(start) + " \u2013 " + formatTime(end) + AMPM(end);
        }
        else {
            timeString += AMPM(start);
        }

        return (
            <div className="event">
                <a href={this.props.data.url} target="_blank"> { this.props.data.name } </a> <br />
                { timeString }
            </div>
        );
    }
  }

class Day extends React.Component {
    render() {
        var events = this.props.eventList.map(function(evt, i) {
            return <Event key={ evt.id } data={ evt }/>;
        });

        return (
            <td className="day">
                { events }
            </td>
        );
    }
}

class Week extends React.Component {
  constructor(props){
    super(props);
  }
  parseCalendar(calendar){

  }
  render() {
    var events = [[], [], [], [], [], [], []];
    // for (var i = 0; i < this.props.eventList.length; i++) {
    //   var evt = this.props.eventList[i];
    //   var start = new Date(evt.start);
    //   events[start.getDay()].push(evt);
    // }

    var days = [];
    for (var i = 0; i < 7; i++) {
      days.push( <Day key={ i } eventList={ events[i] }/> );
    }

    return (
      <tr className="week">
          { days }
      </tr>
    );
  }
}

class Calendar extends React.Component { 
  render() {
    return (
      <table className="calendar">
        <thead>
          <td> Sunday </td>
          <td> Monday </td>
          <td> Tuesday </td>
          <td> Wednesday </td>
          <td> Thursday </td>
          <td> Friday </td>
          <td> SatuDay </td>
        </thead>
        <Week calendar = {this.props.calendar} />
      </table>
    );
  }    
}

export default Calendar;