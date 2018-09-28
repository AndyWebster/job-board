const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
passport = require('passport');
const config = require('dotenv').config();
const initializer = require('./app_api/config/initializer')

// On Connection And Error
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL).then(
  () => {console.log('Database is connected' + process.env.DATABASE_URL_PUBLIC) },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

// CORS Middleware 
app.use(cors());

// Routes For App
const jobListRoutes = require('./app_api/routes/joblist.route');
const users = require('./app_api/routes/users');

// Port Number for Heroku deployment
const port = process.env.PORT || 8080;

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/joblists', jobListRoutes);
app.use('/users', users);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./app_api/config/passport')(passport);


// index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})


const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
