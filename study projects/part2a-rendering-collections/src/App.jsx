import { useState } from 'react'
import Note from './components/Note'

// Note that the key attribute must now be defined for the Note components, and not for the li tags like before.
const App = (props) => {

  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("Add new note...");

  const addNote = (event) => {
    event.preventDefault();
    console.log("save button pressed", event.target);
    const newNoteObj = {
      content: newNote, important: Math.random() < 0.5, id: String(notes.length + 1) }
    setNotes(notes.concat(newNoteObj))
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    console.log("handleNoteChange", event.target);
    setNewNote(event.target.value)
    
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <Note key={note.id} note={note} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App