const express = require('express');
const router = express.Router();

const TrackingCompany = require('../../models/TrackingCompany');

router.get('/', (req, res) => {
    TrackingCompany.find()
      .then(trackingcompany => res.json(trackingcompany))
  });

module.exports = router;