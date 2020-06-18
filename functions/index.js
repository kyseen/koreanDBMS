const functions = require('firebase-functions');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const user = require('./routes/api/user');
const items = require('./routes/api/items');
const trackingcompany = require('./routes/api/trackingcompany');
const shippinglist = require('./routes/api/shippinglist');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

// Use Routes

app.use(cors());
app.use('/api/user', user);
app.use('/api/items', items);
app.use('/api/tracking', trackingcompany);
app.use('/api/list', shippinglist);

//const port = process.env.PORT || 3000;

//app.listen(port, () => console.log(`Server started on port ${port}`));

exports.app = functions.https.onRequest(app);