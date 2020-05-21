const express = require('express');
const router = express.Router();

// User Model
const TrackingCompany = require('../../models/TrackingCompany');

// @route   GET api/user
// @desc    Get all users
router.get('/', (req, res) => {
    TrackingCompany.find()
    .then(trackingcompany => res.json(trackingcompany))
});

// @route   POST api/user
// @desc    Create a user
router.post('/addtrackingcompany', (req, res) => {
    const newTrackingCompany = new TrackingCompany({
        companyName: req.body.companyName,
        websiteurl: req.body.websiteurl,
        phonenumber: req.body.phonenumber
    });
    newTrackingCompany.save().then(trackingcompany => res.json(trackingcompany));

});

module.exports = router;