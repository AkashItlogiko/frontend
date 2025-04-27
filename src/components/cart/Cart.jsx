import React from 'react';
import Alert from '../layouts/Alert';
import { useSelector } from 'react-redux';

const Cart = () => {
    const{cartItems}=useSelector(state => state.cart);     
    return (
        <div className='row my-4'>
            <div className='col-md-12'>
               <div className='card'>
                <div className="card-body">
                  {
                    cartItems?.length > 0 ?
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th> 
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Subtotal</th>
                                <th></th>      
                               </tr>                             
                            </thead>
                            <tbody>
                               {
                                cartItems?.map((item,index)=>(
                                  <tr key={index}>
                                     <td>{index += 1}</td>
                                <td>
                                    <img src={item?.image} 
                                    width={60} height={60}
                                     className='img-fluid rounded'/>
                                </td>
                                <td>{item?.name}</td>
                                <td>{item?.qty}</td>
                                <td>{item?.price}</td>
                                <td>{item?.color}</td>
                                <td>{item?.size}</td>
                                <td>{item?.qty * item?.price}</td>
                                <td></td> 
                                  </tr>
                                ))
                               } 
                            </tbody>
                        </table>
                    </>
                    :
                    <Alert content="Your cart is empty" type="primary"/>
                  }  
                </div>
               </div>
            </div>
        </div>
    );
};

export default Cart;