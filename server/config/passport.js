const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');

const keys = require('../secret/keys')
const User = require('../models/users')

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email'
}, ( email, password, done) => {
  User.findOne({email: email}).then((currentUser) => {
    if (currentUser) {
      // console.log(currentUser.local.salt, Object.keys(currentUser.local));
      if (currentUser.local.salt === undefined){
        // Si le mail existe déjà mais pas de compte local
        currentUser.setPassword(password);
        currentUser.save();
        return  done(null, currentUser, {token: currentUser.generateJwt()})
        // res.status(200);
        // res.json({
        //   "token" : user.generateJwt()
        // });
      } else {
        return done(null, false, {message: "That mail already exist"});
        // res.status(401);
        // res.json({
        //   "message" : "That mail already exist"
        // });
      }
    } else {
      User.create({
        email: email,
      }).then(newUser => {
        newUser.setPassword(password);
        newUser.save();
        return  done(null, newUser, {token: newUser.generateJwt()})
        // res.status(200);
        // res.json({
        //   "token" : newUser.generateJwt()
        // });
      }).catch((err) => {
        return done(err);
      })
    }
  }).catch(err => {
    return done(err);
  })
}))

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({'google.googleID': profile.id}).then((currentUser) => {
      if(currentUser){
        done(null, currentUser);
      } else {
        User.create({
          email: profile.emails[0].value,
          'google.googleID': profile.id,
          'google.token': accessToken
        }).then((newUser) => {
          console.log('200', newUser.local);
          done(null, newUser)
        }).catch(err => {
          console.log(err);
          done(err, null)
        })
      }
    })
  })
)
