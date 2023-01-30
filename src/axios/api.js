import axios from 'axios'

export default axios.create({
  headers: { 'Access-Control-Allow-Origin': 'http://localhost:2000' },
  withCredentials: true,
  baseURL: 'http://localhost:2000'
})
