import axios from 'axios'
import { baseURL } from 'src/constant'

const axiosInstance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
})

export default axiosInstance