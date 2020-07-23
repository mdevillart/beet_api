const express = require ('express');
const app = express(); 
const mongoose = require('mongoose'); 
const { Timestamp, Db, ObjectID, ObjectId } = require('mongodb');
const { documentSchemaSymbol } = require('mongoose/lib/helpers/symbols');
// import express, mongoose, mongodb

require ('./models/companies')
const Companies = mongoose.model('companies'); 
// model companies.js import

app.listen(8080, () => {
    console.log('Server started at port 8080: http://localhost:8080 \nWaiting for MongoDB database...'); 
})
// conect to localhost at the 8080 port

mongoose.connect('mongodb://localhost/beetapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('The request to MongoDB was successfully completed.')
}). catch((error) =>{
    console.log('The MongoDB database connection failed.')
});
// sets the database connection info

app.use(express.json()); 
// defines the express use to json

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
// get all companies

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
// get company by id 

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
        createCompany: {"id": company._doc._id, "body": req.body} 
    });
});  
});

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
            message: "Company '"+ company._doc.name +"' editada",
            editCompany: {"id": company._doc._id, "body": req.body} 
        });
    });
});

// post create company profile