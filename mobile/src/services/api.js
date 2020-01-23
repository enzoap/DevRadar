import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.0.25:3333' || 'https://devmapas.herokuapp.com/'
})

export default api