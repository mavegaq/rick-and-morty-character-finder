import React, { useState, useEffect } from 'react';

const ResidentInfo = ({ residentUrl }) => {
  const [residentData, setResidentData] = useState(null);

  useEffect(() => {
    const fetchResidentData = async () => {
      const response = await fetch(residentUrl);
      const data = await response.json();
      setResidentData(data);
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
