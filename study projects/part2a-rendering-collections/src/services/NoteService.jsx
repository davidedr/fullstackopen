import axios from "axios";
const baseURL = 'http://localhost:3001/notes'

const getAll = () => {
    return axios.get(baseURL);
}

const create = newNote => {
    return axios.post(baseURL, newNote)
}

const update = (id, newNote) => {
    return axios.put(`${baseURL}/${id}`, newNote)
}

export default { getAll, create, update }