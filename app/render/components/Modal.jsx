import React from "react";


class ModalComment extends React.Component {    
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

class Modal extends React.Component {
  constructor(props){
  	super(props);
  }
  render(){
  	var renderComment = function(comment, i){
      return ( 
          <div> 
            <ModalComment key = { i } comment = { comment }/>
          </div>
      )
    }
    let displayStatus = { 
        display : this.props.showModal ? "block" : "none"
    };
    return  (
      <div id="openModal" className="modalDialog" style = { displayStatus }  >
        <div>
          { this.props.modalThread.content }
          <div className = 'thread-post-postedBy'>
            Posted by : { this.props.modalThread.postedBy }
          </div>
        </div>

        <ul>
        	{ this.props.modalComments.map( renderComment.bind(this)) }
        </ul>
      </div>
    )
  }
};




export default Modal;