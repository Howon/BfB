import React from "react";     
import io from 'socket.io-client';
    // socket = io('https://anon-message.herokuapp.com/', {secure: true});
let socket = io('localhost:3000');
 
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
    render (){
        return (
            <div>
                <div>Hello World</div>            
                <input 
                  type="file" 
                  name="file" 
                  id = "parseOutput" 
                  ref="file" 
                  accept=".ics" 
                  onChange={this.handleSubmit}
                />
            </div>
        )
    }
}

export default Body;

