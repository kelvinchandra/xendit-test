

var express = require('express');
var router = express.Router();

module.exports = () => {
    router.get('/', async (req, res) => {
        res.send('Healthy');
    });
    return router;
};
