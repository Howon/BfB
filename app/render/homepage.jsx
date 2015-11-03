require('../stylesheets/style.css');
require('../stylesheets/calendar.css');
require('../stylesheets/classMenuBar.css');
require('../stylesheets/sideBar.css');

import React from 'react';
import HomePage from './pages/HomePage.jsx';

let mountNode = document.getElementById("mount_point");

React.render(
  <HomePage app_props = { window.APP_PROPS }/>,
  mountNode
);
