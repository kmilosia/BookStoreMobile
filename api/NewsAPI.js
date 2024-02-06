import axiosClient from "../utils/axiosClient";

export const getNews = async (setData) => {
    try {
      const response = await axiosClient.get('News')
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  export const getNewsByAmount = async (amount,setData, setLoading) => {
    try {
      const response = await axiosClient.get(`News/Elements?numberOfElements=${amount}`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  export const getNewsDetails = async (id,setData, setLoading) => {
    try {
      const response = await axiosClient.get(`News/${id}`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
