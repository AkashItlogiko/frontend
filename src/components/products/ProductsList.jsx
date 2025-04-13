import React from 'react';
import ProductsListItem from './ProductListItem';

const ProductsList = ({ products }) => {
  return (
    <div className="row my-5">
      {products?.map(product => (
        <ProductsListItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductsList;
