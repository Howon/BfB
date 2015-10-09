require('../stylesheets/chat.css');

import React from 'react';
import ChatPage from './pages/ChatPage.jsx';

let mountNode = document.getElementById("mount_point");

React.render(
  <ChatPage />,
  mountNode
);
