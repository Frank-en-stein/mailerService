'use strict';
const nodemailer = require('nodemailer');
const MailTime = require('mail-time');

module.exports = {
    PORT: 80,
    HOST: '0.0.0.0',
    MONGO_URL: 'mongodb://mongo:27017/mailerdb',
    DB_NAME: 'mailerdb',

    MAIL_TIME_CLIENT_CONFIG: {
        type: 'client',
        strategy: 'balancer', // Transports will be used in round robin chain
        concatEmails: true // Concatenate emails to the same address
    },
    MAIL_TIME_SERVER_CONFIG: {
        type: 'server',
        strategy: 'balancer', // Transports will be used in round robin chain
        transports: [
            nodemailer.createTransport({
                host: 'smtp.gmail.com',
                from: 'smfaisal1648@gmail.com',
                auth: {
                    user: 'smfaisal1648@gmail.com',
                    pass: 'ECC512bit'
                }
            })
        ],
        from(transport) {
            // To pass spam-filters `from` field should be correctly set
            return '"Event Mailer" <' + transport.options.from + '>';
        },
        concatEmails: true, // Concatenate emails to the same addressee
        concatDelimiter: '<h1>{{{subject}}}</h1>', // Start each concatenated email with it's own subject
        template: MailTime.Template // Use default template
    }
};
