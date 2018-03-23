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
router.post('/register', (req, res) => {
  Users.create({
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
router.post('/login', (req, res) => {
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

router.get('/profile', auth, (req, res) => {
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

module.exports = router;
