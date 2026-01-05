import axios from "axios"

const weatherURL = "https://api.openweathermap.org/data/2.5/weather"

const openweathermap_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (latitude, longitude, YOUR_API_KEY = null) => {
    const request = axios.get(`${weatherURL}?lat=${latitude}&lon=${longitude}&units=metric&APPID=${openweathermap_key}`)
    return request.then(response => response.data)
}

const iconURL = 'https://openweathermap.org/img/wn'

const getWeatherIconURL = (weatherData)  => {
    return `${iconURL}/${Object.values(weatherData.weather[0])[3]}@2x.png`
}

export default { getWeather, getWeatherIconURL };