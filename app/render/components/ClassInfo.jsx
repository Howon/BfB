import React from "react";     

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

class StudentList extends React.Component {    
  render(){    
    var renderMessage = function(message, i){
      return <Message key = { i } sender = { message.sender } text = { message.message } />
    }
    return (
      <ul id="messages" className="chatArea">
        { this.props.messages.map(renderMessage) } 
      </ul>
    );
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
      </div>
    )
  }
};

export default ClassInfo;