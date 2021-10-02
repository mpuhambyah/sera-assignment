const express = require("express");
const {
    getProducts,
    getProductsById,
    saveProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController.js");

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductsById);
router.post('/', saveProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router