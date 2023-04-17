var express = require('express');
var router = express.Router();

/* GET home page. */
// localhost:3000

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'CSC 317 App',
    name: 'Navjot SIngh',
  });
});



module.exports = router;
