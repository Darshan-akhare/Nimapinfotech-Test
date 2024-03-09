const db = require('../db');

const Category = {};

// Get all categories
Category.getAll = (callback) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Get category by ID
Category.getById = (categoryId, callback) => {
  db.query('SELECT * FROM categories WHERE categoryId = ?', [categoryId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback({ message: 'Category not found' }, null);
      }
    }
  });
};

// Create a new category
Category.create = (newCategory, callback) => {
  db.query('INSERT INTO categories SET ?', newCategory, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      const createdCategory = { categoryId: result.insertId, ...newCategory };
      callback(null, createdCategory);
    }
  });
};

// Update category by ID
Category.updateById = (categoryId, updatedCategory, callback) => {
  db.query('UPDATE categories SET ? WHERE categoryId = ?', [updatedCategory, categoryId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      if (result.affectedRows > 0) {
        callback(null, { message: 'Category updated successfully' });
      } else {
        callback({ message: 'Category not found' }, null);
      }
    }
  });
};

// Delete category by ID
Category.deleteById = (categoryId, callback) => {
  db.query('DELETE FROM categories WHERE categoryId = ?', [categoryId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      if (result.affectedRows > 0) {
        callback(null, { message: 'Category deleted successfully' });
      } else {
        callback({ message: 'Category not found' }, null);
      }
    }
  });
};

module.exports = Category;