const express = require('express');
const bcrypt = require("bcrypt");
let router = express.Router();
const User = require('./userModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST users register form
router.post('/register', async function(req,res,next) {
  const email=req.body.email;
  const username=req.body.username;
  const password=req.body.password;
  const test=await User.findOne({email: email});
  console.log("This is the result of test: ", test);
  if(test)
  {
    res.status('500').send('The email aldready exist');
    return;
  }
  const salt = await bcrypt.genSalt(10);
  let user=new User({
    username,
    email,
    password: await bcrypt.hash(password, salt),
  })
  try{
    user = await user.save();
    res.status('200').send(user);
  }catch(error){
    res.status('500').send(error);
  }
})

module.exports = router;
