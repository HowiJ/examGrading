const bodyParser  = require('body-parser');
const express     = require('express');
const mailer      = require('express-mailer');
const path        = require('path');
const port        = require(path.join(__dirname, './server/config/settings.js')).port;
const app         = express();

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

require(path.join(__dirname, './server/config/mailer.js'))(app);


app.get('/email', (req, res) => {
  res.render('email');
})

app.get('/email/send', (req, res) => {
  console.log('Attempting to send email...');
  app.mailer.send('email', {
    to: 'howard.yunghao.jiang@gmail.com',
    subject: 'Belt Exam Results'
  }, function (err, message) {
    if (err) {
      console.log(err);
    }
    // res.send('Email sent');
    res.send(message)
  })
})
app.post('/email/send', (req, res) => {
  console.log(req.body);
  console.log('Attempting to send email...');
  app.mailer.send('email', {
    to: req.body.email,
    subject: 'Belt Exam Results',
    comments: req.body.comments,
    name: req.body.name,
    score: req.body.score,
    stack: req.body.stack
  }, function (err, message) {
    if (err) {
      console.log(err);
    }
    // res.send('Email sent');
    res.send(message)
  })
})




app.listen(port, () => {
  console.log(`Exam app on ${port}`)
})