import axios from "axios";
const baseURL = 'http://localhost:5000/api/persons'

const getAll = () => {
    return axios.get(baseURL).then(res => res.data);
}

const create = newObject => {
    return axios.post(baseURL, newObject).then(res => res.data).catch(err => console.log(err.response.data.error))
}

const update = (id, updatedObject) => {
    return axios.put(`${baseURL}/${id}`, updatedObject).then(res => res.data)
}

const remove = (id) => {
    console.log("remove", id, `${baseURL}/${id}`);
    return axios.delete(`${baseURL}/${id}`).then(res => res.data)
}

export default { getAll, create, update, remove }