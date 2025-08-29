import { useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();
    setPersons([...persons, { name: newName }]);
    setNewName("");
  };

  return (
    <div>
      <Header text="Phonebook" />
      <form onSubmit={addNewPerson}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <Button
            type="submit"
            text="add"
          />
        </div>
      </form>
      <Header text="Numbers" />
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
