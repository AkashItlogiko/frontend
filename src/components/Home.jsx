import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsList from './products/ProductsList';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        setProducts(response.data.data);
        setColors(response.data.colors);
        setSizes(response.data.sizes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProducts();
  }, []);
  return <ProductsList products={products} />;
};

export default Home;
