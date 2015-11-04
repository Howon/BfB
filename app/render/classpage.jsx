require('../stylesheets/style.css');
require('../stylesheets/chat.css');
require('../stylesheets/sideBar.css');

import React from 'react';
import ChatPage from './pages/ClassPage.jsx';

let mountNode = document.getElementById("mount_point");

React.render(
  <ChatPage app_props = { window.APP_PROPS }/>,
  mountNode
);
