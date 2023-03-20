import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Location from './components/Location';
import ResidentList from './components/ResidentList';
import Loader from './components/Loader';

function App() {
  const [locationId, setLocationId] = useState(getRandomLocationId());
  const [locationData, setLocationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 10;

  useEffect(() => {
    fetchLocationData(locationId);
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
    const id = event.target.locationId.value;
    setLocationId(id);
    setCurrentPage(1);
  }

  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = locationData?.residents.slice(indexOfFirstResident, indexOfLastResident);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app">
      <h1>Rick and Morty Locations</h1>
      <form onSubmit={handleSearch}>
        <input
          type="number"
          name="locationId"
          placeholder="Location ID"
          min="1"
          max="126"
        />
        <button type="submit">Search</button>
      </form>
      {locationData ? (
        <>
          <Location locationData={locationData} />
          <ResidentList
            residents={currentResidents}
            residentsPerPage={residentsPerPage}
            totalResidents={locationData.residents.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
