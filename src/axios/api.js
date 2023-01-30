import axios from "axios";

export default axios.create({
  headers: { 'Access-Control-Allow-Origin': 'https://backend-adm-server-production.up.railway.app' },
  withCredentials: true,
  baseURL: 'https://backend-adm-server-production.up.railway.app'
})

// export default axios.create({
//   headers: { "Access-Control-Allow-Origin": "http://localhost:2000" },
//   withCredentials: true,
//   baseURL: "http://localhost:2000",
// });
