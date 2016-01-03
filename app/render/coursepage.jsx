require('../stylesheets/chat.css');
require('../stylesheets/sideBar.css');
require('../stylesheets/contentArea.css');
require('../stylesheets/thread.css');
require('../stylesheets/modal.css');
require('../stylesheets/drive.css');
require('../stylesheets/channel.css');
require('../stylesheets/threadModal.css');
import React from 'react';
import ReactDom from 'react-dom'
import CoursePage from './pages/CoursePage.jsx';

let mountNode = document.getElementById("mount-point");

ReactDom.render(
  <CoursePage app_props = { window.APP_PROPS }/>,
  mountNode
);
