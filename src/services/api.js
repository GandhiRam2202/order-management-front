import axios from "axios"

const API = axios.create({
  baseURL: "https://order-management-back-j1pm.onrender.com/api",
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY
  }
})

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token")

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req

})

export default API