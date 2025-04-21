import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosRequest } from '../../helpers/config';
import Alert from '../layouts/Alert';
import Spinner from '../layouts/Spinner';
import { Parser } from 'html-to-react';
import Slider from './images/Slider';

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

  return (
    <div className="card my-5">
      {error ? (
        <Alert content={error} type="danger" />
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row g-0">
            <div className="col-md-4 p-2">
              <div>
                <Slider product={product} />
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-dody">
                <div className="d-flex justify-content-between">
                  <h5 className="text-dark p-2">{product?.name}</h5>
                  <h6 className="badge bg-danger m-2">${product?.price}</h6>
                </div>
              </div>
              <div className="my-3">{Parser().parse(product?.desc)}</div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start align-items-center mb-3">
                  {product.sizes?.map(size => (
                    <span
                      key={size.id}
                      onClick={()=>setSelectedSize(size)}
                      style={{cursor:'pointer'}}
                      className="bg-light text-dark me-2 p-1 fw-bold">
                      <small>{size.name}</small>
                    </span>
                  ))}
                </div>
                <div className="me-2">
                  {product.status == 1 ? (
                    <span className="badge bg-success p-2">In Stock</span>
                  ) : (
                    <span className="badge bg-danger p-2">Out of Stock</span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-start align-items-center mb-3">
                {product.colors?.map(color => (
                  <div
                    key={color.id}
                    onClick={()=>setSelectedColor(color)}
                    className="border border-light-subtle border-2"
                    style={{
                      backgroundColor: color.name.toLowerCase(),
                      height: '20px',
                      width: '20px',
                      borderRadius: '50%',
                      marginRight: '5px',
                    }}
                  >

                  </div>
                ))}
              </div>
              <div className="row mt-5">
              <div className="col-md-6 mx-auto">
               <div className="mb-4">
                <input type="number" className='form-control' placeholder='Qty'
                value={qty}
                onChange={(e)=>setQty(e.target.value)}
                min={1}
                max={product?.qty > 1 ? product?.qty :1}
                />
               </div>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-dark" disabled={!selectedColor || !selectedSize || product?.qty == 0}>
                <i className="bi bi-cart-plus-fill"></i>{""}
                Add To Cart
                </button>
              </div>
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
