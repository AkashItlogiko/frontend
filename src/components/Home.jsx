// import React from 'react';
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
    setSelectedSize('e.target.value');
    setSearchTerm('');
    setSelectedColor();
  };
  const handleSizeSelectBox = e => {
    setSelectedSize('');
    setSearchTerm('');
    setSelectedColor(e.target.value);
  };
  const clearFilters = () => {
    setSelectedColor('');
    setSelectedSize('');
  };

  useEffect(() => {
    const fetachProducts = async () => {
      try {
        const response = await axiosRequest.get('products');
        setProducts(response.data.data);
        setColors(response.data.data);
        setSizes(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetachProducts();
  }, []);

  return (
    <div className="row my-5">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="row">
              <div className="col-md-4 mb-2">
                <div className="mb-2">
                  <span className="fw-bold">Filter by Color:</span>
                </div>
                <select
                  name="color_id"
                  id="color_id"
                  defaultValue=""
                  onChange={e => handleColorSelectBox(e)}
                  disabled={selectedSize || searchTerm}
                  className="form-select"
                >
                  <option
                    value=""
                    disabled={!selectedColor}
                    onChange={() => clearFilters()}
                  >
                    All Colors
                  </option>
                  {colors?.map(color => {
                    const { colors } = color;
                    return colors?.map(color => {
                      return (
                        <option value={color.id} key={color.id}>
                          {color.name}
                        </option>
                      );
                    });
                  })}
                </select>
              </div>

              <div className="col-md-4 mb-2">
                <div className="mb-2">
                  <span className="fw-bold">Filter by size:</span>
                </div>
                <select
                  name="size_id"
                  id="size_id"
                  defaultValue=""
                  onChange={e => handleSizeSelectBox(e)}
                  disabled={selectedColor || searchTerm}
                  className="form-select"
                >
                  <option
                    value=""
                    disabled={!selectedSize}
                    onChange={() => clearFilters()}
                  >
                    All Sizes
                  </option>
                  {sizes?.map(size => {
                    const { sizes } = size;
                    return sizes?.map(size => {
                      return (
                        <option value={size.id} key={size.id}>
                          {size.name}
                        </option>
                      );
                    });
                  })}
                </select>
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
