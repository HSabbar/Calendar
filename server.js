const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
require('./utils/db.config');

const app = express();



const config = require('./webpack.config.js');
//const router = require('./routes/router');
const compiler = webpack(config);
const Rdv = require('./models/RendezVous');
const flasherMiddleware = require('./middlewares/flasherMiddleware')
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));



app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);
app.use(session({
  secret: 'db74f661bc4e3fbc683b5e28c32f2185f39934a4d2f9283559',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use('/dist', express.static('dist'));
//app.use('/', router)
app.locals.message = {}

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/test/calendar',flasherMiddleware,async (req, res) => {
  const rdvs = await Rdv.find();
	req.session.body = rdvs;
  res.status(200).json(rdvs);
});

app.get('/calendar',flasherMiddleware,async (req, res) => {
  const rdvs = await Rdv.find();
	req.body = rdvs;
  res.status(200).render('calendar',rdvs);
});

app.post('/calendar', async (req, res, next) => {
  console.log(req.flashData);
  const body = req.body;
  const { calendarId, title, isAllDay, start, end, category, bgColor, location } = body;

const newRdv = new Rdv({ calendarId, title, isAllDay, start, end, category, bgColor, location });
try {
  await newRdv.save();
  req.session.flashData = { 
    message: {
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2021-09-28T22:30:00+09:00',
        end: '2021-09-28T02:30:00+09:00'
    }
  };
  //res.redirect('/calendar');
} catch(error) {
  error.status = 400;
  next(error);
}
});

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});