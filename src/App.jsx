import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Location from './components/Location';
import ResidentList from './components/ResidentList';
import Loader from './components/Loader';

function App() {
  const [locationId, setLocationId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    if (locationId) {
      fetchLocationData(locationId);
    }
  }, [locationId]);


  useEffect(() => {
    setInputValue(locationId);
  }, [locationId]);

  function fetchLocationData(id) {
    axios
      .get(`https://rickandmortyapi.com/api/location/${id}`)
      .then((response) => {
        setLocationData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  function getRandomLocationId() {
    return Math.floor(Math.random() * 126) + 1;
  }

  function handleSearch(event) {
    event.preventDefault();
    const id = inputValue;
    if (id) {
      setLocationId(id);
    }
  }

  useEffect(() => {
    if (!locationId) {
      const randomId = getRandomLocationId();
      setLocationId(randomId);
    }
  }, [locationId]);

  return (
    <div className="app">
      <h1>Rick and Morty Locations</h1>
      <form onSubmit={handleSearch}>
        <input
          type="number"
          name="locationId"
          value={inputValue}
          placeholder="Location ID"
          min="1"
          max="126"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {locationData ? (
        <>
          <Location locationData={locationData} />
          <ResidentList residents={locationData.residents} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
