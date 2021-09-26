const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');

const app = express();



const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);
app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/calendar', (req, res) => {
  return res.render('calendar')
})

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
	console.log('connected to mongodb');
})
.then(() => console.log('server running at 3300'))
.catch(err => console.log(err.message));

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});