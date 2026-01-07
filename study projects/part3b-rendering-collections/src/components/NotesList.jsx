import Note from "./Note"

const NotesList = ({ notesToShow, toggleImportance }) => {
    if (notesToShow)
        return(
        <ul>
            {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance=
            {() => toggleImportance(note.id)} />)}
        </ul>
        )
    else
        return(<></>)
}

export default NotesList