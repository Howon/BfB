"use strict";

var cards = [{
  creator: 'James',
  id: 1,
  title: 'Title',
  img: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
  address: 'Here',
  description: 'Event',
  lat:47.6282888,
  lon: -122.34286349999998
}, {
  creator: 'Laura',
  id: 2,
  title: 'Title',
  img: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
  address: 'Here',
  description: 'Event'
  lat:47.6287888,
  lon: -122.34280
}, {
  creator: 'Howon',
  id: 3,
  title: 'Title',
  img: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
  address: 'Here',
  description: 'Event'
  lat:47.6281888,
  lon: -122.38280
},{
  creator: 'Howon',
  id: 4,
  title: 'Title',
  img: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
  address: 'Here',
  description: 'Event'
  lat:47.6881888,
  lon: -122.30280
},{
  creator: 'Howon',
  id: 5,
  title: 'Title',
  img: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
  address: 'Here',
  description: 'Event'
  lat:47.6861888,
  lon: -122.33280
},{
  creator: 'Howon',
  id: 6,
  title: 'Title',
  img: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
  address: 'Here',
  description: 'Event'
  lat:47.6861888,
  lon: -122.33980
}]

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('main', {
      title: 'rayos'
    });
  });

  app.get('/home/:id', function(req, res) {
    res.render('home', {
      title: 'Banh mi for Bambi',
      props: {
        cards: cards,
        userID: req.params.id
      }
    });
  });
};