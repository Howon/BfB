import React from "react";

class ThreadMenu extends React.Component {
  render(){
    return (
      <div id = "thread-menu-area">
        <img src = "/images/google-drive-icon.png" id = "show-drive-area"
        onClick = { this.props.toggleDriveArea.bind(this) } >
        </img>
        <div id = "thread-menu-menus" >
          <input type="text"
            placeholder="Search for thread"
            id = "search-thread">
          </input>
          <i id = "show-thread-post" className = "fa fa-pencil-square-o fa-lg"
            onClick = { this.props.toggleDisplayStatus.bind(this) }>
          </i>
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
            Posted by : { this.props.currentThreadModal.postedBy }
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
            Posted by : { this.props.thread.postedBy }
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
      threadContent  : ''
    }
  }
  componentDidMount(){
    $(document).ready(function() {
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
        placeholder: 'write here...'
      });
    });
  }
  handleTitleChange(evt) {
    evt.preventDefault();
    this.setState({
      threadTitle : evt.target.value
    })
  }
  postThread(e){
    if(/\S/.test(this.state.thread)){
      this.props.toggleDisplayStatus();
      this.props.postThread({
        title   : this.state.threadTitle,
        content : $('#thread-content-input').summernote('code')
      });
    }
    $('#thread-content-input').summernote().code('');

    e.preventDefault();
    this.setState({
      showPostInput : false,
      threadTitle : "",
      threadContent: ""
    });
  }
  render(){
    let displayStatus = {
      display : this.props.showPostInput ? "block" : "none"
    };
    return (
      <div style = { displayStatus } >
        <div id = "thread-input-shader"
          onClick = { this.props.toggleDisplayStatus } >
        </div>
        <div id = "thread-input-form" >
          <div id = "thread-input-form-title">
            New Thread
          </div>
          <i id = "close-thread-form" className = "fa fa-times"
            onClick = { this.props.toggleDisplayStatus } >
          </i>
          <i id = "submit-thread-form" className = "fa fa-check-square-o"
            onClick = { this.postThread.bind(this) } >
          </i>
          <textarea id = "thread-title-input"
            type = "text"
            placeholder = "Enter title for your thread"
            onChange = { this.handleTitleChange.bind(this) }
            value = { this.state.threadTitle } ></textarea>
          <textarea id = "thread-content-input"
            value = { this.state.threadContent } ></textarea>
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
      showPostInput : false,
      currentThreadModal : emptyThread,
      displayThreadModal   : false
    }
  }
  toggleDisplayStatus(){
    this.setState({
      showPostInput : this.state.showPostInput ? false : true
    })
  }
  render() {
    let threadAreaHeight = {
      height : this.props.showDriveArea ? "45%" : "100%"
    }
    return (
      <div id="thread-area" style = { threadAreaHeight }>
        <ThreadMenu toggleDisplayStatus = { this.toggleDisplayStatus.bind(this) }
          showDriveArea = { this.props.showDriveArea }
          toggleDriveArea = { this.props.toggleDriveArea.bind(this) } />
        <ThreadList threads = { this.props.threads } openThreadModal = { this.props.openThreadModal } />
        <ThreadInputForm showPostInput = { this.state.showPostInput } postThread = { this.props.postThread } toggleDisplayStatus = { this.toggleDisplayStatus.bind(this) } />
      </div>
    )
  }
};

export default ThreadArea;