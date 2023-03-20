import React, { useState } from 'react';
import ResidentInfo from './ResidentInfo';
import '../assets/css/ResidentList.css';

const ResidentList = ({ residents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 8;
  const totalPages = Math.ceil(residents.length / charactersPerPage);

  return (
    <div>
      <h2>Residents</h2>
      {residents.length === 0 ? (
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>No residents found for this location.</p>
      ) : (
        <>
          <div className="residentGrid">
            {residents
              .slice((currentPage - 1) * charactersPerPage, currentPage * charactersPerPage)
              .map((residentUrl, index) => (
                <div className="residentGridItem" key={index}>
                  <ResidentInfo residentUrl={residentUrl} />
                </div>
              ))}
          </div>
          <div>
            <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}>
              &lt; Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}>
              Siguiente &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResidentList;
