import Note from './components/Note'

// Note that the key attribute must now be defined for the Note components, and not for the li tags like before.
const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <Note key={note.id} note={note}/>)}
      </ul>
    </div>
  )
}

export default App