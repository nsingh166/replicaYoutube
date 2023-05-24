var express = require('express');
var router = express.Router();
const db = require('../conf/database');
const { isLoggedIn, isMyProfile } = require('../middleware/auth');

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

router.get('/profile', isLoggedIn, async function (req, res, next) {
  try {
    const userId = req.session.user.userId; // Access the user ID from the session

    const query = `
      SELECT p.id, p.title, p.description, p.thumbnail, p.video, p.createdAt, u.username
      FROM posts p
      JOIN Users u ON p.fk_userId = u.id
      WHERE u.id = ?
      ORDER BY p.createdAt DESC
    `;
    const [rows, fields] = await db.execute(query, [userId]);

    res.render('profile', {
      title: 'Profile',
      css: ['style.css'],
      posts: rows, // Pass the fetched posts to the template
    });
  } catch (error) {
    next(error);
  }
});


router.get('/viewpost', async function (req, res, next) {
  try {
    const postId = req.query.id; // Assuming the id is passed as a query parameter

    console.log('Post ID:', postId);
    
    if (!postId) {
      // Handle case where post ID is missing
      return res.redirect('/'); // Redirect to home page or show an error message
    }

    const query = `
      SELECT p.id, p.title, p.description, p.thumbnail, p.video, p.createdAt, u.username
      FROM posts p
      JOIN Users u ON p.fk_userId = u.id
      WHERE p.id = ?
    `;
    const [rows, fields] = await db.execute(query, [postId]);

    console.log('Rows:', rows);

    if (rows.length === 0) {
      // Handle case where post is not found
      console.log('Post not found');
      return res.redirect('/'); // Redirect to home page or show an error message
    }

    const post = rows[0];

    console.log('Post:', post);

    res.render('viewpost', {
      title: `Viewpost ${post.title}`,
      css: ['style.css'],
      post: post,
    });
  } catch (error) {
    console.error('Error:', error);
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
