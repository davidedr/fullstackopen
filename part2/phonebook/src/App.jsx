import { useState } from 'react'

const Numbers = ({ persons }) => {
  console.log("Numbers", persons.length, persons);
  
  if (persons.length === 0)
    return (<p>No numbers yet.</p>)
  else
    return (
      <>
        <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
      </>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 }
  ])
  const [newName, setNewName] = useState('Add a name...')
  const [newNumber, setNewNumber] = useState('Add a number...')

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newPersonObj = { name: newName, number: newNumber, id: persons.length + 1 }
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newPersonObj))
    setNewName("")
    setNewNumber("")
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
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons} />
    </div>
  )
}

export default App