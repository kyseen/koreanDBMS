const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/', async (req, res) => {
  User.find()
    .then(users => res.json(users))
});

router.post('/add', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password:req.body.password
  });
  newUser.save((err, user) => {
    if(err) {
      res.status(400).json(err)
    }
    else {
      res.json({message: 'User Added'})
    }
  })
})

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    User.findOne({'username': username}, function(err, user) {
      if(err){
        res.json({message: err})
      }
      else if (!user) {
        res.json({message: 'user not found'})
      }
      else {
          if(password != user.password)
          {
              res.json({message: 'incorrect password'})
          }
          else {
              res.json({message: 'success'})
          }
      }
    })
  })

  router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    User.findOneAndUpdate({ _id: id },
      req.body,
      { new: true },
      (err, user) => {
        if (err) {
          res.status(400).json(err);
        }
        else {
          res.json({message:'success'});
        }
        
      });
  })

module.exports = router;