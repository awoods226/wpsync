const express = require('express');
const os = require('os');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const fetchOldPages = require('./routes/fetchOldPages');
const displayOldPages = require('./routes/displayOldPages');
const movePages = require('./routes/movePages');
const displayNewPages = require('./routes/displayNewPages');
const fetchNewPages = require('./routes/fetchNewPages');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const app = express();

require('dotenv').config();

app.use(morgan('combined', { stream: accessLogStream }));
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static('dist'));
app.use('/fetchOldPages', fetchOldPages);
app.use('/displayOldPages', displayOldPages);
app.use('/movePages', movePages);
app.use('/displayNewPages', displayNewPages);
app.use('/fetchNewPages', fetchNewPages);
app.get('/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(8081, () => console.log('Listening on port 8081!'));
