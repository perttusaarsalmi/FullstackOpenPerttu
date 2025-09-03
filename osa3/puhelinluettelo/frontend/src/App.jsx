import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/personsService'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0501234567' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons)
    })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    if (
      newName &&
      persons.some(
        (person) => person.name === newName && person.number === newNumber
      )
    ) {
      window.alert(
        `${newName} is already added to phonebook with a number ${newNumber}`
      )
      return
    }
    if (!persons.some((person) => person.name === newName)) {
      const newPerson = { name: newName, number: newNumber }
      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson])
          setNotificationMessage(`Added ${newName}`, false)
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.log(error.response.data)
            setNotificationMessage(
              error.response.data.error || error.response.data,
              true
            )
          } else {
            console.error(error.message)
            setNotificationMessage('An unexpected error occurred', true)
          }
        })
    } else {
      const searchedPerson = persons.find((person) => person.name === newName)
      if (
        window.confirm(
          `${searchedPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { name: newName, number: newNumber }
        personsService
          .update(searchedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== searchedPerson.id ? person : returnedPerson
              )
            )
            setNotificationMessage(`Updated ${newName}`, false)
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              console.log(error.response.data)
              setNotificationMessage(
                error.response.data.error || error.response.data,
                true
              )
            } else {
              console.error(error.message)
              setNotificationMessage('An unexpected error occurred', true)
            }
          })
      }
    }
    setNewName('')
    setNewNumber('')
    setNotification('')
  }

  const removePerson = (id) => {
    const searchedPerson = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${searchedPerson.name}  ?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setNotificationMessage(`Removed ${newName}`, false)
        })
        .catch((error) => {
          console.error(error.message)
          setNotificationMessage(
            `Information of ${newName} has already been removed from server`,
            true
          )
        })
    }
  }

  const setNotificationMessage = (message, isError) => {
    setNotification({ text: message, isError: isError })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <Header text="Phonebook" />
      {notification && <Notification notification={notification} />}
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
  )
}

export default App
