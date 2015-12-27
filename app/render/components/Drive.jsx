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
    let source = "https://drive.google.com/embeddedfolderview?id=" + this.props.driveFolder + "#list";
    console.log(this.props.driveFolder)
    return (
			<iframe style = { displayStatus }
				id = "driveArea"
			 	src = { source }>
			</iframe>
    )
  }
}

export default DriveArea;