const mailer      = require('express-mailer');
const path        = require('path');
const user        = require(path.join(__dirname, '../../credentials.js'));

// console.log('WHAT',process.env);

module.exports = function(app) {
  mailer.extend(app, {
    from: user.email,
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    transportMethod: 'smtp',
    auth: {
      user: user.email,
      pass: user.pass
    }
  })
}