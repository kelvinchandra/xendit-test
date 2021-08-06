'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../server/app')(db);
const buildSchemas = require('../src/schemas');
const requestInsertRides = require('./data/rides/rides.json');


describe('API tests', () => {
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    requestInsertRides.forEach(element =>{
        describe('Insert /rides',() => {
            it('should return rows', (done) => {
                request(app)
                    .post('/rides')
                    .send(element)
                    .end((err, res) =>{
                        if(err) done(err);
                        console.log('rides response' + JSON.stringify(res));
                        done();
                    });
            });
        });
    });
    describe('GET /rides', () => {
        it('should return arry of rides', (done) => {
            request(app)
                .get('/rides?page=1&limit=3')
                .expect('Content-Type', /json/)
                .end((err, res) =>{
                    if(err) done(err);
                    console.log('rides response' + JSON.stringify(res));
                    done();
                });
        });
    });
    describe('GET /rides/:id', () => {
        it('should return specific rides', (done) => {
            request(app)
                .get('/rides/1')
                .expect('Content-Type', /json/)
                .end((err, res) =>{
                    console.log('rides response' + JSON.stringify(res));
                    done();
                });
        });
    });
    
});