const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//Import Routes
const users = require('./routes/api/users.route');
const movies = require('./routes/api/movies.route');

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys.config').MongoURI;

//Connect ot mongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Mongo Db connected'))
  .catch((err) => console.log(err));

// Passport MiddleWare
app.use(passport.initialize());

//Passport Config
require('./config/passport.config')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/movies', movies);

// serve static assets if in Production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client1/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client1', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port: ${port}`));
