var express = require('express');
var router = express.Router();
var db = require('../conf/database'); //imported out database user.js
var bcrypt = require('bcrypt');
var { isLoggedIn, isMyProfile } = require('../middleware/auth');
const {
  usernameCheck,
  passwordCheck,
  emailCheck,
  ageCheck,
  tosCheck,
  isUsernameUnique,
  isEmailUnique,
} = require('../middleware/validationMW');

/* GET localhost:3000/users/registration. */
router.post(
  '/registration',
  usernameCheck,
  passwordCheck,
  emailCheck,
  ageCheck,
  tosCheck,
  isUsernameUnique,
  isEmailUnique,
  async function (req, res, next) {
    var { username, email, password } = req.body;
    try {
      var hashedPassword = await bcrypt.hash(password, 3); // this is to hash the password

      // insert into the database
      var [resultObject, fields] = await db.execute(
        `INSERT INTO users
    (username, email, password)
    value (?,?,?);`,
        [username, email, hashedPassword]
      );

      //respond
      if (resultObject && resultObject.affectedRows == 1) {
        req.flash('success', `Account for ${username} was created!`);
        return req.session.save(function (err) {
          return res.redirect(`/login`);
        }); // if the user is made then it will take me to the login page
      } else {
        return res.redirect('/registration'); // if the registration fails then it will take refresh the registration page.
      }
    
    } catch (error) {
      next(error);
    }
  }
);

router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    req.flash("error", `The user name or password is incorrect`);
        req.session.save(function(err){
          return res.redirect('/login');
        });
  } else {
    var [rows, fields] = await db.execute(
      `select id, username, password, email from users where username=?;`,
      [username]
    );

    var user = rows[0];
    if (!user) {
      req.flash("error", `Log In Falied: Invalid username or password`);
      req.session.save(function(err){
        return res.redirect('/login');
      })
    } else {
      
      var passwordsMatch = await bcrypt.compare(password, user.password); // encrypted password
      console.log(`passwordsMatch: ${passwordsMatch}`);
      if (passwordsMatch) {
        req.session.user = {
          //only showing the user id email and username in the terminal for the current login attempt
          userId: user.id,
          email: user.email,
          username: user.username,
        };
        req.flash("success", `You are successfully logged in.`);
        req.session.save(function(err){
          return res.redirect('/profile');
        });
      } else {
        return res.redirect('/login');
      }
    }
  }
});



module.exports = router;
