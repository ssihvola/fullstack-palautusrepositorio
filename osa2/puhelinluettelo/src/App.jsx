import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneBookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const nameChecker = (name) => {
    return persons.some(person => person.name === name)
  }

  const addName = (event) => {
    event.preventDefault()
    nameChecker(newName)
      ? alert(`${newName} is already added to phonebook`)
      : (() => {
        const nameObject = {
          name: newName,
          number: newNumber
        }

      phoneBookService    
        .create(nameObject)    
        .then(response => {  
          setPersons(persons.concat(nameObject))
          setNewName('')
          setNewNumber('')    
      })
    })()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

return (
    <div>
      <h1>Phonebook</h1>
        <Filter value={searchTerm} onChange={handleSearchChange} />

      <h2>add a new</h2>
        <PersonForm text="name:" inputValue={newName} eventTarget={handleNameChange} />
        <PersonForm text="number:" inputValue={newNumber} eventTarget={handleNumberChange} />
        <div><button onClick={addName}>add</button></div>

      <h2>Numbers</h2>
        <Persons personArray={filteredPersons} />
    </div>
  )
}

export default App