import React from "react";     

class Announcement extends React.Component {    
  constructor(props){
    super(props);
    return{
      upvote : this.props.upvote
    }
  }
  handleVoting(action){
    socket.emit('vote:announcement', this.props.id, action);
    this.setState({
      upvote : this.state.upvote + action
    })
  }
  render(){
    return (
      <li className = 'announcement_post'>
        <div className="votingArea"> 
          <i className = "fa fa-arrow-up" onClick={this.handleVoting.bind(null, 1)}></i>
          <i className = "fa fa-arrow-down" onClick={this.handleVoting.bind(null, -1)}></i>
          <p className="announcement_post_rating">{this.state.upvote}</p>
        </div>
        <div className="announcement_post_content">{this.props.content}</div>
      </li>
    )
  }
};

class AnnouncementLit extends React.Component {    
  render(){
    var renderAnnouncement = function(announcement, i){
      return <Announcement key = { i } id = { announcement._id } upvote = { announcement.upvote } content = { announcement.content }/>
    }
    return (
      <ul id="announcements" className="announcementArea">
        { this.props.announcements.map(renderAnnouncement) } 
      </ul>
    )
  }
};

class MessageInputForm extends React.Component {    
  constructor(props){      
    super(props); 
    this.state = {
      poster : this.props.profile.name,
      announcement: ''          
    }
  }
  handleChange(evt) {
    evt.preventDefault();            
    this.setState({
      announcement: evt.target.value
    });
  }
  handleSubmit(e){
    if(/\S/.test(this.state.message)){
      this.props.postAnnouncement({
        poster       : this.state.poster,
        announcement : this.state.announcement
      });    
    }
    e.preventDefault();
    this.setState({
      announcement: ""
    });
  }
  handleKeyDown(evt) {
    if (evt.keyCode == 13 ) {
      this.handleSubmit(evt);
    }
  }
  render(){
    return (
      <div>
        <i id="showAnnouncementPost" className="fa fa-pencil-square-o fa-lg"></i>
        <i id="cancel_announcement_post" className="fa fa-times"></i>
        <textarea id="announcementInput" type="text" placeholder="Type to leave an announcement" className="announcementArea"
        onChange = { this.handleChange.bind(this) } value = { this.state.announcement } onKeyDown = { this.handleKeyDown.bind(this) } ></textarea>
        <i id="submit_announcement" className="fa fa-check-square-o" onClick = {this.postAnnouncement} ></i>
        </div>
      )
    }
  }
};

class Chat extends React.Component {
  render() {
    return (
        <div id="announcementArea">
          <AnnouncementList announcements = { this.props.announcements }/>
          <AnnouncementInputForm profile = { this.props.profile } postAnnouncement = { this.props.postAnnouncement } />
        </div>
    )
  }
};

export default Chat;