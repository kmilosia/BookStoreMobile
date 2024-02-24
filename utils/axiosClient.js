import axios from "axios"
import { baseURL } from "./baseURL"

const axiosClient = axios.create({
    baseURL: `${baseURL}/api`,
  })   
  export default axiosClient