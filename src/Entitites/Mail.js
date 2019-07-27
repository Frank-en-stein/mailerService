'use strict';

module.exports = class Mail {
    constructor(to = '', subject = '', text = '') {
        this.to = to;
        this.subject = subject;
        this.text = text;
    }

    static createMail(fromObject) {
        var tmp = new Mail();
        for (var key in tmp) {
            if (fromObject.hasOwnProperty(key) === false) {
                throw 'Cannot create Mail object from provided object';
            }
            tmp[key] = fromObject[key];
        }
        return tmp;
    }
};
