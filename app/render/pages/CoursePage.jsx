import React from "react";
import io from 'socket.io-client';
let courseSock = io(window.location.host + "/course");
let chatSock = io(window.location.host + "/chat");
let threadSock = io(window.location.host + "/thread");

import Thread from "../components/Thread.jsx";
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";
import Chat from "../components/Chat.jsx";
import Drive from "../components/Drive.jsx";
import Modal from "../components/Modal.jsx";

let Transition = React.TransitionGroup;

class Body extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      profile        : this.props.app_props.user,
      course         : this.props.app_props.course.id,
      threads        : [],
      messages       : [],
      currentChannel : "main",
      channels       : [],
      showDriveArea  : false,
      driveFiles     : [],
      showModal      : false,
      modalThread    : {
        content  : "",
        postedBy : ""
      },
      modalComments  : []
    }
  }
  componentDidMount(){
    courseSock.emit('get:course_data', this.state.course);
    chatSock.emit('join:channel', {
      channel : "main",
      course  : this.state.course
    });
    threadSock.emit('join:thread_space', this.state.course);

    let course = this.state.course;

    courseSock.on('receive:course_data', this.receiveCourseData.bind(this));
    courseSock.on('receive:new_channel', this.receiveChannel.bind(this));
    courseSock.on('receive:comments', this.receiveComments.bind(this));

  	chatSock.on('receive:chat_message', this.receiveMessage.bind(this));
    chatSock.on('load:channel', this.loadChannel.bind(this));

    threadSock.on('receive:thread', this.receiveThread.bind(this));
  }
 	receiveMessage(message){
    let newMessageArray = this.state.messages.slice();
    newMessageArray.push(message);
    this.setState({
    	messages: newMessageArray
    });
  }
  receiveCourseData(data){
    this.setState({
      threads     : data.courseData.threads,
      channels    : data.courseData.channelRefs,
      driveFiles  : data.courseData.driveFileRefs
    });
  }
  receiveComments(data){
    this.setState({
      modalComments : data.thread.comments
    })
  }
	postMessage(message){
    message.sender = this.state.profile.name,
    this.receiveMessage(message);
		chatSock.emit('post:chat_message', message);
	}
  postThread(data){
    let thread = data;
    thread.postedBy = this.state.profile.name;
    thread.time = new Date();
    this.receiveThread(thread);
    threadSock.emit('post:thread', thread);
  }
  receiveThread(thread){
    let newThreadArray = this.state.threads.slice();
    newThreadArray.unshift(thread);
    this.setState({
      threads: newThreadArray
    });
  }
  makeChannel(newChannelData){
    newChannelData.course = this.state.course;
    courseSock.emit("make:new_channel", newChannelData);
    this.joinChannel(newChannelData.name);
    this.receiveChannel(newChannelData);
  }
  joinChannel(channelName){
    chatSock.emit('join:channel', {
      channel : channelName,
      course  : this.state.course
    });
  }
  loadChannel(channelData){
    this.setState({
      currentChannel : channelData.channelName,
      messages    : channelData.messages
    });
  }
  receiveChannel(newChannel){
    let newChannelArray = this.state.channels.slice();
    newChannelArray.push(newChannel);
    this.setState({
      channels: newChannelArray
    });
  }
  uploadCalendar(e){
    let reader = new FileReader();
    let file = e.target.files[0];

    let jsonObject = {
      'uploader' : this.state.profile.id,
      'calendarData': file
    }
    courseSock.emit('upload:calendar', jsonObject);
    reader.readAsBinaryString(file);
    window.location = "/home"
  }
  toggleDriveArea(){
    this.setState({
      showDriveArea : this.state.showDriveArea ? false : true
    })
  }
  toggleModal(thread){
    if (!this.state.showModal){
      this.setState({
        showModal : !this.state.showModal,
        modalThread : thread
      })
      courseSock.emit('get:comments', thread._id);
    }
  }
  offModal(){
    if (this.state.showModal){
      this.setState({
        showModal : !this.state.showModal
      })
    }
  }
	render(){
  	return (
  		<div onClick = { this.offModal.bind(this) } >
        <Modal showModal = { this.state.showModal }
          modalComments = { this.state.modalComments }
          modalThread = { this.state.modalThread } />
        <NavBar profile = { this.state.profile }
          uploadCalendar = { this.uploadCalendar.bind(this) } />
        <div id="content-area">
          <Chat messages = { this.state.messages }
            postMessage = { this.postMessage.bind(this) }
            currentChannel = { this.state.currentChannel }
            channels = { this.state.channels }
            makeChannel = { this.makeChannel.bind(this) }
            joinChannel = { this.joinChannel.bind(this) } />
          <Thread threads = { this.state.threads }
            toggleModal = { this.toggleModal.bind(this) }
            postThread = { this.postThread.bind(this) }
            showDriveArea = { this.state.showDriveArea }
            toggleDriveArea = { this.toggleDriveArea.bind(this) } />
          <Drive showDriveArea = { this.state.showDriveArea }
            driveFiles = { this.state.driveFiles }
            toggleDriveArea = { this.toggleDriveArea.bind(this) } />
        </div>
  		</div>
   	)
  }
}

export default Body;