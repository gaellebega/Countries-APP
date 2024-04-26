import React, { useState, useEffect } from 'react';

function Countries() {
  const [countryData, setCountryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 50;

  useEffect(() => {
    fetch('https://restcountries.com/v3/all')
      .then(response => response.json())
      .then(data => setCountryData(data));
  }, []);

  // Calculate index of the last and first country for the current page
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countryData.slice(indexOfFirstCountry, indexOfLastCountry);

  // Calculate total number of pages
  const totalPages = Math.ceil(countryData.length / countriesPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <div className='flex justify-around mb-10 mt-10'>
        <div>
          <h2 className='font-semibold'>View Countries</h2>
          <p>Page {currentPage} of {totalPages}</p>
        </div>
        {/* Dropdown for continent filtering can be added here */}
      </div>
      <div className=''>
        <ul className="flex flex-wrap gap-10 justify-center items-center bg-no-repeat bg-cover mb-4">
          {currentCountries.map(country => (
            <div className="items-center md:w-4/12 lg:w-2/12 justify-center" key={country.name.common}>
              <img src={`https://flagcdn.com/${country.cca2.toLowerCase()}.svg`} alt={country.name.common} className="w-[250px] items-center h-[120px]" />
              <strong>{country.name.common}</strong>
              <p><strong>Capital</strong>: {country.capital}</p>
              <p><strong>Population</strong>: {country.population}</p>
              <p><strong>Region</strong>: {country.region}</p>
              <p><strong>Size</strong>: {country.area} sq km</p>
            </div>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn"
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber + 1}
            onClick={() => handlePageChange(pageNumber + 1)}
            className={`btn ${currentPage === pageNumber + 1 ? 'active' : ''}`}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Countries;
