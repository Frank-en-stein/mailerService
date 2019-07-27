'use strict';

const serverConstants = require('../serverConstants');
const mongoClient = require('mongodb').MongoClient;
const mailTime = require('mail-time');
const Mail = require('./../Entitites/Mail');

function sendMail(req, res, MongoClient = mongoClient, MailTime = mailTime, constants = serverConstants) {
    MongoClient.connect(constants.MONGO_URL, { useNewUrlParser: true }, (error, client) => {
        try {
            const db = client.db(constants.DB_NAME);
            const mailQueue = new MailTime({ ...constants.MAIL_TIME_CLIENT_CONFIG, db });
            var mail = Mail.createMail(req.body);
            mailQueue.sendMail(mail);
            res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    });
}

module.exports = {
    sendMail: sendMail
};
