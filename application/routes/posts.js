var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../conf/database');
const { makeThumbnail } = require('../middleware/posts');
const { isLoggedIn } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/videos/uploads');
  },
  filename: function (req, file, cb) {
    var fileExt = file.mimetype.split('/')[1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
  },
});

const upload = multer({ storage: storage });
router.use(express.static('public'));


// Define the route for the home page
router.get('/', async (req, res, next) => {
  try {
    // Fetch posts from the database
    const [rows, fields] = await db.execute('SELECT * FROM posts');

    // Pass the posts data to the index view
    res.render('index', { posts: rows });
  } catch (error) {
    next(error);
  }
});

//this is going to upload the file first and then make the thumbnail
router.post(
    "/create",
    isLoggedIn,
    upload.single("uploadVideo"),
    makeThumbnail,
    async function (req, res, next) {
      var { title, description } = req.body;
      var { path, thumbnail } = req.file;
      // After the line `var { path, thumbnail } = req.file;`

      var { userId } = req.session.user;

      console.log('Thumbnail length:', thumbnail.length);
      try {
        var [insertResult, _] = await db.execute(
          `INSERT INTO posts (title, description, video, thumbnail, fk_userId) VALUES (?,?,?,?,?)`,
          [title, description, path, thumbnail, userId]
        );
        if (insertResult && insertResult.affectedRows) {
          req.flash("success", "Your post was created!");
          req.session.save(function (error) {
            if (error) return next(error);
            setTimeout(() => {
              return res.redirect("/");
            }, 2000);
          });
        } else {
          throw new Error('Post could not be created');
        }
      } catch (error) {
        console.error(error); // Log the error to the console for debugging purposes
        next(error);
      }
    }
  );
  
  
router.get('/search', function (req, res, next) {});

router.delete('/delete', function (req, res, next) {
  
});
module.exports = router;
