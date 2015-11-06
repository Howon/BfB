import React from "react";     

class Announcement extends React.Component {    
  render(){    
    return (
      <li className = 'announcement_post'>
        <span> { this.props.announcement.poster } : </span>
        { this.props.announcement.content }
      </li>
    )
  }
};

class AnnouncementList extends React.Component {    
  render(){
    var renderAnnouncement = function(announcement, i){
      return <Announcement key = { i } announcement = { announcement }/>
    }
    return (
      <ul id="announcements" className="announcementArea">
        { this.props.announcements.map(renderAnnouncement) } 
      </ul>
    )
  }
};

class AnnouncementInputForm extends React.Component {    
  constructor(props){      
    super(props); 
    this.state = {
      announcement  : '',
      showPostInput : false     
    }
  }
  handleChange(evt) {
    evt.preventDefault();            
    this.setState({
      announcement: evt.target.value
    });
  }
  postAnnouncement(e){
    if(/\S/.test(this.state.announcement)){
      this.props.postAnnouncement({
        content : this.state.announcement
      });    
    }
    e.preventDefault();
    this.setState({
      showPostInput : false,
      announcement: ""
    });
  }
  toggleDisplayStatus(){
    this.setState({
      showPostInput : this.state.showPostInput ? false : true
    })    
  }
  render(){
    let displayStatus = { 
        display : this.state.showPostInput ? "block" : "none"
    };
    return (
      <div>
        <i id="showAnnouncementPost" className = "fa fa-pencil-square-o fa-lg" 
          onClick = { this.toggleDisplayStatus.bind(this) }></i>        
        <div  style = { displayStatus }>        
          <i id="cancel_announcement_post" className = "fa fa-times" 
            onClick = { this.toggleDisplayStatus.bind(this) } ></i>
          <i id="submit_announcement" className ="fa fa-check-square-o" 
            onClick = { this.postAnnouncement.bind(this) } ></i>
          <textarea id="announcementInput" 
            className="announcementArea"
            type = "text" 
            placeholder = "Type to leave an announcement"
            onChange = { this.handleChange.bind(this) } 
            value = { this.state.announcement } ></textarea>
        </div>  
      </div>
    )
  }
};

class AnnouncementArea extends React.Component {
  render() {
    return (
        <div id="announcementArea">
          <AnnouncementList announcements = { this.props.announcements }/>
          <AnnouncementInputForm postAnnouncement = { this.props.postAnnouncement } />
        </div>
    )
  }
};

export default AnnouncementArea;