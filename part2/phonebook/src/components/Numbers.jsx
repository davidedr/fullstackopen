import Person from "./Person";

const Numbers = ({ persons }) => {
    if (persons.length === 0)
        return (<p>No numbers yet.</p>)
    else
        return (
            <>
                <h2>Numbers</h2>
                <ul>
                    {persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
                </ul>
            </>
        )
}

export default Numbers;
