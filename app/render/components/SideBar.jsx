import React from "react";     
import io from 'socket.io-client';
let socket = io('localhost:3000');

class SideBar extends React.Component {
    constructor(props) {
      super(props);
    }
    handleFile(e) {
      var self = this;
      var reader = new FileReader();
      var file = e.target.files[0];

      var jsonObject = {
          'uploader' : this.props.profile.id,
          'calendarData': file
      }
      socket.emit('upload:calendar', jsonObject);
      reader.readAsBinaryString(file);
    }
    render() {
        return ( 
          <div id = "side_bar_container">                              
                  <input id = "calendar_upload_button" 
                        className = "side_bar_item"
                        type = "file" 
                        accept =".ics" 
                        ref = "calendar_upload_button"
                        onChange = { this.handleFile.bind(this) }>
                    <i id = "calendar_upload_button_icon"                        
                        className = "fa fa-calendar fa side_bar_item">
                    </i>
                  </input>
          </div>
        )
    }
}

export default SideBar;