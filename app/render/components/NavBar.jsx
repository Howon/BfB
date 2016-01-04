import React from "react";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = '';
  }
  render() {
    return (
      <nav id = "navBar">
        <div id = "navBar-Rayos">
          <a href="/">Rayos</a>
        </div>
        <div id = "course-title">
          <a className="" href="">{ this.props.courseTitle }</a>
        </div>
        <div id = "navBar-user-area">
          <span><a>{ this.props.name.firstName + " " + this.props.name.lastName }</a></span>
          <span ><a href="/logout">Logout</a></span>
        </div>
      </nav>
    )
  }
}

export default NavBar

// <input id = "calendar_upload_button"
//                   className = "side_bar_item"
//                   type = "file"
//                   accept =".ics"
//                   ref = "calendar_upload_button"
//                   onChange = { this.props.uploadCalendar }>
//                   <i id = "calendar_upload_button_icon"
//                       className = "fa fa-calendar fa side_bar_item">
//                   </i>
//                 </input>