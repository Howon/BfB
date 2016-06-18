require('../css/chat.css');
require('../css/sideBar.css');
require('../css/contentArea.css');
require('../css/thread.css');
require('../css/modal.css');
require('../css/drive.css');
require('../css/channel.css');
require('../css/threadModal.css');
import React from 'react';
import ReactDom from 'react-dom'
import CoursePage from './pages/CoursePage.jsx';

let mountNode = document.getElementById("mount-point");

ReactDom.render(
  <CoursePage app_props = { window.APP_PROPS }/>,
  mountNode
);
