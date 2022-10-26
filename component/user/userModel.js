const mongoose = require('mongoose');

const usreSchema= new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  }
})

module.exports= mongoose.model('user',usreSchema);