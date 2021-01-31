import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://us-central1-burger-builder-backend-a23fb.cloudfunctions.net/app/api'
})

export default axiosInstance