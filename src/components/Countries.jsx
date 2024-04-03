import React, {useState, useEffect} from 'react'
function Countries() {
   const[countryData, setCountryData] =  useState([]);
   const [currentPage] = useState(1);
   const countriesPerPage = 250;
   useEffect(() =>{
    fetch('https://restcountries.com/v3/all')
    .then(response => response.json())
    .then(data => setCountryData(data));
   }, []);
   const indexOfLastCountry = currentPage * countriesPerPage;
   const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
   const currentCountries = countryData.slice(indexOfFirstCountry, indexOfLastCountry);
  return (
     <section>
      <div className='flex justify-around mb-10 mt-10'>
        <div >
          <h2>View Countries</h2>
          <p>Page 1 of 5</p>
        </div>
        <select>
          <option value="Select Continent">Select Continent</option>
            </select>
            </div>
            <div className=''>
            <ul className="flex flex-wrap gap-10 justify-center items-center">
           {currentCountries.map(country => (
             <div className="items-center md:w-4/12 lg:w-2/12 justify-center" key={country.name.common}>
              <img src={`https://flagcdn.com/${country.cca2.toLowerCase()}.svg`} alt={country.name.common} className="w-[250px] items-center h-[120px]"/>
              <strong>{country.name.common}</strong>
             <p><strong>Capital</strong>: {country.capital}</p>
             <p><strong>Population</strong>: {country.population}</p>
               <p><strong>Region</strong>: {country.region}</p>
            </div>
           ))}
         </ul>
    </div>
    </section>
   );
}
export default Countries;