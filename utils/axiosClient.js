import axios from "axios"

const axiosClient = axios.create({
    baseURL: `http://172.30.14.249:7247/api`,
  })   
  export default axiosClient