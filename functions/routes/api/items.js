const express = require('express');
const router = express.Router();

// Item Model
const Items = require('../../models/Items');

router.get('/', async (req, res) => {
  Items.find()
    .then(items => res.json(items))
});

router.get('/available', (req, res) => {
  Items.find({ isAvailable: { $ne: false } })
    .then(items => res.json(items))
});

router.post('/additem', async (req, res) => {
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
    else {
      res.json({message: 'Item Added'})
    }
    
  });
});

router.post('/exists', (req, res) => {
  const barcode = req.body.barcode;

  Items.findOne({'barcode': barcode}, function(err, item) {
    if(err){
      res.json({message: err})
    }
    else if (!item) {
      res.json({message: 'false'})
    }
    else {
      res.json({message: 'true'})
    }
  })
})

router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  Items.findOneAndUpdate({ id },
    req.body,
    { new: true },
    (err, item) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json({message: `${item.name} has been updated`});
    });
})

module.exports = router;