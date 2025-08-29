const Persons = (props) => {
    return (
        <div>
        {props.persons
          .filter((person) => person.name.includes(props.searchWord))
          .map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
      </div>
    );
};

export default Persons;