import React from "react";     

class AnnouncementMenu extends React.Component {    
  render(){    
    return (
      <div id = "announcementMenu">
        <input type="text" placeholder="Search for announcement"
          id = "searchAnnouncement">
        </input>
        <i id = "showAnnouncementPost" className = "fa fa-pencil-square-o fa-lg" 
          onClick = { this.props.toggleDisplayStatus.bind(this) }></i>        
      </div>
    )
  }
};

class Announcement extends React.Component {    
  render(){    
    return (
      <li className = 'announcement_post'>
        <div>
          { this.props.announcement.content }
          <div className = 'announcement_post_poster'>
            Posted by : { this.props.announcement.poster } 
          </div>
        </div>
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
      <ul id="announcements" className="announcementAreaComponent">
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
  render(){
    let displayStatus = { 
        display : this.props.showPostInput ? "block" : "none"
    };
    return (
      <div>
        <div  style = { displayStatus }>        
          <i id="cancel_announcement_post" className = "fa fa-times" 
            onClick = { this.props.toggleDisplayStatus.bind(this) } ></i>
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
  constructor(props){
    super(props);
    this.state = {
      showPostInput : false
    }
  }
  toggleDisplayStatus(){
    this.setState({
      showPostInput : this.state.showPostInput ? false : true
    })    
  }
  render() {
    return (
        <div id="announcementArea">
          <AnnouncementMenu toggleDisplayStatus = { this.toggleDisplayStatus.bind(this) } />
          <AnnouncementList announcements = { this.props.announcements }/>
          <AnnouncementInputForm showPostInput = { this.state.showPostInput } postAnnouncement = { this.props.postAnnouncement } toggleDisplayStatus = { this.toggleDisplayStatus.bind(this) } />
        </div>
    )
  }
};

export default AnnouncementArea;