import Button from "./Button";

const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter((person) => person.name.includes(props.searchWord))
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}{" "}
            <Button
              text={"delete"}
              onClick={() => props.removePerson(person.id)}
            ></Button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
