const { logger } = require('../../utils/logger.utils');

async function insertRider(db, params ) {
    logger.info(params);
    const { body } = params;
    const startLatitude = Number(body.start_lat);
    const startLongitude = Number(body.start_long);
    const endLatitude = Number(body.end_lat);
    const endLongitude = Number(body.end_long);
    const riderName = body.rider_name;
    const driverName = body.driver_name;
    const driverVehicle = body.driver_vehicle;

    if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
        return {
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
        };
    }

    if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
        return {
            error_code: 'VALIDATION_ERROR',
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
        };
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
        return {
            error_code: 'VALIDATION_ERROR',
            message: 'Rider name must be a non empty string'
        };
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
        return {
            error_code: 'VALIDATION_ERROR',
            message: 'Rider name must be a non empty string'
        };
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
        return {
            error_code: 'VALIDATION_ERROR',
            message: 'Rider name must be a non empty string'
        };
    }

    var values = [body.start_lat, body.start_long, body.end_lat, body.end_long, body.rider_name, body.driver_name, body.driver_vehicle];
    
    const result = db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
        if (err) {
            return {
                error_code: 'SERVER_ERROR',
                message: 'Unknown error'
            };
        }

        db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
            if (err) {
                return {
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                };
            }
            console.log(`print rows ${rows}`);
            return rows;
        });
    });

}

async function getAllRides(db, limit, page ){
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = page * limit;
    db.all(`SELECT * FROM Rides LIMIT ${limit}${offset}`,  function (err, rows) {
        if (err) {
            return {
                error_code: 'SERVER_ERROR',
                message: 'Unknown error'
            };
        }

        if (rows.length === 0) {
            return {
                error_code: 'RIDES_NOT_FOUND_ERROR',
                message: 'Could not find any rides'
            };
        }
        const response = {
            ...rows,
            'pagination':{
                limit,
                page
            }
        };
        console.log(`print rows ${JSON.stringify(response)}`);
        return response;
    });

}

async function getRidesById(db, ridesID ){
    db.all(`SELECT * FROM Rides WHERE rideID='${ridesID}'`, function (err, rows) {
        if (err) {
            return {
                error_code: 'SERVER_ERROR',
                message: 'Unknown error'
            };
        }

        if (rows.length === 0) {
            return {
                error_code: 'RIDES_NOT_FOUND_ERROR',
                message: 'Could not find any rides'
            };
        }

        return rows;
    });

}

module.exports =  {
    insertRider,
    getAllRides,
    getRidesById

};

