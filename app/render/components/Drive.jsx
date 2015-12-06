import React from 'react';

class DriveArea extends React.Component {
  constructor(props) {
      super(props);
      this.displayName = '';
  }
  render() {
    let displayStatus = { 
      display : this.props.showDriveArea ? "block" : "none"
    };
    return (
			<iframe style = { displayStatus }
				id = "driveArea"
			 	src="https://drive.google.com/embeddedfolderview?id=0Bxs2B_9TUEqNbUlKOU5ORlpHblE#grid">
			</iframe>
    ) 
  }
}

export default DriveArea;