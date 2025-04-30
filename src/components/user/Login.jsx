import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosRequest } from '../../helpers/config';
import { toast } from 'react-toastify';
import Spinner from '../layouts/Spinner';
import useValidations from '../custom/useValidations';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [validationErrors, setValidationErrors] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    
    const loginUser = async (e) => {
        e.preventDefault()  
        setValidationErrors([])
        setLoading(true)
        try {
            const response = await axiosRequest.post('user/login', user)
            setLoading(false)
           if(response.data.error){
            toast.error(response.data.error)
           }else{
            toast.success(response.data.message)
            navigate('/')
           }
        } catch (error) {
            if(error?.response?.status === 422) {
                setValidationErrors(error.response.data.errors)
            }
            console.log(error)
            setLoading(false)
        }
    }


        return (
            <div className='row my-5'>
               <div className="col-md-6 mx-auto">
                <div className="card shadow-sm">
                <div className="card-header bg-white">
                <h5 className="text-center mt-2">
                            Login
                        </h5>
                </div>
                <div className="card-body">
                    <form className="mt-5" onSubmit={(e) => loginUser(e)}>                                         
                        <div className="mb-3">
                            <label htmlFor="eamil" className="form-label">Email address</label>
                            <input type="email" placeholder="Enter your email"
                               value={user.email}
                               onChange={(e) => setUser({
                                        ...user, email: e.target.value
                                    })}    
                                className="form-control" id="eamil"/> 
                             {useValidations(validationErrors,'email')}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" placeholder="Enter your password"
                            value={user.password}
                            onChange={(e) => setUser({
                                ...user, password: e.target.value
                            })}
                            className="form-control" id="password"/>
                            {useValidations(validationErrors,'password')}
                        </div>
                        
                        {
                                loading ?
                                    <Spinner />
                                :
                                <button type="submit" className="btn btn-dark btn-sm">Submit</button>
                            }
 
                    </form>
                </div>
                </div>
               </div>
            </div>
        );
};

export default Login;