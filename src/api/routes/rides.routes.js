

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

var express = require('express');
var router = express.Router();
const controller = require('../controller/rides.controller');

module.exports = (db) => {
    router.get('/', async (req, res) => {
        const response = await controller.getAllRides(db, req);
        console.log(`response++++ ${response}`);
        res.send(response);
    }),
    router.post('/', jsonParser, async (req, res) =>{
        const response = await controller.insertRide(db, req);
        res.send(response);
    }),
    router.get('/:id', async (req, res) =>{
        const response = await controller.getRidesById(db, req);
        res.send(response);
    });
    return router;
};
