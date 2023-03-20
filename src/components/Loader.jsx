import React from 'react';
import '../assets/css/Loader.css';

const Loader = () => {
  const logo =  '/logo.svg';
  
  return (
    <div className="loader">
      <img src={logo} alt="logo" className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
