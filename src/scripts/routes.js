"use strict";

var cards = [{
  creator: 'BfB',
  id: 111,
  title: 'Bahn mi for Bambi',
  img: 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xpf1/v/t35.0-12/13453193_10209041526051554_1202634583_o.jpg?oh=8d872a5aaa20458c16c43ff5765190ff&oe=57674FB7&__gda__=1466416038_775e6f551a51b97719670d5cbfd146c1',
  address: 'Union SLU, 905 Dexter Ave N, Seattle, WA 98109',
  description: 'Thank you Bambi for hosting us!',
  lat: 47.628347,
  lon: -122.342862
},{
  creator: 'James',
  id: 1,
  title: 'Cake',
  img: 'http://thejoyofeverydaycooking.com/wp-content/uploads/2012/07/cutweddingcake.jpg',
  address: '602 Galer St Seattle, WA 98109',
  description: 'Leftover birthday cake. Going to throw out if not finished by the end of today',
  lat: 47.632684,
  lon: -122.344589
}, {
  creator: 'Laura',
  id: 2,
  title: 'Pizza',
  img: 'http://bloggery.undergroundeats.com/wp-content/uploads/2013/07/leftover-pizza.jpg',
  address: '1941 Aurora Ave N, Seattle, WA 98109',
  description: 'Few slices left over. Come and take them',
  lat: 47.636837,
  lon: -122.344522
}, {
  creator: 'Zuck',
  id: 6,
  title: 'Pulled Pork',
  img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQhZqVehvjQpOol2hmOvsIkSNA_D0cS-iFE2KtaCunls1N3L43',
  address: '1 Hacker Way, Menlo Park, CA 94025',
  description: 'I screwed up',
  lat: 37.484583,
  lon: -122.147998
}, {
  creator: 'Drake',
  id: 3,
  title: 'Chicken Wings',
  img: 'http://www.tastyislandhawaii.com/images11/bangkok_chef/bangkok_chef_chicken.jpg',
  address: '1813 Westlake Ave N, Seattle, WA 98109',
  description: 'Wings for days',
  lat: 47.635411,
  lon: -122.341110
}, {
  creator: 'Not_Donald',
  id: 4,
  title: 'Chinese',
  img: 'http://s3-media4.fl.yelpcdn.com/bphoto/FAvHZC3fWF96JNSGyNs8uA/348s.jpg',
  address: '1633 Westlake Ave N, Seattle, WA 98109',
  description: 'Accidentally ordered too much. please help',
  lat: 47.633664,
  lon: -122.340768
}, {
  creator: 'Andrew',
  id: 10,
  title: 'Alcohol clearance',
  img: 'http://cf.cravingsofalunatic.com/wp-content/uploads/2013/03/Kitchen-Riffs-Liquor-Cabinet-1.jpg',
  address: '1611 8th Ave N Seattle, WA 98109',
  description: 'Moving soon. Need to clear these asap',
  lat: 47.633419,
  lon: -122.341418
}, {
  creator: 'Harold',
  id: 5,
  title: 'Taco day',
  img: 'http://www.thatchicmom.com/wp-content/uploads/2013/06/moes-catering.jpg',
  address: '500 Fifth Avenue North, Seattle, WA 98109',
  description: 'almost untouched.',
  lat: 47.623697,
  lon: -122.346515
}, {
  creator: 'Rick',
  id: 7,
  title: 'Chinese fried rice & noodle',
  img: 'https://paladinipotpie.files.wordpress.com/2012/07/leftover-chinese-food.jpg',
  address: '1416 Bigelow Ave N Seattle, WA 98109',
  description: 'a lot left over',
  lat: 47.631876,
  lon: -122.348141
}, {
  creator: 'Howon',
  id: 8,
  title: 'Meat and meat',
  img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVnDRD7OQwppo_OYreqtYEwdhjQmJdjqYe8-WADuiVwApzHNhoZQ',
  address: '1518 5th Ave N Seattle, WA 98109',
  description: 'Not that many ppl came to my barbeque. Feel free to take these',
  lat: 47.632827,
  lon: -122.346904
}]

var users = [{
  id: 0,
  img: "http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg",
  name: "Bill",
  lat: 47.6283102,
  lon: -122.3428749
}, {
  id: 1,
  img: "https://i.imgur.com/7aXvXkV.jpg",
  name: "James",
  lat: 47.6861888,
  lon: -122.33980
}, {
  id: 2,
  img: "http://www.billboard.com/files/styles/article_main_image/public/media/drake-hotline-bling-vid-2015-billboard-650.jpg",
  name: "Drake",
  lat: 47.6861888,
  lon: -122.33980
}, {
  id: 3,
  img: "http://media.vanityfair.com/photos/55ddc2f8e8f804624a2ff49c/master/h_590,c_limit/donald-trump-history-hair-ss09.jpg",
  name: "Not_Donald",
  lat: 47.6861888,
  lon: -122.33280
}, {
  id: 4,
  img: "http://www.billboard.com/files/styles/article_main_image/public/media/drake-hotline-bling-vid-2015-billboard-650.jpg",
  name: "Laura",
  lat: 47.6861888,
  lon: -122.33980
}]

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('landing', {
      title: 'BfB'
    });
  });

  app.get('/home/:id', function(req, res) {
    res.render('home', {
      title: 'BfB',
      props: {
        cards: cards,
        users: users,
        userID: req.params.id
      }
    });
  });
};