import Button from './Button'

const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter((person) =>
          person.name.toLowerCase().includes(props.searchWord.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}{' '}
            <Button
              id="deleteButton"
              text={'delete'}
              onClick={() => props.removePerson(person.id)}
            ></Button>
          </p>
        ))}
    </div>
  )
}

export default Persons
