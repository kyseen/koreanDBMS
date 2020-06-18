
const express = require('express');
const router = express.Router();

// User Model
const ShippingList = require('../../models/ShippingList');
const Items = require('../../models/Items');

// @route   GET api/user
// @desc    Get all users

function add(a, b) {
  return Number(a) + Number(b);
}

// @route   GET api/list
// @desc    Get all shipping lists

router.get('/', (req, res) => {
  ShippingList.find({ complete: { $ne: true } })
    .then(shippinglist => res.json(shippinglist))
});

// @route   GET api/list/completed
// @desc    Get all completed shipping lists

router.get('/completed', (req, res) => {
  console.log("hi");
  ShippingList.find({ complete: { $ne: false } })
    .then(shippinglist => res.json(shippinglist))
});

// @route   DELETE api/list/delete/:id
// @desc    Delete selected shipping lists

router.delete('/delete/:id', function(req, res) {
  ShippingList.deleteOne({ id: req.params.id }, function(err){
    if(!err){
      return res.send('List Deleted');
    }
    else {
      return res.send('Error Deleting List')
    }
  })
})

// @route   PUT api/list/updatelist/:id
// @desc    Update shipping list

router.put('/updatelist/:id', async (req, res) => {
  var item = req.body.items;
  const id = req.params.id;

  var item = req.body.items;
  let array = [];
  let finalarray = [];

  for (i = 0; i < item.length; i++) {
    array.push(item[i]);
  }


  await Promise.all(array.map(async (array) => {
    const doc = await Items.findOne({ "id": array.id }).exec();

    var id = array.id;
    var name = doc.name;
    var price = (doc.price * array.quantity).toFixed(2);
    var weight = (doc.weight * array.quantity).toFixed(2);
    var quantity = array.quantity;

    var i = { name: name, id: id, price: price, weight: weight, quantity: quantity };

    finalarray.push(i);
  }));

  console.log(finalarray)

  var totalprice = 0;
  var totalquantity = 0;

  finalarray.forEach(finalarray => {
    totalprice = add(totalprice, finalarray.price);
    totalquantity = add(totalquantity, finalarray.quantity);
  })

  ShippingList.findOneAndUpdate({ id }, { $set: { items: finalarray, totalquantity: totalquantity, totalprice: totalprice } },
    { new: true },
    (err, finalarray) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(finalarray);
    });

})

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



router.post('/newlist/mobile', async (req, res) => {
  var item = req.body.items;
  let array = [];
  let finalarray = [];

  var jsonparse = JSON.parse(item);


  for (i = 0; i < jsonparse.length; i++) {
    array.push(jsonparse[i])
  }

  await Promise.all(array.map(async (array) => {
    const doc = await Items.findOne({ "barcode": array.barcode }).exec();

    var id = doc.id;
    var name = doc.name;
    var price = (doc.price * array.quantity).toFixed(2);
    var weight = (doc.weight * array.quantity).toFixed(2);
    var quantity = array.quantity;

    var i = { name: name, id: id, price: price, weight: weight, quantity: quantity };
    finalarray.push(i);
  }));

  var totalprice = 0;
  var totalquantity = 0;

  finalarray.forEach(finalarray => {
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
    totalprice: totalprice,
    totalquantity: totalquantity,
    shippingWeight: req.body.shippingWeight
  });
  newShippingList.save().then(shippinglist => res.json(shippinglist));

})

router.post('/newlist', async (req, res) => {

  var item = req.body.items;
  let array = [];
  let finalarray = [];

  for (i = 0; i < item.length; i++) {
    array.push(item[i]);
  }


  await Promise.all(array.map(async (array) => {
    const doc = await Items.findOne({ "id": array.id }).exec();

    var id = array.id;
    var name = doc.name;
    var price = (doc.price * array.quantity).toFixed(2);
    var weight = (doc.weight * array.quantity).toFixed(2);
    var quantity = array.quantity;

    var i = { name: name, id: id, price: price, weight: weight, quantity: quantity };

    finalarray.push(i);
  }));

  var totalprice = 0;
  var totalquantity = 0;

  finalarray.forEach(finalarray => {
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
    totalprice: totalprice,
    totalquantity: totalquantity,
    shippingWeight: req.body.shippingWeight
  });
  newShippingList.save().then(shippinglist => res.json(shippinglist));
});

module.exports = router;