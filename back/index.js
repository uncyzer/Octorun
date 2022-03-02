// Prerequisites
const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise');
const {Pool, Client} = require('pg')
const db = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
});
const PORT = 3002;

// Initialization
require('dotenv').config();
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Request handler
app.all('*', function(req, res, next){
    console.log('🔵 called route ' + req.originalUrl);
    next();
});
app.listen(process.env.PORT, () => {
    console.log(`Listening on localhost:${process.env.PORT}`)
});