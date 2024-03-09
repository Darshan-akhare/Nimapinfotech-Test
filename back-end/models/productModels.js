const db = require('../db');

const Product = {};

// Get all products with pagination
Product.getAllWithPagination = (page, pageSize, callback) => {
  const offset = (page - 1) * pageSize;
  db.query('SELECT products.*, categories.categoryName FROM products JOIN categories ON products.categoryId = categories.categoryId LIMIT ?, ?', [offset, pageSize], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Get product by ID
Product.getById = (productId, callback) => {
  db.query('SELECT * FROM products WHERE productId = ?', [productId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback({ message: 'Product not found' }, null);
      }
    }
  });
};

// Create a new product
Product.create = (newProduct, callback) => {
  db.query('INSERT INTO products SET ?', newProduct, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      const createdProduct = { productId: result.insertId, ...newProduct };
      callback(null, createdProduct);
    }
  });
};

// Update product by ID
Product.updateById = (productId, updatedProduct, callback) => {
  db.query('UPDATE products SET ? WHERE productId = ?', [updatedProduct, productId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      if (result.affectedRows > 0) {
        callback(null, { message: 'Product updated successfully' });
      } else {
        callback({ message: 'Product not found' }, null);
      }
    }
  });
};

// Delete product by ID
Product.deleteById = (productId, callback) => {
  db.query('DELETE FROM products WHERE productId = ?', [productId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      if (result.affectedRows > 0) {
        callback(null, { message: 'Product deleted successfully' });
      } else {
        callback({ message: 'Product not found' }, null);
      }
    }
  });
};

module.exports = Product;