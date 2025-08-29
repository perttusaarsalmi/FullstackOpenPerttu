import { useState, useEffect } from "react";
import Search from "./components/Search";
import Countries from "./components/countries";
import countriesService from "./services/countriesService";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchWord(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <div>
      <Search searchWord={searchWord} onSearchChange={handleSearchChange} />
      {searchWord && filteredCountries.length <= 10 && (
        <Countries countries={filteredCountries} searchWord={searchWord} />
      )}
      {searchWord && filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  );
}

export default App;
