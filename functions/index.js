const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.status(200).json({
        message: 'helloworld'
    })
})

exports.app = functions.https.onRequest(app);