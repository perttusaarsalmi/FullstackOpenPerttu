const Country = (props) => {
  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <div>{props.country.capital[0]}</div>
      <div>{props.country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(props.country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img
          src={props.country.flags.png}
          alt={`Flag of ${props.country.name.common}`}
        />
      </div>
    </div>
  );
};

export default Country;
