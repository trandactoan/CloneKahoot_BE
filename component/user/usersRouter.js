const express = require('express');
let router = express.Router();
const User = require('./userModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST users register form
router.post('/register', async function(req,res,next) {
  let user=new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  try{
    user = await user.save();
    res.status('200').send(user);
  }catch(error){
    res.status('500').send(error);
  }
})

module.exports = router;
