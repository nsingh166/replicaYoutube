const validator = require('validator');
var db = require('../conf/database');

module.exports = {
  usernameCheck: function (req, res, next) {
    var username = req.body.username.trim();

    // Checks if the username has a length of at least 3 characters
    if (username.length < 3) {
      req.flash('error', 'Username must be 3 or more characters');
    }

    // Checks if the first character of the username is a letter
    if (!/[a-zA-Z]/.test(username.charAt(0))) {
      req.flash('error', 'Username must begin with a character');
    }

    // If there are any error messages in the `req.flash('error')` array,
    // you might want to redirect the user to the '/register' page
    if (req.session.flash.error) {
      res.redirect('/register');
    } else {
      next();
    }
  },
  passwordCheck: function (req, res, next) {//todo
    next();
  },
  emailCheck: function (req, res, next) {next();}, //todo
  tosCheck: function (req, res, next) {next();},//todo
  ageCheck: function (req, res, next) {next();},//todo
  isUsernameUnique: async function (req, res, next) {
    var { username } = req.body;
    try {
      var [rows, fields] = await db.execute(
        `select id from users where username = ?;`,
        [username]
      );
      if (rows && rows.length > 0) {
        req.flash('error', `${username} is already token`);
        return req.session.save(function (err) {
          return res.redirect(`/registration`);
        });
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },
  isEmailUnique: async function (req, res, next) {
    var { email } = req.body;
    try {
      //email check for unique
      var [rows, fields] = await db.execute(
        `select id from users where email = ?;`,
        [email]
      );
      if (rows && rows.length > 0) {
        req.flash('error', `${username} is already token`);
        return req.session.save(function (err) {
          return res.redirect(`/registration`);
        });
      }else{
        next();
      }
    } catch (error) {
      next(error);
    }
  },
};
