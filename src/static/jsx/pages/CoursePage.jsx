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
import ThreadModal from "../components/ThreadModal.jsx";

class Body extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      profile : this.props.app_props.user,
      courseTitle : this.props.app_props.course.title,
      courseID : this.props.app_props.course.id,
      threads : [],
      messages : [],
      currentChannel : "main",
      channelDesc : "",
      channels : [],
      displayDriveArea : true,
      driveFiles : [],
      showThreadModal : false,
      currentThread : {},
      threadModalContent : {},
      threadModalComments : []
    }
  }
  componentDidMount(){
    courseSock.emit('get:course_data', this.state.courseID);
    chatSock.emit('join:channel', {
      channel : "main",
      course  : this.state.courseID
    });
    threadSock.emit('join:thread_space', this.state.courseID);

    courseSock.on('receive:course_data', this.receiveCourseData.bind(this));
    courseSock.on('receive:new_channel', this.receiveChannel.bind(this));

  	chatSock.on('receive:chat_message', this.receiveMessage.bind(this));
    chatSock.on('load:channel', this.loadChannel.bind(this));

    threadSock.on('receive:new_thread', this.receiveThread.bind(this));
    threadSock.on('load:thread_modal', this.loadThreadModal.bind(this));
    threadSock.on('receive:comment', this.receiveThreadComment.bind(this));
  }
 	receiveMessage(message){
    let newMessageArray = this.state.messages.slice();
    newMessageArray.push(message);
    this.setState({
    	messages: newMessageArray
    });
  }
  receiveCourseData(courseData){
    this.setState({
      threads     : courseData.threads,
      channels    : courseData.channelRefs,
      driveFiles  : courseData.driveFileRefs
    });
  }
	postMessage(message){
    message.sender = this.state.profile.name.firstName,
    this.receiveMessage(message);
		chatSock.emit('post:chat_message', message);
	}
  postThread(data){
    let thread = data;
    thread.postedBy = this.state.profile.name.firstName;
    thread.time = new Date();
    this.receiveThread(thread);
    threadSock.emit('post:new_thread', thread);
  }
  receiveThread(thread){
    let newThreadArray = this.state.threads.slice();
    newThreadArray.unshift(thread);
    this.setState({
      threads: newThreadArray
    });
  }
  makeChannel(newChannelData){
    newChannelData.course = this.state.courseID;
    courseSock.emit("make:new_channel", newChannelData);

    this.joinChannel(newChannelData.name);
    this.loadChannel(newChannelData);
    this.receiveChannel(newChannelData);
  }
  joinChannel(channelName){
    chatSock.emit('join:channel', {
      name : channelName,
      course  : this.state.courseID
    });
  }
  loadChannel(channelData){
    this.setState({
      currentChannel : channelData.name,
      channelDesc : channelData.desc,
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
      displayDriveArea : !this.state.displayDriveArea
    })
  }
  openThreadModal(thread){
    this.setState({
      showThreadModal : true,
      currentThread : thread
    });
    threadSock.emit("load:thread_modal", thread.threadRef);
  }
  loadThreadModal(threadData){
    var currentThread = this.state.currentThread;
    this.setState({
      threadModalContent : {
        postedBy : currentThread.postedBy,
        title : currentThread.title,
        content : threadData.content
      },
      threadModalComments : threadData.comments
    })
  }
  receiveThreadComment(newComment){
    this.setState({
      threadModalComments : data.thread.comments
    })
  }
  closeThreadModal(){
    this.setState({
      showThreadModal : false,
      threadModalContent : {},
      threadModalComments : []
    });
  }
	render(){
  	return (
  		<div>
        <NavBar name = { this.state.profile.name }
          courseTitle = { this.state.courseTitle }
          uploadCalendar = { this.uploadCalendar.bind(this) } />
        <div id="content-area">
          <ThreadModal showThreadModal = { this.state.showThreadModal }
            threadModalContent = { this.state.threadModalContent }
            threadModalComments = { this.state.threadModalComments }
            closeThreadModal = { this.closeThreadModal.bind(this) } />
          <Chat messages = { this.state.messages }
            postMessage = { this.postMessage.bind(this) }
            currentChannel = { this.state.currentChannel }
            channelDesc = { this.state.channelDesc }
            channels = { this.state.channels }
            makeChannel = { this.makeChannel.bind(this) }
            joinChannel = { this.joinChannel.bind(this) } />
          <Thread threads = { this.state.threads }
            openThreadModal = { this.openThreadModal.bind(this) }
            postThread = { this.postThread.bind(this) }
            displayDriveArea = { this.state.displayDriveArea }
            toggleDriveArea = { this.toggleDriveArea.bind(this) } />
          <Drive displayDriveArea = { this.state.displayDriveArea }
            driveFiles = { this.state.driveFiles }
            toggleDriveArea = { this.toggleDriveArea.bind(this) } />
        </div>
  		</div>
   	)
  }
}

export default Body;