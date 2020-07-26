const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Company = require('../models/company');
const router = express.Router();

router.use(authMiddleware);


router.post('/companies', async (req, res) => {
    try {
        const company = await Company.create(req.body);
        return res.status(200).json({
        message: "Company '"+ company._doc.name +"' created",
        createdByUser: {
            "userId": req.userId,
            "userName": req.userName,
            "userEmail": req.userEmail,
        },
        createdCompany: {
            "id": company._doc._id, 
            "body": req.body
        } 
    });

    }
    catch (err) {
        return res.status(400).send({ error: 'Company creation failed'}); 
    }
});


router.get('/companies', async (req, res) => {
    try {
        const company = await Company.find();
        return res.json({company});
    }
    catch (err) {
        return res.status(400).send({ error: "Couldn't find any companies"}); 
    }
});

router.get('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        return res.status(200).json({
        message: "Company '"+ company._doc.name +"' found",
        getCompanyById: (company)
    });
    }
    catch (err) {
        return res.status(400).send({
            error: "The companyId '"+ req.params.id +"' was not found"
        }); 
    }
});

router.put('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate({ _id: req.params.id}, req.body);
        return res.status(200).json({
            message: "Company usually known as '"+ company._doc.name +"' was edited",
            editedByUser: {
                "userId": req.userId,
                "userName": req.userName,
                "userEmail": req.userEmail,
            },
            editedCompany: 
            {
                "id": company._doc._id,
                "changed": req.body
            } 
        });
    }
    catch (err) {
        return res.status(400).send({
            error: "The companyId '"+ req.params.id +"' couldn't be edited"
        }); 
    }
});

router.delete('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete({ _id: req.params.id});
        return res.status(200).json({
            message: "Company '"+ company._doc.name +"' deleted",
            deletedByUser: {
                "userId": req.userId,
                "userName": req.userName,
                "userEmail": req.userEmail,
            },
            deletedCompany: {
                "id": company._doc._id, 
                "document": company._doc.document, 
                "address": company._doc.address
            } 
        });
    }
    catch (err) {
        return res.status(400).send({
            error: "The companyId '"+ req.params.id +"' couldn't be deleted",
        }); 
    }
});

module.exports = app => app.use('/core', router);