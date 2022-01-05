import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  timeout: 10000,
})

export default {
  API_get() {
    return apiClient.get(`/columns`)
  },
}
