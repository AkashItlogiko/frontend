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

  const handleColorSelectBox = e => {
    setSelectedSize('');
    setSearchTerm('');
    setSelectedColor(e.target.value);
  };
  const handleSizeSelectBox = e => {
    setSelectedColor('');
    setSearchTerm('');
    setSelectedSize(e.target.value);
  };
  const clearFilters = () => {
    setSelectedColor('');
    setSelectedSize('');
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosRequest.get('products');
        setProducts(response.data.data);

        // Extract unique colors
        const uniqueColors = [];
        response.data.data.forEach(product => {
          product.colors.forEach(color => {
            if (!uniqueColors.some(unique => unique.id === color.id)) {
              uniqueColors.push(color);
            }
          });
        });

        setColors(uniqueColors);
        setSizes(response.data.sizes);
        console.log('Unique Sizes:', response.data.data.sizes);
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
              <div className="col-md-4">
                <div className="mb-2">
                  <label htmlFor="color_id" className="form-label fw-bold">
                    Filter by Color:
                  </label>
                  <select
                    name="color_id"
                    id="color_id"
                    value={selectedColor}
                    onChange={e => handleColorSelectBox(e)}
                    disabled={selectedSize || searchTerm}
                    className="form-select"
                  >
                    <option value="" onClick={clearFilters}>
                      All Colors
                    </option>
                    {colors.map(color => (
                      <option value={color.id} key={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-2">
                  <label htmlFor="size_id" className="form-label fw-bold">
                    Filter by Size:
                  </label>
                  <select
                    name="size_id"
                    id="size_id"
                    value={selectedSize}
                    onChange={e => handleSizeSelectBox(e)}
                    disabled={selectedColor || searchTerm}
                    className="form-select"
                  >
                    <option
                      value=""
                      // disabled={!selectedSize}
                      onClick={clearFilters}
                    >
                      All Sizes
                    </option>
                    {sizes?.map(size => (
                      <option value={size.id} key={size.id}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>
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
