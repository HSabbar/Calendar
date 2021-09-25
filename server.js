const express = require('express');
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
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
	console.log('connected to mongodb');
})
.then(() => console.log('server running at 3300'))
.catch(err => console.log(err.message));

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});