const express = require('express');
const router = express.Router();

// User Model
const ShippingList = require('../../models/ShippingList');
const Items = require('../../models/Items');

// @route   GET api/user
// @desc    Get all users
router.get('/', (req, res) => {
  ShippingList.find({complete: {$ne: true}})
    .then(shippinglist => res.json(shippinglist))
});

router.get('/completed', (req, res) => {
  ShippingList.find({complete: {$ne: false}})
    .then(shippinglist => res.json(shippinglist))
});

// @route   POST api/user
// @desc    Create a user

router.put('/update/:id', (req, res) => {
  const id = req.params.id;

  ShippingList.findOneAndUpdate({ id },
    req.body,
    { new: true },
    (err, item) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(item);
  });
})

function add(a, b){
  return Number(a)+Number(b);
}

router.post('/newlist', async (req, res) => {

    var item = req.body.items;
    let array = [];
    let finalarray = [];

    for (i = 0; i < item.length; i++) {
      array.push(item[i]);
    }


    await Promise.all(array.map(async (array) => {
        const doc = await Items.findOne({"id":array.id}).exec();
        
        var id = array.id;
        var name = doc.name;
        var price = (doc.price * array.quantity).toFixed(2);
        var weight = (doc.weight * array.quantity).toFixed(2);
        var quantity = array.quantity;

        var i ={name: name, id: id, price: price, weight: weight, quantity: quantity};
        
        finalarray.push(i);
      })
    );

    var totalweight = 0;
    var totalprice = 0;
    var totalquantity = 0;

    finalarray.forEach(finalarray => {
      totalweight = add(totalweight, finalarray.weight);
      totalprice = add(totalprice, finalarray.price);
      totalquantity = add(totalquantity, finalarray.quantity);
    })

    const newShippingList = new ShippingList({
      companyname: req.body.companyname,
      address: req.body.address,
      items: finalarray,
      packingDate: req.body.packingDate,
      shippingDate: req.body.shippingDate,
      trackingCompany: req.body.trackingCompany,
      trackingNumber: req.body.trackingNumber,
      complete: req.body.complete,
      totalweight: totalweight,
      totalprice: totalprice, 
      totalquantity: totalquantity
    });
    newShippingList.save().then(shippinglist => res.json(shippinglist));
    

});

module.exports = router;