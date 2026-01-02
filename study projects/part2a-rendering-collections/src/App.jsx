import { useState, useEffect } from 'react'
import axios from 'axios';
import Note from './components/Note'
import NoteService from './services/NoteService';

// Note that the key attribute must now be defined for the Note components, and not for the li tags like before.
const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("Add new note...");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  const toggleImportance = id => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }
    NoteService.update(id, changedNote)
      .then(modifiedNote => { setNotes(notes.map(note => note.id === id ? modifiedNote : note)) })
      .catch(err => {
        alert(`the note ${note.content} reports the error: ${err}!`)
        setNotes(notes.filter(note => note.id !== id))
      });
  }

  const addNote = (event) => {
    event.preventDefault();
    console.log("save button pressed", event.target);
    const newNoteObj = {
      content: newNote, important: Math.random() < 0.5, id: String(notes.length + 1)
    }
    NoteService.create(newNoteObj)
      .then(createdNote => {
        setNotes(notes.concat(createdNote))
        setNewNote('');
      })
  }

  const handleNoteChange = (event) => {
    console.log("handleNoteChange", event.target);
    setNewNote(event.target.value)

  }

  // First, the body of the function defining the component is executed
  // and the component is rendered for the first time (w/o any data)
  // The following function, or effect in React parlance:
  // () => {...}
  // is executed immediately AFTER rendering.
  // axios.get initiates the fetching of data from the server
  // as well as registers the following function as an event handler for the operation:
  // res => setNotes(res.data)
  // When data arrives from the server,
  // the JavaScript runtime calls the function registered as the event handler,
  // which stores the notes received from the server into the state
  // using the function setNotes(res.data).  
  // As always, a call to a state-updating function triggers the re-rendering of the component.
  // As a result, the notes fetched from the server are rendered to the screen.

  useEffect(() => {
    NoteService.getAll()
      .then(readNotes => setNotes(readNotes))
  }, []
  )

  // useEffect takes two parameters. The first is a function, the effect itself.
  // According to the documentation:
  // By default, effects run after every completed render,
  // but you can choose to fire it only when certain values have changed.
  // So by default, the effect is always run after the component has been rendered.
  // The second parameter of useEffect is used to specify how often the effect is run.
  // If the second parameter is an empty array [], then the effect is only run
  // along with the first render of the component.
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>Show {showAll ? "Important" : "All"}</button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App