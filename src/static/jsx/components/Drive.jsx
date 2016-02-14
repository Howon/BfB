import React from 'react';

class DriveInputForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newFileName : "",
      newFileType : ""
    }
  }
  handleFileNameChange(evt) {
    evt.preventDefault();
    this.setState({
      newFileName: evt.target.value
    });
  }
  toggleDriveForm(){
    this.props.toggleDriveForm();
    this.setState({
      newFileName : "",
      newFileType : ""
    });
  }
  uploadDrive(){
    if(/\S/.test(this.state.newFileName)){
      this.props.submitChannelForm({
        name : this.state.newFileName,
        type : this.state.newFileType
      });
    }

    this.toggleDriveForm();
  }
  chooseFileType(fileType){
    this.setState({
      newFileType : fileType
    })
  }
  render(){
    let displayStatus = {
      display : this.props.displayDriveForm ? "block" : "none"
    }
    return (
      <div style = { displayStatus } >
        <div id = "drive-input-shader" className = "page-shader" >
        </div>
        <div id = "drive-input-form" className = "input-form" >
          <div id = "drive-input-form-title" className = "form-title">
            New File
          </div>
          <textarea id = "drive-name-input" className = "drive-input-form"
            type = "text"
            placeholder = "Name of this file"
            onChange = { this.handleFileNameChange.bind(this) }
            value = { this.state.newFileName } ></textarea>
          <div id = "drive-input-form-file-selector">
            <span>Type </span>
            <i onClick = { this.chooseFileType.bind(this, "word") }
              className = { "drive-input-icon fa fa-file-word-o" + (this.state.newFileType === "word" ? " active" : "") } >
            </i>
            <i onClick = { this.chooseFileType.bind(this, "excel") }
              className = { "drive-input-icon fa fa-file-excel-o"  + (this.state.newFileType === "excel" ? " active" : "") } >
            </i>
            <i onClick = { this.chooseFileType.bind(this, "powerpoint") }
              className = { "drive-input-icon fa fa-file-powerpoint-o"  + (this.state.newFileType === "powerpoint" ? " active" : "") } >
            </i>
            <i onClick = { this.chooseFileType.bind(this, "pdf") }
              className = { "drive-input-icon fa fa-file-pdf-o" + (this.state.newFileType === "pdf" ? " active" : "") } >
            </i>
          </div>
          <i id = "close-drive-form" className = "fa fa-times button-close-form"
            onClick = { this.toggleDriveForm.bind(this) } >
          </i>
          <span id = "upload-drive-form" className = "button-submit-form"
            onClick = { this.uploadDrive.bind(this) } >
            upload
          </span>
        </div>
      </div>
    )
  }
}

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
    this.state = {
      displayDriveForm : false
    }
  }
  toggleDriveForm(){
    this.setState({
      displayDriveForm : !this.state.displayDriveForm
    })
  }
  render() {
    let displayStatus = {
      display : this.props.displayDriveArea ? "block" : "none"
    };

    let renderDriveItem = function(driveFile, i){
      return <DriveItem key = { i } driveFile = { driveFile }/>
    }

    return (
			<div style = { displayStatus } id = "drive-area" >
        <DriveInputForm displayDriveForm = { this.state.displayDriveForm }
          toggleDriveForm = { this.toggleDriveForm.bind(this) } />
        <p id="drive-description">
          Shared Files
        </p>
        <div id = "drive-menu" onClick = { this.toggleDriveForm.bind(this) } >
          <span>new file</span>
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