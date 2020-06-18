const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackingCompanySchema = new Schema({
    companyName: {
        type: String
    },
    websiteurl: {
        type: String
    },
    phonenumber: {
        type: String
    }
});

module.exports = TrackingCompany = mongoose.model('trackingcompany', TrackingCompanySchema); 