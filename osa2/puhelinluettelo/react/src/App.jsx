import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/personsService";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0501234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    personsService.create(newPerson).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNewName("");
      setNewNumber("");
    });
  };

  const removePerson = (id) => {
    personsService.remove(id).then(() => {
      setPersons(persons.filter(person => person.id !== id));
    });
  };

  return (
    <div>
      <Header text="Phonebook" />
      <Filter searchWord={searchWord} setSearchWord={setSearchWord} />
      <Header text="add a new" />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addNewPerson={addNewPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <Header text="Numbers" />
      <Persons
        persons={persons}
        searchWord={searchWord}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
