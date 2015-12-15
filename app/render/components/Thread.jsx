import React from "react";   

class ThreadMenu extends React.Component {    
  render(){    
    return (
      <div id = "thread-menu">
        <i id = "show-google-docs" className="fa fa-files-o fa-lg"></i>
        <input type="text" placeholder="Search for thread"
          id = "search-thread">
        </input>
        <i id = "show-thread-post" className = "fa fa-pencil-square-o fa-lg" 
          onClick = { this.props.toggleDisplayStatus.bind(this) }></i>        
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
          <div onClick = { this.props.onModal.bind(undefined, thread) }> 
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
  onModal(data){
    this.setState({
      currentThreadModal: data,
      displayModal: true
    })
  }
  offModal(){
    if (this.state.displayModal){ 
      this.setState({
        displayModal: false
      })
    }
  }
  render() {
    return (
      <div onClick = { this.offModal.bind(this) }> 
        <div id="thread-area">
          <ThreadModal currentThreadModal = { this.state.currentThreadModal } displayModal = { this.state.displayModal } />
          <ThreadMenu toggleDisplayStatus = { this.toggleDisplayStatus.bind(this) } />
          <ThreadList threads = { this.props.threads } onModal = { this.onModal.bind(this) } />
          <ThreadInputForm showPostInput = { this.state.showPostInput } postThread = { this.props.postThread } toggleDisplayStatus = { this.toggleDisplayStatus.bind(this) } />
        </div>
      </div>
    )
  }
};

export default ThreadArea;