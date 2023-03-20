import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Location from './components/Location';
import ResidentList from './components/ResidentList';
import Loader from './components/Loader';

function App() {
  const [locationId, setLocationId] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const residentsPerPage = 10;

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

  function handleSearch(event) {
    event.preventDefault();
    const id = event.target.locationId.value;
    setLocationId(id);
    setCurrentPage(1);

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    fetchLocationData(id);

    return () => {
      clearTimeout(timeoutId);
    };
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
          style={{ width: '200px' }}
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <Loader />
      ) : (
        locationData && (
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
        )
      )}
    </div>
  );
}

export default App;
