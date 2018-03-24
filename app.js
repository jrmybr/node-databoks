const express = require('express');
// const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const mongoose = require('mongoose')
// require('./server/config/auth0');

// const ApiRoutes = require('./server/routes/index')
const app = express();

// mongoose.connect('mongodb://localhost/databoks');
// mongoose.Promise = global.Promise;

// app.use(bodyParser.json());
app.set('view engine', 'html')
// app.use(passport.initialize());
// console.log(ApiRoutes);
// app.use(ApiRoutes.AuthRouter);
app.get('/home', (req, res) => {
  res.sendFile(`${__dirname}/server/views/home.html`)
})

app.get('/profile', (req, res) => {
  res.sendFile(`${__dirname}/server/views/profil.html`)
})
// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401);
//     res.json({"message" : err.name + ": " + err.message});
//   }
// });

app.listen(5000, () => {
  console.log('listening on port 5000');
})
