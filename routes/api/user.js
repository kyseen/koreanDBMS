const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
// @route   GET api/user
// @desc    Get all users
router.get('/', (req, res) => {
    User.find()
        .then(user => res.json(user))
});

// @route   POST api/user
// @desc    Create a user

router.post('/login', (req, res, next) => {
    const { body } = req;
    let { username } = body;
    const { password } = body;

    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }

    username = username.toLowerCase();

    User.find({ username: username }, (err, users) => {
        if (err) {
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Incorrect Password'
            });
        }
        // Otherwise correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            });
        });
    });


})

router.post('/register', (req, res, next) => {
    const { body } = req;
    let { username } = body;
    const { password } = body;

    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }

    username = username.toLowerCase();

    User.find({ username: username }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            });
        }

        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error' + err
                });
            }
            return res.send({
                success: true,
                message: 'Signed up'
            });
        });
    });
})



module.exports = router;