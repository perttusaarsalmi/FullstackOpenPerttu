import Button from './Button'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNewPerson}>
      <div>
        name:{' '}
        <input
          value={props.newName}
          onChange={(e) => props.setNewName(e.target.value)}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={props.newNumber}
          onChange={(e) => props.setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <Button type="submit" text="add" />
      </div>
    </form>
  )
}

export default PersonForm
