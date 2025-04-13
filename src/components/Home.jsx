import React, { useEffect, useState } from 'react';
import ProductsList from './products/ProductsList';
import { axiosRequest } from '../helpers/config';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  const handleColorSelectBox = e => {
    setSelectedSize('');
    setSearchTerm('');
    setSelectedColor(e.target.value);
  };
  const handleSizeSelectBox = e => {
    setSearchTerm('');
    setSelectedColor('');
    setSelectedSize(e.target.value);
  };

  const clearFilters = () => {
    setSelectedColor('');
    setSelectedSize('');
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosRequest.get('/products/');
        setProducts(response.data.data);
        setColors(response.data.colors);
        setSizes(response.data.sizes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProducts();
  }, []);
  return (
    <div className="row my-5">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="row">
              <div className="col-md-4 md-2">
                <div className="mb-2">
                  <span className="fw-bold">Filter by Color:</span>
                </div>
                <select
                  name="color_id"
                  id="color_id"
                  defaultValue={selectedColor}
                  onChange={e => handleColorSelectBox(e)}
                  disabled={selectedSize || searchTerm}
                  className="form-select"
                ></select>
                <option
                  value=""
                  disabled={!selectedColor}
                  onChange={() => clearFilters()}
                >
                  All Colors
                </option>
                {colors.map(color => (
                  <option
                    value={color.id} 
                    key={color.id}>
                    {color.name}
                  </option>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ProductsList products={products} />
      </div>
    </div>
  );
};

export default Home;
