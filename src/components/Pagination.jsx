import React, { useState, useEffect } from 'react';

function Pagination() {
  const [countryData, setCountryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 50;

  useEffect(() => {
    fetch('https://restcountries.com/v3/all')
      .then(response => response.json())
      .then(data => setCountryData(data));
  }, []);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countryData.slice(indexOfFirstCountry, indexOfLastCountry);

  return (
    <section>
      <div className='flex justify-around mb-10 mt-10'>
        <div>
          <h2>View Countries</h2>
          <p>Page {currentPage} of {Math.ceil(countryData.length / countriesPerPage)}</p>
        </div>
        {/* Add your select element here for continent filtering if needed */}
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
              <p><strong>size</strong>: {country.size}</p>
            </div>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4 pl-52">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          Previous
        </button>
        {[...Array(Math.ceil(countryData.length / countriesPerPage)).keys()].map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePagination(pageNumber + 1)}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${currentPage === pageNumber + 1 ? 'bg-gray-900 text-white' : 'text-gray-900'} text-center align-middle font-sans text-xs font-medium uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {pageNumber + 1}
            </span>
          </button>
        ))}
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === Math.ceil(countryData.length / countriesPerPage)}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          Next
        </button>
      </div>
    </section>
  );
}

export default Pagination;