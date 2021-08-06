
const logger = require('../../utils/logger.utils');
const riderService = require('../service/rides.service');

function getAllRides(db, req){
    const { query } = req;
    console.log(`limit ${req.query}`);
    const response = riderService.getAllRides(db, query.limit, query.page);
    console.log(`response ${JSON.stringify(response)}`);
    return response;
}

async function getRidesById(db, req){
    const { params } = req;
    const response = await riderService.getRidesById(db, params.id);
    return response;
}

async function insertRide(db, req){
    const response = await riderService.insertRider(db, req);
    return response;
}

  

module.exports = {
    getAllRides,
    getRidesById,
    insertRide
};