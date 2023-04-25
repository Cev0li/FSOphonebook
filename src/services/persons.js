import axios from 'axios'

//JSON server location for app data set
const baseUrl = 'http://localhost:3001/persons'

//Request to retrieve server state
const getAll = () => {
    const r = axios.get(baseUrl)
    return r.then(response => response.data)
}

//Request to retrieve single user
const getPerson = (id) => {
    const r = axios.get(`${baseUrl}/${id}`)
    return r.then(response => response.data)
}
//request to add new person to server
const create = (newObject) => {
    const r = axios.post(baseUrl, newObject)
    return r.then(response => response.data)
}

const update = (newObject) => {
    const r = axios.put(`http://localhost:3001/persons/${newObject.id}`, {...newObject})
    return r.then(response => response.data)
}

//request to delete person from server
const deleteEntry = (id) => {
    const r = axios.delete(`${baseUrl}/${id}`)
    return r.then(response => response.data)
}

//export object
const service = {
    getAll,
    getPerson,
    create,
    update,
    deleteEntry
}

export default service