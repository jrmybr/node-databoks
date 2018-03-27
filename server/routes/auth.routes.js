const express = require('express')
const router = require('express').Router();
const Users = require('../models/users')
const passport = require('passport')
const jwt = require('express-jwt')
const keys = require('../secret/keys')
const auth = jwt({
  secret: keys.local.secret,
  userProperty: 'payload'
})
const API_ROOT = '/api/auth'

router.post(`${API_ROOT}/register/local`, (req, res) => {
  Users.create({
    provider: 'local',
    email: req.body.email,
  }).then(user => {
    user.setPassword(req.body.password);
    user.save();
    res.status(200);
    res.json({
      "token" : user.generateJwt()
    });
  }).catch((err) => {
    res.json(err)
  })
})

// auth with jwt_token
router.post(`${API_ROOT}/login`, (req, res) => {
  passport.authenticate('local', function(err, user, info){
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

})

// router.get('/logout', (req,res) => {
//   res.send('Logout request')
//})

router.get(`${API_ROOT}/profile`, auth, (req, res) => {
  if (!req.payload._id) {
   res.status(401).json({
     "message" : "UnauthorizedError: private profile"
   });
 } else {
   User
     .findById(req.payload._id)
     .exec(function(err, user) {
       res.status(200).json(user);
     });
 }
})

///// GOOGLE /////
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.send('U reached')
})
module.exports = router;
