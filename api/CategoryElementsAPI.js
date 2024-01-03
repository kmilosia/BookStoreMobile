import axiosClient from "../utils/axiosClient"

export const getCategoryElements = async (setData, setLoading) => {
    try {
      const response = await axiosClient.get('/CategoryElements')
      setData(response.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }