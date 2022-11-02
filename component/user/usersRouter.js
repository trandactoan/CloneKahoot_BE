const express = require('express');
const bcrypt = require("bcrypt");
let router = express.Router();
const User = require('./userModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(User.find());
});

// GET user by id
router.get('/id', async function(req,res,next) {
  const user=await User.findOne({_id: req.query._id});
  res.status('200').send(user)
})


// POST users register form
router.post('/register', async function(req,res,next) {
  const email=req.body.email;
  const username=req.body.username;
  const password=req.body.password;
  const test=await User.findOne({email: email});
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

//POST users login form
router.post('/login', async function(req,res,next) {
  const userData = req.body;
  const user = await User.findOne({ email: userData.email });
  if (user) {
    const checkPassword = await bcrypt.compare(userData.password, user.password);
    if (checkPassword) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(400).json({ error: "User does not exist" });
  }
})

module.exports = router;
