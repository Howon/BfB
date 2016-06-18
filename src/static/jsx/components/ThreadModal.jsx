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
            <div id = "thread-modal-title-area">
              <span id = 'thread-modal-title'>
                { this.props.threadModalContent.title }
              </span>
              <span id = 'thread-modal-postedBy'>
                { this.props.threadModalContent.postedBy }
              </span>
            </div>
            <i id = "close-thread-modal" className = "fa fa-times"
              onClick = { this.props.closeThreadModal.bind(this) } >
            </i>
            <div id = "thread-modal-display-content" dangerouslySetInnerHTML={ {__html: this.props.threadModalContent.content } }>
            </div>
          </div>
          <div id = "thread-modal-comment">
            <ul id = "thread-modal-comment-list">
              { this.props.threadModalComments.map(renderComment) }
            </ul>
          </div>
        </div>
        <div id="thread-modal-shader" className = "page-shader"
          onClick = { this.props.closeThreadModal.bind(this) } >
        </div>
      </div>
    )
  }
};

export default ThreadModal;