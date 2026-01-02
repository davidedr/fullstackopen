import { useState, useEffect } from 'react'
import Numbers from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonService from './services/PersonService';

const App = () => {
  /*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  */

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('Add a name...')
  const [newNumber, setNewNumber] = useState('Add a number...')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newFilter, setNewFilter] = useState('');

  const makeFiltering = (newFilter, newPerson = null) => {
    console.log("makeFiltering", newFilter);
    const newPersons = [...persons]
    if (newPerson != null)
      newPersons.push(newPerson)

    if (newFilter === "")
      setFilteredPersons([...newPersons])
    else
      setFilteredPersons(newPersons.filter(
        person => person.name.toLowerCase().includes(newFilter.toLowerCase())
      ))
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setNewFilter(newFilter)
    makeFiltering(newFilter)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPersonObj = { name: newName, number: newNumber }
    PersonService.create(newPersonObj)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName("")
        setNewNumber("")
        makeFiltering(newFilter, createdPerson)
      })
      .catch(err => alert(`Creation of Person ${newPersonObj.name}, ${newPersonObj.number} reports the error: ${err}!`))
  }

  const handleNameChange = (event) => {
    console.log("handleNameChange", event.target, event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("handleNumberChange", event.target, event.target.value)
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    PersonService.getAll()
      .then(persons => {
        setPersons(persons)
        if (newFilter === "")
          setFilteredPersons([...persons])
        else
          setFilteredPersons(persons.filter(
            person => person.name.toLowerCase().includes(newFilter.toLowerCase())
          ))
      })
  }, [])

  const handleDelete = id => {
    console.log("handleDelete", id);
    const aa = window.confirm(`Delete ${persons.filter(person => person.id === id)[0].name}?`)
    if (!aa)
      return;
    PersonService.remove(id)
      .then(() => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
        if (newFilter === "")
          setFilteredPersons([...newPersons])
        else
          setFilteredPersons(newPersons.filter(
            person => person.name.toLowerCase().includes(newFilter.toLowerCase())
          ))
      })
      .catch(err => {
        const wannaDeletedPerson = persons.filter(person => person.id === id)[0]
        alert(`Deletion of Person ${wannaDeletedPerson.name}, ${wannaDeletedPerson.number} reports the error: ${err}!`)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <PersonForm handleFormSubmit={handleFormSubmit}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Numbers handleDelete={handleDelete} persons={filteredPersons} />
    </div>
  )
}
export default App