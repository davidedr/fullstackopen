const SingleCountry = ({ chosenCountryData }) => {
    console.log("SingleCountry", chosenCountryData);
    
    if (chosenCountryData) {
        console.log(chosenCountryData.flags.png);
        return (<>
            <h1>{chosenCountryData.name.common}</h1>
            <h3>Capital {chosenCountryData.capital[0]}</h3>
            <h3>Area {chosenCountryData.area}</h3>
            <br />
            <h2>Languages</h2>
            <ul>
            {Object.values(chosenCountryData.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={chosenCountryData.flags.png} alt={chosenCountryData.flags.alt}></img>

        </>);
    }
    else
        return (null);
}

export default SingleCountry