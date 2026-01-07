import axios from "axios";
// json server
//const baseURL = 'http://localhost:3001/notes'

// "part3a-express" project's server
//const baseURL = 'http://localhost:3001/api/notes'

// Render server
const baseURL = 'https://fullstackopen-pitl.onrender.com/api/notes'

//const baseURL = '/api/notes'

// Let's change the attribute baseUrl in the frontend notes app at src/services/notes.js like so:
// nst baseUrl = 'http://localhost:3001/api/notes'
// Now frontend's GET request to http://localhost:3001/api/notes does not work for some reason:
//
// "Access to XMLHttpRequest at 'http://localhost:3001/api/notes' from origin 'http://localhost:5173'
// has been blocked by CORS policy:
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
// :3001/api/notes:1   Failed to load resource: net::ERR_FAILED
// 
// Definition of "URL Origin": protocol + host + port
// e.g.: 
// http://example.com:80/index.html
//  
// protocol: http
// host: example.com
// port: 80


const getAll = () => {
    return axios.get(baseURL).then(res => res.data);
}

const create = newNote => {
    return axios.post(baseURL, newNote).then(res => res.data)
}

const update = (id, newNote) => {
    return axios.put(`${baseURL}/${id}`, newNote).then(res => res.data)
}

export default { getAll, create, update }