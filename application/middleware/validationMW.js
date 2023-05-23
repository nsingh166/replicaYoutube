var validator = require('validator');
var db = require('../conf/database');

module.exports = {
  //to keep track of these
  usernameCheck: function (req, res, next) {
    var { username } = req.body.username;
    username = username.trim(); //to make sure there is no spaces before or after the username
    
    if (!validator.islength(username, { min: 3 })) {
      req.flash('error', 'username must be 3 or more characters');
    }
    if (!/[a-zA-Z]/.test(username.charAt(0))) {
      req.flash('error', 'Username must begin with a character');
    }
    if (req.session.flash.error) {
      req.redirect('/register');
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
