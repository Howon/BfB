import React from "react";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id = "side-bar-container">
       <input id = "calendar-upload-button"
	      className = "side-bar-item"
	      type = "file"
	      accept =".ics"
	      ref = "calendar-upload-button"
	      onChange = { this.props.uploadCalendar }>
	      <i id = "calendar-upload-button-icon"
	          className = "fa fa-calendar fa side-bar-item">
	      </i>
	    </input>
      </div>
    )
  }
}

export default SideBar;