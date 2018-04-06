const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan')
const passportSetup = require('./server/config/passport')
const keys = require('./server/secret/keys')
const ApiRoutes = require('./server/routes/index')

const app = express();

mongoose.connect(keys.mongodb.url);
// mongoose.connect('mongodb://localhost/databoks');
mongoose.Promise = global.Promise;

//// middleware ////
app.use(morgan('combined'))
app.use(bodyParser.json());

app.use(cors(
    { 'origin': 'http://localhost:8080',
      'allowedHeaders': ['sessionId', 'Content-Type'],
      'exposedHeaders': ['sessionId'],
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      'preflightContinue': true,
      'credentials': true
    }
  )
)
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Welcome Home')
})

app.use(ApiRoutes.AuthRouter);
app.use(ApiRoutes.ProfileRouter);

app.listen(5000, () => {
  console.log('listening on port 5000');
})
