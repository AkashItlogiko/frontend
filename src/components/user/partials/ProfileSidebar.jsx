import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useValidations from '../../custom/useValidations';

const ProfileSidebar = () => {
    const { user, token } = useSelector (state => state.user)
    const [image, setImage] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    
    const updateProfileImage = async() => {

    }

    return (
        <div className='col-md-4'>
           <div className="card-p-2">
              <div  className="d-flex flex-column justify-content-center align-items-center">
              <img src={user?.profile_image} alt={user?.name} 
                        width={150}
                        height={150}
                        className='rounded-circle'
                    />
               <div className="input-group my-3">
                        <input type="file" accept='image/*' 
                            
                            onChange={(e) => setImage(e.target.files[0])}
                            className='form-control'
                        />
                        { useValidations(validationErrors, 'profile_image')}
                        {
                            loading ?
                                <span className="text-danger fw-bold mx-1 mt-1">
                                    uploading...
                                </span>
                            :
                            <button className="btn btn-sm btn-primary"
                                disabled={!image}
                                onClick={() => updateProfileImage()}
                            >
                                Upload
                            </button>
                        }
                    </div>
              </div>
            </div> 
            <ul className="list-group w-100 text-center mt-2">
                <li className="list-group-item">
                    <i className="bi bi-person"></i> {user?.name}
                </li>
                <li className="list-group-item">
                    <i className="bi bi-envelope-at-fill"></i> {user?.email}
                </li>
                <li className="list-group-item">
                    <Link to="/user/orders" className='text-decoration-none text-dark'>
                        <i className="bi bi-bag-check-fill"></i> Orders
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ProfileSidebar;