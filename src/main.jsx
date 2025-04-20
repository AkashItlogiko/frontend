import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'react-image-gallery/styles/css/image-gallery.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="container card shadow-sm my-4 ">
    <React.StrictMode>
      <ToastContainer position="right" />
      <App />
    </React.StrictMode>
  </div>
);
