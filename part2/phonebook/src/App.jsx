import { useState, useEffect } from 'react'
import Numbers from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonService from './services/PersonService';
import Notification from './components/Notification';

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
  const [errorMessage, setErrorMessage] = useState(null);

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
   
    const updatingPerson = persons.filter(person => {
      if (person)
        return person.name === newName
      else
        return false
      })[0]
    if (updatingPerson) {
      // alert(`${newName} is already added to phonebook`);
      const aa = window.confirm(`${updatingPerson.name} is already added to the phonebook, replace the old number with a new one?`)
      if (!aa)
        return;
      PersonService.update(updatingPerson.id, { ...updatingPerson, number: newNumber })
        .then(() => {
          const updatedPersons = persons.map(person => person.id === updatingPerson.id ?
            { ...updatingPerson, number: newNumber } : person)
          setPersons(updatedPersons)
          if (newFilter === "")
            setFilteredPersons([...updatedPersons])
          else
            setFilteredPersons(updatedPersons.filter(
              person => person.name.toLowerCase().includes(newFilter.toLowerCase())
            ))
        })
        //.catch(err => alert(`Update of Person ${updatingPerson.name}, ${newNumber} reports the error: ${err}!`))
        .catch(err => {
          //setErrorMessage(`Update of Person ${updatingPerson.name}, ${newNumber} reports the error: ${err}!`);
          setErrorMessage(`Information of ${updatingPerson.name} has already been removed from the server`);
          setTimeout(() => setErrorMessage(null), 5000)
        })
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
      //.catch(err => alert(`Creation of Person ${newPersonObj.name}, ${newPersonObj.number} reports the error: ${err}!`))
      .catch(err => {
        setErrorMessage(`Creation of Person ${newPersonObj.name}, ${newPersonObj.number} reports the error: ${err}!`);
        setTimeout(() => setErrorMessage(null), 5000)
      })
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
      /*
      .catch(err => {
        const wannaDeletedPerson = persons.filter(person => person.id === id)[0]
        alert(`Deletion of Person ${wannaDeletedPerson.name}, ${wannaDeletedPerson.number} reports the error: ${err}!`)
      })
      */
      .catch(err => {
        const wannaDeletedPerson = persons.filter(person => person.id === id)[0]
        setErrorMessage(`Deletion of Person ${wannaDeletedPerson.name}, ${wannaDeletedPerson.number} reports the error: ${err}!`);
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  console.log("Starting...");

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <PersonForm handleFormSubmit={handleFormSubmit}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Numbers handleDelete={handleDelete} persons={filteredPersons} />
    </div>
  )
}
export default App