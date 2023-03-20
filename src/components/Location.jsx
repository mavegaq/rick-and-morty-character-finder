import React from 'react';
import '../assets/css/Location.css';

const Location = ({ locationData }) => {
  return (
    <div className="location">
      <h2>Location Info</h2>
      <div className="location-details">
        <div className="location-info">
          <strong>Name:</strong> {locationData.name}
        </div>
        <div className="location-info">
          <strong>Type:</strong> {locationData.type}
        </div>
        <div className="location-info">
          <strong>Dimension:</strong> {locationData.dimension}
        </div>
        <div className="location-info">
          <strong>Number of Residents:</strong> {locationData.residents.length}
        </div>
      </div>
    </div>
  );
};

export default Location;
