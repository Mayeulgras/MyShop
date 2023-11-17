import axios from 'axios'

const Axios = axios.create({
    baseURL: 'http://localhost:5174'
})

export default Axios
