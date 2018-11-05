const express = require('express'),
compression = require('compression'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
passport = require('passport');
require('dotenv').config();
mongoose.set('useCreateIndex', true);
// On Connection And Error
mongoose.Promise = global.Promise;
mongoose.connect(process.env.PROD_MONGODB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected' + process.env.PROD_MONGODB) },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

// compress all responses
app.use(compression())

// CORS Middleware 
// app.use(cors());
// Additional CORS options
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Routes For App
const jobs = require('./app_api/routes/jobs');
const users = require('./app_api/routes/users');
const upload = require('./app_api/routes/upload');


// Port Number for Heroku deployment
const port = process.env.PORT || 8080;

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/joblists', jobs);
app.use('/users', users);
app.use('/upload', upload);

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
