import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/ResidentInfo.css';

const ResidentInfo = ({ residentUrl }) => {
  const [residentData, setResidentData] = useState(null);

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        const response = await axios.get(residentUrl);
        setResidentData(response.data);
      } catch (error) {
        console.error('Error fetching resident data:', error);
      }
    };

    fetchResidentData();
  }, [residentUrl]);

  if (!residentData) {
    return <p>Loading...</p>;
  }

  const { name, image, status, origin, episode } = residentData;

  return (
    <div className="resident-info">
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>Origin:</strong> {origin.name}
      </p>
      <p>
        <strong>Number of episodes:</strong> {episode.length}
      </p>
    </div>
  );
};

export default ResidentInfo;
