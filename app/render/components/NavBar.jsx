import React from "react";     

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = '';
    }
    render() {
        return (
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">Rayos</a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">              
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="">{ this.props.profile.name }</a></li>                                  
                  <li><a href="/logout">Logout</a></li>
                </ul>        
                <div className="navbar-form navbar-right">        
                  <input type="text" className="form-control" placeholder="Search..."></input>
                </div>
              </div>
            </div>
          </nav>
        )
    }
}

export default NavBar

// <input id = "calendar_upload_button" 
//                   className = "side_bar_item"
//                   type = "file" 
//                   accept =".ics" 
//                   ref = "calendar_upload_button"
//                   onChange = { this.props.uploadCalendar }>
//                   <i id = "calendar_upload_button_icon"                        
//                       className = "fa fa-calendar fa side_bar_item">
//                   </i>
//                 </input>