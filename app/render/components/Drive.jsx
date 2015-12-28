import React from 'react';

class DriveArea extends React.Component {
  constructor(props) {
      super(props);
      this.displayName = '';
  }
  render() {
    let displayStatus = {
      display : this.props.showDriveArea ? "block" : "none"
    };

    var renderFileLink = function(driveFile, i){
      let fileLink = "https://docs.google.com/document/d/" + driveFile.ref + "/edit";
      return (
        <li className = "drive-file-list-item">
          <a target="_blank" href={ fileLink }>{ driveFile.name } </a>
        </li>
      )
    }
    return (
			<div style = { displayStatus } id = "drive-area" >
        <ul id = "drive-file-list">
          { this.props.driveFiles.map(renderFileLink.bind(this)) }
        </ul>
			</div>
    )
  }
}

export default DriveArea;