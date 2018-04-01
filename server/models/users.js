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
  firstConnection: { 
    type: Boolean,
    default: true
  },
  local: {
    salt: String,
    hash: String
  },
  google: {
    googleID: String,
    token: String,
  }
});

userSchema.methods.setPassword = function(password){
  this.local.salt = crypto.randomBytes(16).toString('hex');
  this.local.hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64, 'sha512').toString('hex');
  return this.local.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, keys.local.secret);
};

const Users = mongoose.model('Users', userSchema)

module.exports = Users
