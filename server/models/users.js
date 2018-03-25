var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const keys = require('../secret/keys')
const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email field is required']
  },
  username: {
    type: String,
    required: false
  }
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, keys.local.secret);
};

const Users = mongoose.model('Users', userSchema)

module.exports = Users
