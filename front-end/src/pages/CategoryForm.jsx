import { useState } from 'react';
import axios from 'axios';

const CategoryForm = ({ onSubmit }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/categories', { categoryName });
      onSubmit();
      setCategoryName('');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CategoryForm;