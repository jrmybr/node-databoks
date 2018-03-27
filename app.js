const express = require('express');
// const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session      = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose')

const keys = require('./server/secret/keys')
const ApiRoutes = require('./server/routes/index')

const app = express();

mongoose.connect(`mongodb://${keys.mongodb.user}:${keys.mongodb.pass}@ds221339.mlab.com:21339/databoks-test`);
mongoose.Promise = global.Promise;

require('./server/config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: keys.local.secret, // session secret
    resave: true,
    saveUninitialized: true
}));

app.use(ApiRoutes.AuthRouter)

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Welcome Home')
})


app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// require('./server/routes/auth.routes.js')(app, passport);

app.listen(5000, () => {
  console.log('listening on port 5000');
})
