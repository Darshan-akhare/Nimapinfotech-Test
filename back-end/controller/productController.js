const Product = require('../models/productModel');

// Get all products with pagination
exports.getAllProductsWithPagination = (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  Product.getAllWithPagination(page, pageSize, (err, products) => {
    if (err) {
      res.status(500).json({ message: err.message || 'Some error occurred while retrieving products.' });
    } else {
      res.json(products);
    }
  });
};

// Get a single product by ID
exports.getProductById = (req, res) => {
  const productId = req.params.id;
  Product.getById(productId, (err, product) => {
    if (err) {
      res.status(404).json({ message: err.message || 'Product not found.' });
    } else {
      res.json(product);
    }
  });
};

// Create a new product
exports.createProduct = (req, res) => {
  // Validate request
  if (!req.body.productName || !req.body.categoryId) {
    res.status(400).json({ message: 'Product name and categoryId are required fields.' });
    return;
  }

  // Create a product object
  const newProduct = {
    productName: req.body.productName,
    categoryId: req.body.categoryId
  };

  // Save product in the database
  Product.create(newProduct, (err, product) => {
    if (err) {
      res.status(500).json({ message: err.message || 'Some error occurred while creating the Product.' });
    } else {
      res.status(201).json(product);
    }
  });
};

// Update a product by ID
exports.updateProductById = (req, res) => {
  const productId = req.params.id;
  // Validate request
  if (!req.body.productName || !req.body.categoryId) {
    res.status(400).json({ message: 'Product name and categoryId are required fields.' });
    return;
  }

  // Create a product object
  const updatedProduct = {
    productName: req.body.productName,
    categoryId: req.body.categoryId
  };

  // Update product in the database
  Product.updateById(productId, updatedProduct, (err, result) => {
    if (err) {
      res.status(404).json({ message: err.message || 'Product not found.' });
    } else {
      res.json({ message: 'Product updated successfully.' });
    }
  });
};

// Delete a product by ID
exports.deleteProductById = (req, res) => {
  const productId = req.params.id;

  // Delete product from the database
  Product.deleteById(productId, (err, result) => {
    if (err) {
      res.status(404).json({ message: err.message || 'Product not found.' });
    } else {
      res.json({ message: 'Product deleted successfully.' });
    }
  });
};