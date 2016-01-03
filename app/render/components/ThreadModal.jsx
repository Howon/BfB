import React from "react";

class ThreadModalComment extends React.Component {
  render(){
    return (
      <li>
        <div>
          { this.props.comment.content }
          <div>
          	Posted by : { this.props.comment.postedBy }
          </div>
        </div>
      </li>
    )
  }
};

class ThreadModal extends React.Component {
  constructor(props){
  	super(props);
  }
  render(){
  	let renderComment = function(comment, i){
      return <ThreadModalComment key = { i } comment = { comment } />;
    }
    let displayStatus = {
      display : this.props.showThreadModal ? "block" : "none"
    };

    return (
      <div id = "thread-modal" style = { displayStatus }  >
        <div id = "thread-modal-area">
          <div id = "thread-modal-main-content">
            { this.props.modalThread.title }
            <div className = 'thread-post-postedBy'>
              Posted by : { this.props.modalThread.postedBy }
            </div>
          </div>
          <ul id = "thread-modal-comment-list">
          	{ this.props.modalComments.map(renderComment) }
          </ul>
        </div>
        <div id="thread-modal-shader"
          onClick = { this.props.closeThreadModal.bind(this) } >
        </div>
      </div>
    )
  }
};

export default ThreadModal;