const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const ShippingListSchema = new Schema({
    companyname: {
        type: String
    },
    address: {
        type: String
    },
    items: [{
        id: {type: Number},
        name: {type: String},
        quantity: {type: Number},
        weight: {type: Number},
        price: {type: Number}
    }],
    totalweight: {
        type: Number,
        default: 0.00
    },
    totalquantity: {
        type: Number,
        default: 0.00
    },
    totalprice: {
        type: Number,
        default: 0.00
    },
    packingDate: {
        type: Date,
        default: Date.now
    },
    shippingDate: {
        type: Date, 
        default: Date.now
    },
    trackingCompany: {
        type: Schema.Types.ObjectId
    },
    trackingNumber: {
        type: String,
        default: 123334
    },
    complete: {
        type: Boolean,
        default: false
    }
});

ShippingListSchema.plugin(AutoIncrement, {id: 'shippinglistCounter', inc_field: 'id'});

module.exports = mongoose.model('shippinglist', ShippingListSchema); 
