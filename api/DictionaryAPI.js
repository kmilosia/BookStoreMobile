import axiosClient from "../utils/axiosClient";

export const getAuthors = async (setData,setLoading) => {
    try{
        const response = await axiosClient.get(`/Author`)
        setData(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }
  export const getCategories = async (setData) => {
    try {
      const response = await axiosClient.get(`/Category`)
      setData(response.data)
    } catch (err) {
      console.error(err)
    }
  }