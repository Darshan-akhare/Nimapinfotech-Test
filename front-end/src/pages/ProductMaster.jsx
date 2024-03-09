import  { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const ProductMaster = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFormSubmit = () => {
    fetchData();
  };

  return (
    <div>
      <ProductList products={products} />
      <ProductForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ProductMaster;