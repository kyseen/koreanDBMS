const express = require('express');
const router = express.Router();

// User Model
const Items = require('../../models/Items');

// @route   GET api/user
// @desc    Get all users
router.get('/', (req, res) => {
    Items.find()
    .then(items => res.json(items))
});

router.get('/available', (req, res) => {
  Items.find({isAvailable: {$ne: false}})
  .then(items => res.json(items))
});

// @route   POST api/user
// @desc    Create a user
router.post('/additem', (req, res) => {
    const newItem = new Items({
        barcode: req.body.barcode,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        weight: req.body.weight,
        isAvailable: req.body.isAvailable
    });
    newItem.save((err, item) => {
      if (err) {
        res.status(400).json(err)
      }
      res.json(item)
    });
});

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    Items.findOneAndUpdate({ id },
      req.body,
      { new: true },
      (err, item) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(item);
    });
})

module.exports = router;