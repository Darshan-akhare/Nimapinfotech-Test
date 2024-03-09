import  { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';

const CategoryMaster = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFormSubmit = () => {
    fetchData();
  };

  return (
    <div>
      <CategoryList categories={categories} />
      <CategoryForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default CategoryMaster;