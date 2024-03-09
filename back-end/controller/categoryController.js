const Category = require('../models/categoryModel');

// Get all categories
exports.getAllCategories = (req, res) => {
  Category.getAll((err, categories) => {
    if (err) {
      res.status(500).json({ message: err.message || 'Some error occurred while retrieving categories.' });
    } else {
      res.json(categories);
    }
  });
};

// Get a single category by ID
exports.getCategoryById = (req, res) => {
  const categoryId = req.params.id;
  Category.getById(categoryId, (err, category) => {
    if (err) {
      res.status(404).json({ message: err.message || 'Category not found.' });
    } else {
      res.json(category);
    }
  });
};

// Create a new category
exports.createCategory = (req, res) => {
  // Validate request
  if (!req.body.categoryName) {
    res.status(400).json({ message: 'Category name can not be empty!' });
    return;
  }

  // Create a category object
  const newCategory = {
    categoryName: req.body.categoryName
  };

  // Save category in the database
  Category.create(newCategory, (err, category) => {
    if (err) {
      res.status(500).json({ message: err.message || 'Some error occurred while creating the Category.' });
    } else {
      res.status(201).json(category);
    }
  });
};

// Update a category by ID
exports.updateCategoryById = (req, res) => {
  const categoryId = req.params.id;
  // Validate request
  if (!req.body.categoryName) {
    res.status(400).json({ message: 'Category name can not be empty!' });
    return;
  }

  // Create a category object
  const updatedCategory = {
    categoryName: req.body.categoryName
  };

  // Update category in the database
  Category.updateById(categoryId, updatedCategory, (err, result) => {
    if (err) {
      res.status(404).json({ message: err.message || 'Category not found.' });
    } else {
      res.json({ message: 'Category updated successfully.' });
    }
  });
};

// Delete a category by ID
exports.deleteCategoryById = (req, res) => {
  const categoryId = req.params.id;

  // Delete category from the database
  Category.deleteById(categoryId, (err, result) => {
    if (err) {
      res.status(404).json({ message: err.message || 'Category not found.' });
    } else {
      res.json({ message: 'Category deleted successfully.' });
    }
  });
};