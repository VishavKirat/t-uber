const express = require('express');
const bodyParser = require('body-parser');
const signInController = require('./controllers/signInController');
const profileController = require('./controllers/profileController');
const homeController = require('./controllers/homeController')
const tutorController = require('./controllers/tutorController')
const viewallController = require('./controllers/viewallController')
const firebase = require('firebase');
const logger = require('morgan');
const socket = require('socket.io');


const app = express();
app.use('/assets',express.static('assets'));
app.use('/tutor/assets',express.static('assets'));
app.use(logger('dev'));
app.use('/controllers',express.static('controllers'));
app.use('/tutor/controllers',express.static('controllers'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var config = {
  apiKey: "AIzaSyD-JDEMg3NhyE7xpwgvRLSHKR8t6gbODh4",
  authDomain: "t-uber-database.firebaseapp.com",
  databaseURL: "https://t-uber-database.firebaseio.com",
  projectId: "t-uber-database",
  storageBucket: "t-uber-database.appspot.com",
  messagingSenderId: "300449223346"
};
signInController(app);
homeController(app);
profileController(app);
tutorController(app);
viewallController(app);
console.log('App is running');
var port = process.env.PORT || 8080
var server = app.listen(port);
const io = socket(server);

io.on('connection',function(socket){
  console.log(socket.id);
});
