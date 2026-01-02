import Person from "./Person";

const Numbers = ({ handleDelete, persons }) => {
    if (persons.length === 0)
        return (<p>No numbers yet.</p>)
    else
        return (
            <>
                <h2>Numbers</h2>
                <ul>
                    {persons.map(person => <Person handleDelete={() => handleDelete(person.id)} id={person.id}
                        name={person.name} number={person.number} />)}
                </ul>
            </>
        )
}

export default Numbers;
