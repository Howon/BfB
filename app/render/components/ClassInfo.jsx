import React from "react";     

import Chat from "./Chat.jsx";

function calenDate(icalStr)  { 
  var strYear = icalStr.substr(0,4);
  var strMonth = parseInt(icalStr.substr(4,2), 10) - 1;
  var strDay = icalStr.substr(6,2);
  var strHour = icalStr.substr(9,2);
  var strMin = icalStr.substr(11,2);
  var strSec = icalStr.substr(13,2);

  var oDate =  new Date(strYear, strMonth, strDay, strHour, strMin, strSec)
  return oDate;
}

class ClassTime extends React.Component {    
  render(){
    return(
      <li className = "message">
        <span> { this.props.sender } : </span>      
        { this.props.text }
      </li>
    )
  }
};

class ClassInfo extends React.Component {
  render() {
    return (
      <div id = "classInfo"> 
        <div id = "summary" className = "classInfo">
          <p> { this.props.classInfo.summary } </p>
          <p> { this.props.classInfo.location } </p>
        </div>
        <Chat messages = { this.props.messages } 
          postMessage = { this.props.postMessage } />
      </div>
    )
  }
};

export default ClassInfo;