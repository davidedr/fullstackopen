import WeatherService from "../services/WeatherService"

const Weaather = ({ weatherData }) => {
    if (!weatherData)
        return (<></>)

    return (<>
        <p>Temperature {weatherData.main.temp} Celsius</p>
        <img src={WeatherService.getWeatherIconURL(weatherData)} alt={weatherData.weather.description}/>
        <p>Wind {weatherData.wind.speed} m/s</p></>)
}

export default Weaather