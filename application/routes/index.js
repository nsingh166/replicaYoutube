var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
var router = express.Router();
const db = require('../conf/database');
/* GET home page. */
// localhost:3000

router.get('/', async function (req, res, next) {
  try {
    const query = `
      SELECT p.id, p.title, p.description, p.thumbnail, p.video, u.username
      FROM posts p
      JOIN Users u ON p.fk_userId = u.id
      ORDER BY p.createdAt DESC
    `;
    const [rows, fields] = await db.execute(query);

    res.render('index', {
      posts: rows,
      title: 'CSC 317 App',
      css: ['style.css'],
      js: ['index.js'],
      name: 'Navjot Singh',
    });
  } catch (error) {
    next(error);
  }
});




router.get('/login', function (req, res) {
  res.render('login', {
    title: 'Login',
    css: ['style.css'],
  });
});

router.get('/registration', function (req, res, next) {
  res.render('registration', {
    title: 'Registration',
    css: ['style.css'],
    js: ['valid.js'],
  });
});

router.get('/postvideo',isLoggedIn, function (req, res) {
  res.render('postvideo', {
    title: 'Postvideo',
    css: ['style.css'],
  });
});

router.get('/profile', function (req, res) {
  res.render('profile', {
    title: 'Profile',
    css: ['style.css'],
  });
});

router.get('/viewpost', async function (req, res, next) {
  try {
    const postId = req.query.id; // Assuming the id is passed as a query parameter

    const query = `
      SELECT p.id, p.title, p.description, p.thumbnail, p.video, p.createdAt, u.username
      FROM posts p
      JOIN Users u ON p.fk_userId = u.id
      WHERE p.id = ?
    `;
    const [rows, fields] = await db.execute(query, [postId]);

    if (rows.length === 0) {
      // Handle case where post is not found
      return res.redirect('/'); // Redirect to home page or show an error message
    }

    const post = rows[0];

    res.render('viewpost', {
      title: `Viewpost ${post.title}`,
      css: ['style.css'],
      post: post,
    });
  } catch (error) {
    next(error);
  }
});


router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
