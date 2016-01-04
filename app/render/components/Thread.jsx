import React from "react";

class ThreadMenu extends React.Component {
  render(){
    let driveAreaToggle = "show-drive-area"
    if(this.props.showDriveArea){
      driveAreaToggle += " active"
    };
    return (
      <div id = "thread-menu-area" >
        <div id = "show-drive-area" className = { driveAreaToggle }
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
          <div id = "show-thread-post" onClick = { this.props.toggleThreadForm.bind(this) } >
            <i id = "show-thread-post-icon" className = "fa fa-pencil-square-o fa-lg" >
            </i>
            <span>new thread</span>
          </div>
        </div>
      </div>
    )
  }
};

class ThreadModal extends React.Component {
  render(){
    let displayStatus = {
      display : this.props.displayThreadModal ? "block" : "none"
    };
    return  (
      <div id="openThreadModal" className="modalDialog" style = { displayStatus }  >
        <div>
          { this.props.currentThreadModal.content }
          <div className = 'thread-post-postedBy'>
            { this.props.currentThreadModal.postedBy }
          </div>
        </div>
      </div>
    )
  }
}

class Thread extends React.Component {
  openThreadModal(){
    this.props.openThreadModal(this.props.thread);
  }
  render(){
    return (
      <li className = 'thread-post' onClick = { this.openThreadModal.bind(this) } >
        <div>
          { this.props.thread.title }
          <div className = 'thread-post-postedBy'>
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
    if(this.props.showThreadForm){
      let summernoteElem = document.getElementsByClassName("note-editable panel-body")[0];
      summernoteElem.innerHTML = "<p></p>";
      let summernotePlaceHolder = document.getElementsByClassName("note-placeholder")[0];
      summernotePlaceHolder.innerHTML = "write here...";
      summernotePlaceHolder.style.display = "block";
      this.setState({
        showThreadForm : false,
        threadTitle : "",
        inputWarning : false
      });
    }
  }
  postThread(e){
    let summernoteElem = document.getElementsByClassName("note-editable panel-body")[0];
    let threadContent = summernoteElem.innerHTML;
    let threadContentTester = threadContent.replace(/&nbsp;/g, '').replace(/ /g, '');

    if(!(/\S/.test(this.state.threadTitle) && (threadContentTester !== "<p></p>") && (threadContentTester !== "<p><br></p>"))){
      this.setState({
        inputWarning : true
      });
    } else {
      this.toggleThreadForm();
      this.props.postThread({
        title   : this.state.threadTitle,
        content : threadContent
      });

      e.preventDefault();
    }
  }
  render(){
    let displayThreadForm = {
      display : this.props.showThreadForm ? "block" : "none"
    };

    let displayWarning = {
      display : this.state.inputWarning ? "block" : "none"
    };

    return (
      <div style = { displayThreadForm } >
        <div id = "thread-input-shader"
          onClick = { this.toggleThreadForm.bind(this) } >
        </div>
        <div id = "thread-input-form" >
          <div id = "thread-input-form-title">
            New Thread
          </div>
          <i id = "close-thread-form" className = "fa fa-times"
            onClick = { this.toggleThreadForm.bind(this) } >
          </i>
          <span id = "submit-thread-form" onClick = { this.postThread.bind(this) } >
            post
          </span>
          <textarea id = "thread-title-input"
            type = "text"
            placeholder = "Enter title for your thread"
            onChange = { this.handleTitleChange.bind(this) }
            value = { this.state.threadTitle } >
          </textarea>
          <div id = "thread-content-input" >
          </div>
          <div style = { displayWarning }
            id = "thread-input-warning">
            Please enter both title and content for your thead
          </div>
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
      showThreadForm : false,
      currentThreadModal : emptyThread,
      displayThreadModal   : false
    }
  }
  componentDidMount(){
    $('#thread-content-input').summernote({
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['style', [ 'fontname']],
        ['font', ['superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph','height']],
        ['insert', ['link', 'table']]
      ],
      height: 350,
      maxHeight: 350,             // set maximum height of editor
      focus: true,                  // set focus to editable area after initializin
      disableDragAndDrop: true,
      placeholder : "write here..."
    });
  }
  toggleThreadForm(){
    this.setState({
      showThreadForm : this.state.showThreadForm ? false : true
    });
  }
  render() {
    let threadAreaHeight = {
      height : this.props.showDriveArea ? "40%" : "100%"
    }
    return (
      <div id="thread-area" style = { threadAreaHeight }>
        <ThreadMenu toggleThreadForm = { this.toggleThreadForm.bind(this) }
          showDriveArea = { this.props.showDriveArea }
          toggleDriveArea = { this.props.toggleDriveArea.bind(this) } />
        <ThreadList threads = { this.props.threads } openThreadModal = { this.props.openThreadModal } />
        <ThreadInputForm showThreadForm = { this.state.showThreadForm } postThread = { this.props.postThread } toggleThreadForm = { this.toggleThreadForm.bind(this) } />
      </div>
    )
  }
};

export default ThreadArea;