import axios from "axios";

const api = axios.create({
    baseURL: 'https://devmapas.herokuapp.com/'
})

export default api