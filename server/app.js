'use strict';

const express = require('express');
const app = express();

module.exports = (db) => {
    const riderRouter = require('../src/api/routes/rides.routes')(db);
    const healthRouter = require('../src/api/routes/health.routes')();
    app.use('/health',healthRouter);
    app.use('/rides', riderRouter);
    return app;
};

