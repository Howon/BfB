import React from 'react';

class DriveItem extends React.Component {
  render(){
    let driveFile = this.props.driveFile;
    let fileLink = "https://docs.google.com/document/d/" + driveFile.ref + "/edit";
    let fileTypeLogo = "fa fa-file-" + driveFile.fileType + "-o";

    return (
      <li className = "drive-file-list-item" >
        <i className = { fileTypeLogo } ></i>
        <a target="_blank" href={ fileLink } > { driveFile.name } </a>
      </li>
    )
  }
}

class DriveArea extends React.Component {
  constructor(props) {
      super(props);
      this.displayName = '';
  }
  render() {
    let displayStatus = {
      display : this.props.showDriveArea ? "block" : "none"
    };

    let renderDriveItem = function(driveFile, i){
      return <DriveItem key = { i } driveFile = { driveFile }/>
    }

    return (
			<div style = { displayStatus } id = "drive-area" >
        <p id="drive-description">
          Shared Files
        </p>
        <div id = "drive-menu" >
          <span>new files</span>
          <img id = "drive-file-upload-button" src="/images/file-upload-icon.png" alt=""/>
        </div>
        <ul id = "drive-file-list">
          { this.props.driveFiles.map(renderDriveItem.bind(this)) }
        </ul>
			</div>
    )
  }
}

export default DriveArea;