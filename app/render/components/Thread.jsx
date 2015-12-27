import React from "react";

class ThreadMenu extends React.Component {
  render(){
    return (
      <div id = "thread-menu">
        <img src = "/images/google-drive-icon.png" id = "show-google-docs"
          onClick = { this.props.toggleDriveArea.bind(this) } >
        </img>
        <input type="text" placeholder="Search for thread"
          id = "search-thread">
        </input>
        <i id = "show-thread-post" className = "fa fa-pencil-square-o fa-lg"
          onClick = { this.props.toggleDisplayStatus.bind(this) }>
        </i>
      </div>
    )
  }
};

class ThreadModal extends React.Component {
  render(){
    let displayStatus = {
        display : this.props.displayModal ? "block" : "none"
    };
    return  (
      <div id="openModal" className="modalDialog" style = { displayStatus }  >
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
  render(){
    return (
        <li className = 'thread-post'>
          <div>
            { this.props.thread.content }
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
    var renderThread = function(thread, i){
      return (
        <div onClick = { this.props.toggleModal.bind(undefined, thread) }>
          <Thread key = { i } thread = { thread }/>
        </div>
      )
    }
    return (
      <ul id="threads-area" className="thread-area-component">
        { this.props.threads.map(renderThread.bind(this)) }
      </ul>
    )
  }
};

class ThreadInputForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      thread  : ''
    }
  }
  handleChange(evt) {
    evt.preventDefault();
    this.setState({
      thread: evt.target.value
    });
  }
  postThread(e){
    if(/\S/.test(this.state.thread)){
      this.props.toggleDisplayStatus();
      this.props.postThread({
        content : this.state.thread
      });
    }
    e.preventDefault();
    this.setState({
      showPostInput : false,
      thread: ""
    });
  }
  render(){
    let displayStatus = {
      display : this.props.showPostInput ? "block" : "none"
    };
    return (
      <div>
        <div style = { displayStatus }>
          <i id = "cancel-thread-post" className = "fa fa-times"
            onClick = { this.props.toggleDisplayStatus } ></i>
          <i id = "submit-thread" className = "fa fa-check-square-o"
            onClick = { this.postThread.bind(this) } ></i>
          <textarea id = "thread-input" className = "thread-area"
            type = "text"
            placeholder = "Type to post a thread"
            onChange = { this.handleChange.bind(this) }
            value = { this.state.thread } ></textarea>
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
      displayModal   : false
    }
  }
  toggleDisplayStatus(){
    this.setState({
      showPostInput : this.state.showPostInput ? false : true
    })
  }
  render() {
    return (
      <div id="thread-area">
        <ThreadMenu toggleDisplayStatus = { this.toggleDisplayStatus.bind(this) }
          toggleDriveArea = { this.props.toggleDriveArea.bind(this) } />
        <ThreadList threads = { this.props.threads } toggleModal = { this.props.toggleModal } />
        <ThreadInputForm showPostInput = { this.state.showPostInput } postThread = { this.props.postThread } toggleDisplayStatus = { this.toggleDisplayStatus.bind(this) } />
      </div>
    )
  }
};

export default ThreadArea;