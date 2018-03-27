const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose')
// require('./server/config/passport');
const passportSetup = require('./server/config/passport')
const keys = require('./server/secret/keys')
const ApiRoutes = require('./server/routes/index')
const app = express();

mongoose.connect(keys.mongodb.url);
// mongoose.connect('mongodb://localhost/databoks');
mongoose.Promise = global.Promise;

//// middleware ////
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(ApiRoutes.AuthRouter);

app.get('/', (req, res) => {
  res.send('Welcome Home')
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
