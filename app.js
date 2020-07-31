// import express, cors
const express = require ('express');
const bodyParser = require('body-parser');
const app = express(); 
const cors = require('cors');

// database connection to mongodb at db.js import
require('./database/db');

// calls cors policy
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    app.use(cors());
    next();  
});

// connect to localhost at the 8080 port
app.listen(8080, () => {
    console.log('Server started at port 8080: http://localhost:8080 \nWaiting for MongoDB database...'); 
})

// indicates the use of bodyParser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded ({ extended: false }));

// defines the express use to json
app.use(express.json()); 

// calls the controllers 
require('./controllers/authController')(app);
require('./controllers/companyController')(app);
