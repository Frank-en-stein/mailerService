'use strict';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const MailTime = require('mail-time');
const bodyParser = require('body-parser');

const serverConstants = require('./src/serverConstants');

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./src/routes/routes');
routes(app);

MongoClient.connect(serverConstants.MONGO_URL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log(error);
        return;
    }
    const db = client.db(serverConstants.DB_NAME);
    const mailQueue = new MailTime({ ...serverConstants.MAIL_TIME_SERVER_CONFIG, db });
});

app.listen(serverConstants.PORT, serverConstants.HOST);
console.log(`Running mailerService on http://${serverConstants.HOST}:${serverConstants.PORT}`);
