const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

// require('./api/models/db');
require('./server/config/passport');

const authRoutes = require('./server/routes/auth.routes')
const app = express();

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome Home')
})

app.listen(5000, () => {
  console.log('listening on port 5000');
})
