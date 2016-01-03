import React from 'react';

class DriveItem extends React.Component {
  render(){
    let driveFile = this.props.driveFile;
    let fileLink = "https://docs.google.com/document/d/" + driveFile.ref + "/edit";
    return (
      <li className = "drive-file-list-item">
        <a target="_blank" href={ fileLink }>{ driveFile.name } </a>
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
        <div id = "drive-menu-menus" >
          <img id = "drive-file-upload-buttom" src="/images/file-upload-icon.png" alt=""/>
        </div>
        <ul id = "drive-file-list">
          { this.props.driveFiles.map(renderDriveItem.bind(this)) }
        </ul>
			</div>
    )
  }
}

export default DriveArea;

// <i className="file-upload-button fa fa-file-word-o" >
//           </i>
//           <i className="file-upload-button fa fa-file-pdf-o" >
//           </i>
//           <i className="file-upload-button fa fa-file-excel-o" >
//           </i>