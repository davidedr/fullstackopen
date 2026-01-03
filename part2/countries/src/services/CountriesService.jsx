import axios from "axios";

const baseURL='https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    return axios.get(`${baseURL}/all`)
        .then(res => res.data);
}

const getCountry = (countryName) => {
    const requestURL = `${baseURL}/name/${countryName}`
    console.log("getCountry", countryName, requestURL)
    return axios.get(requestURL)
        .then(res => res.data);
}

export default { getAll, getCountry };