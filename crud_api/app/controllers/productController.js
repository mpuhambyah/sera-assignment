const Product = require("../models/Product.js");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.getProductsById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

exports.saveProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.updateProduct = async (req, res) => {
    const checkId = await Product.findById(req.params.id);
    if (!checkId) {
        return res.status(404).json({
            message: "Data not found"
        });
    }
    try {
        const updatedProduct = await Product.updateOne({
            _id: req.params.id
        }, {
            $set: req.body
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.deleteProduct = async (req, res) => {
    const checkId = await Product.findById(req.params.id);
    if (!checkId) {
        return res.status(404).json({
            message: "Data not found"
        });
    }
    try {
        const deletedProduct = await Product.deleteOne({
            _id: req.params.id
        });
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}