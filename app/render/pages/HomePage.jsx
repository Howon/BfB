import React from "react";     
import io from 'socket.io-client';
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
let socket = io('localhost:3000');

import Chat from "../components/Chat.jsx";
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"

class Body extends React.Component {    
    constructor() {
      super();
      this.state = {
        file : ''
      }
    }
    handleSubmit(e) {
      let file = e.target.files[0];
      let reader = new FileReader();          
      console.log("hello");
    }
    render(){
      return (
        <div>
          <SideBar />
          <NavBar />
        </div>
      )
    }
}

export default Body;

