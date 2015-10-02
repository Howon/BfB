import React from "react";     
import io from 'socket.io-client';
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
let socket = io('localhost:3000');

import Chat from "../components/Chat.jsx";
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";

class Body extends React.Component {    
    constructor(props) {
      super(props);
      this.state = {
        profile : this.props.user_profile,
        data_uri: null,
      }
    }
    render(){
      return (
        <div>
          <SideBar />
          <NavBar profile = {this.state.profile}/>         
        </div>
      )
    }
}

export default Body;

