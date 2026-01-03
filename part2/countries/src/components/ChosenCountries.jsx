const ChosenCountries = ({ chosenCountries }) => {
    if (!chosenCountries)
        return (<p>input some name...</p>)
    else if (chosenCountries.length === 0)
        return (<p>No matches!</p>)
    else if (chosenCountries.length > 10)
        return (<p>Too many matches, specify another filter</p>)
    else if (chosenCountries.length === 1)
        return null;
    else
        return (
            <ul>
                {chosenCountries.map(country => <li key={country}>{country}</li>)}
            </ul>
        )
}

export default ChosenCountries