// import express, mongoose, mongodb, cors
const express = require ('express');
const app = express(); 
const mongoose = require('mongoose'); 
const cors = require('cors')
const { Timestamp, Db, ObjectID, ObjectId } = require('mongodb');
const { documentSchemaSymbol } = require('mongoose/lib/helpers/symbols');

// model companies.js import
require ('./models/companies')
const Companies = mongoose.model('companies'); 

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

// sets the database connection info
mongoose.connect('mongodb://localhost/beetapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('The request to MongoDB was successfully completed.')
}). catch((error) =>{
    console.log('The MongoDB database connection failed.')
});

// defines the express use to json
app.use(express.json()); 

// get all companies
app.get('/companies', (req, res) => {
    Companies.find({}, (error, company) => {
        if (error || !company) {
            return res.status(400).json({
                error: true,
                message: "Couldn't find any companies"
            });
        }
        return res.json(company) 
    });
    });

// get company by id
app.get('/companies/:id', (req, res) => {
Companies.findById(req.params.id, (error, company) => {
    if (error || !company) {
        return res.status(400).json({
            error: true,
            message: "The companyId '"+ req.params.id +"' couldn't be found"
        });
    }
    return res.status(200).json({
        error: false,
        message: "Company '"+ company._doc.name +"' found",
        getCompanyById: (company)
    });
});
});

// create a company
app.post('/companies', (req, res) => {
Companies.create(req.body, (error, company) => {
    if (error) {
        return res.status(400).json({
            error: true,
            message: "Company creation error: Not Created"
        });
    }
    return res.status(200).json({
        error: false,
        message: "Company '"+ company._doc.name +"' created",
        createdCompany: {
            "id": company._doc._id, 
            "body": req.body
        } 
    });
});  
});

// edit a company by id
app.put('/companies/:id', (req, res) => {
    Companies.findByIdAndUpdate({ _id: req.params.id}, req.body, (error, company) => {
        if (error || !company) {
            return res.status(400).json({
            error: true,
            message: "The companyId '"+ req.params.id +"' couldn't be found"
        });
    }
        return res.status(200).json({
            error: false,
            message: "Company '"+ company._doc.name +"' edited",
            editedCompany: 
            {
                "id": company._doc._id,
                "body": req.body
            } 
        });
    });
});

// delete a company by id
app.delete('/companies/:id', (req, res) => {
    Companies.findByIdAndDelete({ _id: req.params.id}, (error, company) => {
        if (error || !company) {
            return res.status(400).json({
            error: true,
            message: "The companyId '"+ req.params.id +"' couldn't be deleted"
        });
    }
        return res.status(200).json({
            error: false,
            message: "Company '"+ company._doc.name +"' deleted",
            deletedCompany: {
                "id": company._doc._id, 
                "document": company._doc.document, 
                "address": company._doc.address
            } 
        });
    });
});