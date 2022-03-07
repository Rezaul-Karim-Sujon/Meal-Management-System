import axios from "axios"
import { getToken } from "./tokenFunction"

const baseURL = "http://localhost:12269/api/"

let headers = {}
const TOKEN = localStorage.getItem("token")


if(TOKEN!==null){
    headers.Authorization = `Bearer ${TOKEN}`;
}

console.log(" headers : ",headers)
const axiosInstance = axios.create({
    baseURL:baseURL,
    headers,
})

export default axiosInstance;