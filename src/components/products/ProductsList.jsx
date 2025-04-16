import React, { useState } from 'react';
import ProductsListItem from './ProductListItem';

const ProductsList = ({ products }) => {
  const[productsToShow,setProductsToShow] = useState(5);
  const lodeMoreProducts=()=>{
    if(productsToShow>products?.langth){
      return;
    }else{
       setProductsToShow(prevProductsToShow=>prevProductsToShow+5);
    }
  }  

    return (
    <div className="row my-5">
      {products?.slice(0,productsToShow).map(product => (
        <ProductsListItem product={product} key={product.id} />
      ))}
      {
        productsToShow<products?.length &&  
      
        <div className='d-flex justify-content-center my-3'>
              <button className="btn btn-sm btn-dark" onDoubleClick={()=>lodeMoreProducts()}>
              
                <i className='bi bi-arrow-clockwise'></i>{' '}
                Load More
              </button>
        </div>
      }
    </div>
  );
};

export default ProductsList;
