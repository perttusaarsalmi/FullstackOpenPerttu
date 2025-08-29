import { useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0501234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
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
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit" text="add" />
        </div>
      </form>
      <Header text="Numbers" />
      <div>
        {persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
