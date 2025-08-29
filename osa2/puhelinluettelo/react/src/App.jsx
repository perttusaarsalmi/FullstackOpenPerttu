import { useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0501234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");

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
      <Filter searchWord={searchWord} setSearchWord={setSearchWord} />
      <Header text="add a new" />
      <PersonForm newName={newName} newNumber={newNumber} addNewPerson={addNewPerson} setNewName={setNewName} setNewNumber={setNewNumber} />
      <Header text="Numbers" />
      <Persons persons={persons} searchWord={searchWord} />
    </div>
  );
};

export default App;
