var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var rout=require('./routes');

app.use(favicon(path.join(__dirname, 'public/app', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public/app')));
app.use(logger('dev'));
app.use(rout);

app.get('*', function(req, res) {
  res.sendFile('./public/app/index.html');
});

module.exports = app;
