const CountryList = (props) => {
  return (
    <div>
      {props.countries
        .filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(props.searchWord.toLowerCase())
        )
        .map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
    </div>
  );
};

export default CountryList;