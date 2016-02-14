import React from "react";

class ThreadMenu extends React.Component {
  render(){
    let driveAreaToggle = "show-drive-area"
    if(this.props.displayDriveArea){
      driveAreaToggle += " active"
    };

    let threadFormToggle = "show-thread-form"
    if(this.props.displayThreadForm){
      threadFormToggle += " active"
    };
    return (
      <div id = "thread-menu-area" >
        <div id = "show-drive-area-button" className = { driveAreaToggle }
          onClick = { this.props.toggleDriveArea.bind(this) } >
          <img src = "/images/google-drive-icon.png" id = "show-drive-area-icon" >
          </img>
          <span>shared files</span>
        </div>
        <div id = "thread-menu-menus" >
          <input type="text"
            placeholder="Search for thread"
            id = "search-thread">
          </input>
          <div id = "show-thread-form-button" className = { threadFormToggle }
            onClick = { this.props.toggleThreadForm.bind(this) } >
            <i id = "show-thread-form-icon" className = "fa fa-pencil-square-o fa-lg" >
            </i>
            <span>new thread</span>
          </div>
        </div>
      </div>
    )
  }
};

class Thread extends React.Component {
  render(){
    return (
      <li className = 'thread-list-item'
        onClick = { this.props.openThreadModal.bind(this, this.props.thread) } >
        <div>
          { this.props.thread.title }
          <div className = 'thread-list-item-postedBy'>
            { this.props.thread.postedBy }
          </div>
        </div>
     </li>
    )
  }
};

class ThreadList extends React.Component {
  render(){
    let threads = this.props.threads.map(function(thread, i){
      return (
        <Thread key = { i } thread = { thread } openThreadModal = { this.props.openThreadModal.bind(this) } />
      );
    }, this);

    return (
      <ul id="threads-area" className="thread-area-component">
        { threads }
      </ul>
    )
  }
};

class ThreadInputForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      threadTitle : '',
      inputWarning : false
    }
  }
  handleTitleChange(evt) {
    evt.preventDefault();
    this.setState({
      threadTitle : evt.target.value
    })
  }
  toggleThreadForm(){
    this.props.toggleThreadForm();
    if(this.props.displayThreadForm){
      let summernoteElem = document.getElementsByClassName("note-editable panel-body")[0];
      summernoteElem.innerHTML = "<p></p>";
      let summernotePlaceHolder = document.getElementsByClassName("note-placeholder")[0];
      summernotePlaceHolder.innerHTML = "write here...";
      summernotePlaceHolder.style.display = "block";
      this.setState({
        displayThreadForm : false,
        threadTitle : "",
        threadInputWarning : false,
        threadInputWarningMessage : ""
      });
    }
  }
  postThread(){
    let summernoteElem = document.getElementsByClassName("note-editable panel-body")[0];
    let threadContent = summernoteElem.innerHTML;
    let threadContentTester = threadContent.trim().replace(/&nbsp;/g, '').replace(/ /g, '');

    if(!(/\S/.test(this.state.threadTitle))){
      this.setState({
        threadInputWarning : true,
        threadInputWarningMessage : "Please enter title for this thread"
      });
    } else if ((threadContentTester == "<p></p>") || (threadContentTester == "<p><br></p>")){
      this.setState({
        threadInputWarning : true,
        threadInputWarningMessage : "Give your thread some content!"
      });
    } else {
      this.props.postThread({
        title   : this.state.threadTitle,
        content : threadContent
      });

      this.toggleThreadForm();
    }
  }
  render(){
    let displayThreadForm = {
      display : this.props.displayThreadForm ? "block" : "none"
    };

    let displayWarning = {
      display : this.state.threadInputWarning ? "block" : "none"
    };

    return (
      <div style = { displayThreadForm } >
        <div id = "thread-input-shader" className = "page-shader" >
        </div>
        <div id = "thread-input-form" className = "input-form" >
          <div id = "thread-input-form-title" className = "form-title" >
            New Thread
          </div>
          <textarea id = "thread-title-input"
            type = "text"
            placeholder = "What is this thread called?"
            onChange = { this.handleTitleChange.bind(this) }
            value = { this.state.threadTitle } >
          </textarea>
          <div id = "thread-content-input" >
          </div>
          <div style = { displayWarning } className = "form-warning"
            id = "thread-input-warning">
            { this.state.threadInputWarningMessage }
          </div>
          <i id = "close-thread-form" className = "fa fa-times button-close-form"
            onClick = { this.toggleThreadForm.bind(this) } >
          </i>
          <span id = "submit-thread-form" className = "button-submit-form"
            onClick = { this.postThread.bind(this) } >
            post
          </span>
        </div>
      </div>
    )
  }
};

class ThreadArea extends React.Component {
  constructor(props){
    super(props);
    var emptyThread = {
      content: "",
      postedBy: ""
    }
    this.state = {
      displayThreadForm : false,
      currentThreadModal : emptyThread,
      displayThreadModal   : false
    }
  }
  componentDidMount(){
    $('#thread-content-input').summernote({
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough','superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph','height']],
        ['insert', ['link', 'table']]
      ],
      height: 350,
      maxHeight: 350,
      focus: true,
      disableDragAndDrop: true,
      placeholder : "type here!"
    });
  }
  toggleThreadForm(){
    this.setState({
      displayThreadForm : this.state.displayThreadForm ? false : true
    });
  }
  render() {
    let threadAreaHeight = {
      height : this.props.displayDriveArea ? "35%" : "100%"
    }
    return (
      <div id="thread-area" style = { threadAreaHeight }>
        <ThreadMenu toggleThreadForm = { this.toggleThreadForm.bind(this) }
          displayDriveArea = { this.props.displayDriveArea }
          displayThreadForm = { this.state.displayThreadForm }
          toggleDriveArea = { this.props.toggleDriveArea.bind(this) } />
        <ThreadList threads = { this.props.threads }
          openThreadModal = { this.props.openThreadModal } />
        <ThreadInputForm displayThreadForm = { this.state.displayThreadForm }
          postThread = { this.props.postThread }
          toggleThreadForm = { this.toggleThreadForm.bind(this) } />
      </div>
    )
  }
};

export default ThreadArea;