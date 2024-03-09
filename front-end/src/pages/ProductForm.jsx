import { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', { productName });
      onSubmit();
      setProductName('');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ProductForm;