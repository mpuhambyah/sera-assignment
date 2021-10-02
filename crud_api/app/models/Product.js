const mongoose = require("mongoose");

const Product = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Products = mongoose.model('Products', Product);
module.exports = Products;