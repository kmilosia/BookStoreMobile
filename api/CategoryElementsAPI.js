import axiosClient from "../utils/axiosClient"

export const getCategoryElements = async (setData, setLoading) => {
    try {
      const response = await axiosClient.get('/CategoryElements')
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }