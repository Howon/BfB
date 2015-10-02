import React from "react";     
import io from 'socket.io-client';
let socket = io('localhost:3000');

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data_uri: null,
        }
    }
    handleSubmit(e) {
      e.preventDefault();
    }
    handleFile(e) {
      var self = this;
      var reader = new FileReader();
      var file = e.target.files[0];

      var jsonObject = {
          'imageData': file
      }
      socket.emit('upload:calendar', jsonObject);
      reader.readAsBinaryString(file);
    }
    render() {
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3 col-md-2 sidebar">
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                  <input type="file" type="file" accept =".ics" onChange={this.handleFile} ></input>                  
                </form>
                <ul className="nav nav-sidebar">
                  <li className="active"><a href="#">Overview <span className="sr-only">(current)</span></a></li>
                  <li><a href="#">Reports</a></li>
                  <li><a href="#">Analytics</a></li>
                  <li><a href="#">Export</a></li>
                </ul>
                <ul className="nav nav-sidebar">
                  <li><a href="">Nav item</a></li>
                  <li><a href="">Nav item again</a></li>
                  <li><a href="">One more nav</a></li>
                  <li><a href="">Another nav item</a></li>
                  <li><a href="">More navigation</a></li>
                </ul>
                <ul className="nav nav-sidebar">
                  <li><a href="">Nav item again</a></li>
                  <li><a href="">One more nav</a></li>
                  <li><a href="">Another nav item</a></li>
                </ul>
              </div>        
            </div>
          </div>
        )
    }
}

export default SideBar;