var express = require('express');
var router = express.Router();

/* GET home page. */
// localhost:3000

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'CSC 317 App',css:["style.css"] , js:["index.js"],
    name: 'Navjot Singh',
  });
});

router.get('/login', function (req, res) {
  res.render('login', {
    title: 'Login', css:["style.css"] 
  });
});

router.get('/registration', function (req, res) {
  res.render('registration', {
    title: 'Registration',css:["style.css"], js:["valid.js"]
  });
});

router.get('/postvideo', function (req, res) {
  res.render('postvideo', {
    title: 'Postvideo',css:["style.css"] 
  });
});

router.get('/profile', function (req, res) {
  res.render('profile', {
    title: 'Profile',css:["style.css"] 
  });
});

router.get('/viewpost', function (req, res) {
  res.render('viewpost', {
    title: `Viewpost ${req.param.id}`,css:["style.css"] 
  });
});

module.exports = router;
