import React from 'react';
import ProductsListItem from './ProductListItem';

const ProductsList = ({ products }) => {
  return (
    <div>
      {
        products?.map(product => (
        <ProductsListItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductsList;
