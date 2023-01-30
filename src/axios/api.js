import axios from 'axios'

export default axios.create({
  headers: { 'Access-Control-Allow-Origin': 'https://backend-adm-server-production.up.railway.app' },
  withCredentials: true,
  baseURL: 'https://backend-adm-server-production.up.railway.app'
})
