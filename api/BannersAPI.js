import axiosClient from "../utils/axiosClient";

export const getBanners = async (setData, setLoading) => {
    try {
      const response = await axiosClient.get('Banner')
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }