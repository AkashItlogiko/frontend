import React from 'react';

const Alert = ({ type, content }) => {
  return (
    <div className="row mt-4">
      <div className="col-md-8 mx-auto">
        <div className={`alert alert-${type} d-flex align-items-center`}>
          <i className="bi bi-exclamation-triangle me-2"></i>
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
