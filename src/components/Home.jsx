import React, { useEffect, useState } from 'react';
import ProductsList from './products/ProductsList';
import { axiosRequest } from '../helpers/config';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Handlers for filter changes
  const handleColorSelectBox = e => {
    setSelectedColor(e.target.value);
    setSelectedSize('');
    setSearchTerm('');
  };

  const handleSizeSelectBox = e => {
    setSelectedSize(e.target.value);
    setSelectedColor('');
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSelectedColor('');
    setSelectedSize('');
    setFilteredProducts(products); // Reset the filtered products
  };

  // Fetch products and metadata
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosRequest.get('products');
        const allProducts = response.data.data;

        setProducts(allProducts);
        setFilteredProducts(allProducts); // Initialize filtered products

        // Extract unique colors
        const uniqueColors = [];
        allProducts.forEach(product => {
          product.colors.forEach(color => {
            if (!uniqueColors.some(unique => unique.id === color.id)) {
              uniqueColors.push(color);
            }
          });
        });
        setColors(uniqueColors);

        // Extract unique sizes
        const uniqueSizes = [];
        allProducts.forEach(product => {
          product.sizes?.forEach(size => {
            if (!uniqueSizes.some(unique => unique.id === size.id)) {
              uniqueSizes.push(size);
            }
          });
        });
        setSizes(uniqueSizes);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Apply filters when selectedColor or selectedSize changes
  useEffect(() => {
    let filtered = products;

    if (selectedColor) {
      filtered = filtered.filter(product =>
        product.colors.some(color => color.id === selectedColor)
      );
    }

    if (selectedSize) {
      filtered = filtered.filter(product =>
        product.sizes?.some(size => size.id === selectedSize)
      );
    }

    setFilteredProducts(filtered);
    console.log('Filtered Products:', filtered);
  }, [selectedColor, selectedSize, products]);

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
                    onChange={handleColorSelectBox}
                    disabled={!!selectedSize || !!searchTerm}
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
                    onChange={handleSizeSelectBox}
                    disabled={!!selectedColor || !!searchTerm}
                    className="form-select"
                  >
                    <option value="" onClick={clearFilters}>
                      All Sizes
                    </option>
                    {sizes.map(size => (
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ProductsList products={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default Home;
