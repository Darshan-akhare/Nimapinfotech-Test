const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Retrieve all products with pagination
router.get('/', productController.getAllProductsWithPagination);

// Retrieve a single product by ID
router.get('/:id', productController.getProductById);

// Create a new product
router.post('/', productController.createProduct);

// Update a product by ID
router.put('/:id', productController.updateProductById);

// Delete a product by ID
router.delete('/:id', productController.deleteProductById);

module.exports = router;