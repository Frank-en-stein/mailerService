'use strict';

module.exports = function(app) {
    var reqHandler = require('../controllers/mailerController');

    app.route('/mail/send').put((req, res) => reqHandler.sendMail(req, res));

    app.route('/').get((req, res) => res.send('Hi'));
};
