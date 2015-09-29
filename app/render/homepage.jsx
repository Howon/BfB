require('../stylesheets/style.css');

import React from 'react';
import HomePage from './pages/HomePage.jsx';

let mountNode = document.getElementById("mount_point");

React.render(
  <HomePage />,
  mountNode
);
