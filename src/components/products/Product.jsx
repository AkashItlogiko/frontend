import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosRequest } from '../../helpers/config';
import Alert from '../layouts/Alert';
 

const Product = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    const fetachProductBySlug = async () => {
      setLoading(true);
      try {
        const response = await axiosRequest.get(`product/${slug}/show`);
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error?.response?.status === 404) {
          setError('The product you are looking for does not exist.');
        }
        console.log(error);
        setLoading(false);
      }
    };
    fetachProductBySlug();
  }, [slug]);

  return <div className='card my-5'>
    {
      error ?
        <Alert content={}
     }
  </div>;
};

export default Product;
