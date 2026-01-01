import { useState } from 'react'
import Numbers from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('Add a name...')
  const [newNumber, setNewNumber] = useState('Add a number...')
  const [filteredPersons, setFilteredPersons] = useState([...persons])
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
    const newPersonObj = { name: newName, number: newNumber, id: persons.length + 1 }
    setPersons(persons.concat(newPersonObj))
    setNewName("")
    setNewNumber("")
    makeFiltering(newFilter, newPersonObj)
  }

  const handleNameChange = (event) => {
    console.log("handleNameChange", event.target, event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("handleNumberChange", event.target, event.target.value)
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <PersonForm handleFormSubmit={handleFormSubmit}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <Numbers persons={filteredPersons} />
    </div>
  )
}

export default App