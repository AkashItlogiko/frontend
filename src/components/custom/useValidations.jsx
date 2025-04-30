import React from 'react';

const useValidations = (errors,field) => {
  const renderError = (field) =>(
    errors?.[field]?.map((errors,index)=>(
        <div key={index} className="text-white my-2 rounded p-2 bg-danger">
            {errors}
        </div>
    ))
  ) 
    return renderError(field)
};

export default useValidations;