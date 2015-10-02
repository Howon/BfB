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
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="http://getbootstrap.com/examples/dashboard/#">Raymond</a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="">{this.props.profile.user.name}</a></li>                                  
                  <li><a href="http://getbootstrap.com/examples/dashboard/#">Settings</a></li>
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