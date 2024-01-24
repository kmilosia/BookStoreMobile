import axios from "axios"

const axiosClient = axios.create({
    baseURL: `http://192.168.0.107:7247/api`,
  })   
  export default axiosClient