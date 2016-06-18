"use strict";

var cards = [{
  title: 'Title',
  img: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
  location: 'Here',
  description: 'Event'
},{
  title: 'Title',
  img: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
  location: 'Here',
  description: 'Event'
}]

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('main', {
      title: 'rayos'
    });
  });

  app.get('/home', function(req, res) {
    res.render('home', {
      title: 'Banh mi for Bambi',
      cards: cards
    });
  });
};