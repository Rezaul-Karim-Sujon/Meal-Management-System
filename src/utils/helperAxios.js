import axios from "axios"
import { getToken } from "./tokenFunction"

const baseURL = "http://localhost:12269/api/"

let headers = {}
const TOKEN = getToken()

if(TOKEN!==""){
    headers.Authorization = `Bearer ${TOKEN}`;
}

const axiosInstance = axios.create({
    baseURL:baseURL,
    headers,
})

export default axiosInstance;