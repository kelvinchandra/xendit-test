const winston = require('winston');
let mydate = new Date();
let newFilename = mydate.getFullYear() + '-' + mydate.getMonth() + '-' + mydate.getDate() + '-' + 'xendit-test.log';
const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: `logs/${newFilename}`
        })
    ]
};

const logger = winston.createLogger(logConfiguration);

module.exports = {
    logger
};