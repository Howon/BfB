require('../stylesheets/calendar.css');
require('../stylesheets/notificationBar.css');
require('../stylesheets/sideBar.css');

import React from 'react';
import ReactDom from 'react-dom';
import HomePage from './pages/HomePage.jsx';

let mountNode = document.getElementById("mount-point");

ReactDom.render(
  <HomePage app_props = { window.APP_PROPS }/>,
  mountNode
);
