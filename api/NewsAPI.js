import axiosClient from "../utils/axiosClient";

export const getNews = async (setData) => {
    try {
      const response = await axiosClient.get('News')
      setData(response.data)
    } catch (e) {
      console.error(e)
    }
  }
  export const getNewsByAmount = async (amount,setData, setLoading) => {
    try {
      const response = await axiosClient.get(`News/Elements?numberOfElements=${amount}`)
      setData(response.data)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }
  export const getNewsDetails = async (id,setData, setLoading) => {
    try {
      const response = await axiosClient.get(`News/${id}`)
      setData(response.data)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }
