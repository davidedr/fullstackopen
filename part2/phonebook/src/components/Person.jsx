const Person = ({ handleDelete, id, name, number }) => {
    return (
        <div>
            <li>{name} {number}</li>
            <button onClick={() => handleDelete(id)}>Delete {id}</button>
        </div>
    );
}

export default Person;