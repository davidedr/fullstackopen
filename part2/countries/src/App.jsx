import { useState, useEffect } from 'react'
import CountriesService from './services/CountriesService'
import ChosenCountries from './components/ChosenCountries'
import SingleCountry from './components/SingleCountry'
import WeatherService from './services/WeatherService'
import Weaather from './components/Weaather'

const App = () => {
  const [query, setQuery] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [chosenCountries, setChosenCountries] = useState(null);
  const [chosenCountryData, setChosenCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleShowButton = (country) => {
    setChosenCountries([country])
  }

  useEffect(() => {
    console.log("useEffect", chosenCountries);

    if (!chosenCountries || chosenCountries.length === 0 || chosenCountries.length > 1) {
      console.log("useEffect, chosenCountries null or longer than 1");
      setChosenCountryData(null)
      setWeatherData(null)
      return
    }

    CountriesService.getCountry(chosenCountries[0])
      .then(data => {
        console.log(("useEffect, data"));
        console.log((data));
        setChosenCountryData(data)
      })
  }, [chosenCountries])

  useEffect(() => {
    if (!chosenCountryData)
      return

    WeatherService.getWeather(chosenCountryData.capitalInfo.latlng[0], chosenCountryData.capitalInfo.latlng[1])
      .then(weatherData => setWeatherData(weatherData))

  }, [chosenCountryData])

  const handleQueryChange = (event) => {
    console.log("handleQueryChange", event.target.value);
    const query = event.target.value.toLowerCase()
    setQuery(query);
    const newChosenCountries = allCountries.filter(name => name.toLowerCase().includes(query));
    console.log("handleQueryChange", newChosenCountries.length, "matches found");
    setChosenCountries(newChosenCountries)
  }

  useEffect(() => {
    CountriesService.getAll().then(data => {
      const names = data.map(country => country.name.common);
      setAllCountries(names)
      console.log("read:", names.length, "names");
    })
  }, [])

  return (
    <>
      <div>
        <p>find countries <input value={query} onChange={handleQueryChange} /></p>
      </div>
      <div>
        <ChosenCountries chosenCountries={chosenCountries} handleShowButton={handleShowButton} />
      </div>
      <div>
        <SingleCountry chosenCountryData={ chosenCountryData } />
        <Weaather weatherData={ weatherData } />
      </div>
    </>
  )
}

export default App
