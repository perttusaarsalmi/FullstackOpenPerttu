import Button from "./Button";

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
          <p key={country.name.common}>{country.name.common} <Button onClick={() => props.onShowCountry(country.name.common)} text={"show"}></Button></p>
        ))}
    </div>
  );
};

export default CountryList;