const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
    barcode: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: '0'
    },
    image: {
        type: String
    },
    weight: {
        type: Number,
        default: '0'
    },
    isAvailable: {
        type: Boolean,
        default: true
    }

});

ItemsSchema.plugin(AutoIncrement, {id: 'itemCounter', inc_field: 'id'});


module.exports = mongoose.model('items', ItemsSchema); 