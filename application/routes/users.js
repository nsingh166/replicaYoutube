var express = require('express');
var router = express.Router();
var db = require('../conf/database'); //imported out database user.js


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

    console.log(rows);
    if (rows && rows.length > 0) {
      return res.redirect(`/registration`);
    }

    //email check for unique
    var [rows, fields] = await db.execute(
      `select id from users where email = ?;`,
      [email]
    ); 

    console.log(rows);
    if (rows && rows.length > 0) {
      return res.redirect(`/registration`);
    }
    console.log(username, email, password);

  // insert
    var [resultObject, fields] = await db.execute(
      `INSERt INTO users
    (username, email, password)
    value (?,?,?);`,
      [username, email, password]
    );

    //respond
    if (resultObject && resultObject.affectedRows == 1) {
      return res.redirect('/login');
    } else {
      return res.redirect('/registration');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

/*
  db.query('select * from posts;' , function(error, rows){
    if(error){
      next(error);
    }
    res.status(200).json({rows});
  })
  try{
    let[rows, fields] = await db.query(`select * from users;`);
    res.status(200).json({rows, fields})
  }catch(error){
    next(error);
  }*/
