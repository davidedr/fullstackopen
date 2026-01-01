import axios from "axios";
const baseURL = 'http://localhost:3001/notes'

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