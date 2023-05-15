var express = require('express');
var router = express.Router();
var db = require('../conf/database'); //imported out database user.js
var bcrypt = require('bcrypt');

/* GET localhost:3000/users/registration. */
router.post('/registration', async function (req, res, next) {
  var { username, email, password } = req.body;
        
  // check username unqiue
  try {
    //username check for unique
    var [rows, fields] = await db.execute(
      `select id from users where username = ?;`,
      [username]
    );

   
    if (rows && rows.length > 0) {
      return res.redirect(`/registration`);
    }

    //email check for unique
    var [rows, fields] = await db.execute(
      `select id from users where email = ?;`,
      [email]
    );

    if (rows && rows.length > 0) {
      return res.redirect(`/registration`);
    }


    var hashedPassword = await bcrypt.hash(password, 3); // this is to hash the password

    // insert
    var [resultObject, fields] = await db.execute(
      `INSERt INTO users
    (username, email, password)
    value (?,?,?);`,
      [username, email, hashedPassword]
    );

    //respond
    if (resultObject && resultObject.affectedRows == 1) {
      return res.redirect('/login'); // if the user is made then it will take me to the login page
    } else {
      return res.redirect('/registration'); // if the registration fails then it will take refresh the registration page.
    }
    console.log(rows);
  } catch (error) {

    next(error);
  }
});

router.post('/login', async function (req, res, next) {
  
  const { username, password } = req.body;
console.log("DATA INFORMATION", req.body);
  if (!username || !password) {
    console.log('fooo',rows);
    return res.redirect('/login');
  } else {
    var [rows, fields] = await db.execute(
      `select id, username, password, email from users where username=?;`,
      [username]
    );
    console.log('fooo',rows);

    var user = rows[0];
    if (!user) {
      return res.redirect('/login');
    } else {
      var passwordsMatch = await bcrypt.compare(password, user.password); // encrypted password
      console.log(`passwordsMatch: ${passwordsMatch}`);
      if (passwordsMatch) {
        return res.redirect("/profile");
       
      } else {
        return res.redirect('/login');
      }
    }
  }
});


router.post('/logout', function (req, res, next) {

});
module.exports = router;

