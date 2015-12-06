require('../stylesheets/chat.css');
require('../stylesheets/sideBar.css');
require('../stylesheets/contentArea.css');
require('../stylesheets/thread.css');
require('../stylesheets/drive.css');

import React from 'react';
import ChatPage from './pages/ClassPage.jsx';

let mountNode = document.getElementById("mount-point");

React.render(
  <ChatPage app_props = { window.APP_PROPS }/>,
  mountNode
);
