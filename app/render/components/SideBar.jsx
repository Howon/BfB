import React from "react";     

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return ( 
      <div id = "side_bar_container">                              
          <input id = "calendar_upload_button" 
            className = "side_bar_item"
            type = "file" 
            accept =".ics" 
            ref = "calendar_upload_button"
            onChange = { this.props.uploadCalendar }>
            <i id = "calendar_upload_button_icon"                        
                className = "fa fa-calendar fa side_bar_item">
            </i>
          </input>
      </div>
    )
  }
}

export default SideBar;