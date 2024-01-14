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
  export const getForms = async (setData) => {
    try {
      const response = await axiosClient.get(`/Form`)
      setData(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  export const getPaymentMethods = async (setData) => {
    try {
      const response = await axiosClient.get(`/PaymentMethod`)
      setData(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  export const getRentalTypes = async (setData) => {
    try {
      const response = await axiosClient.get(`/RentalType`)
      setData(response.data)
    } catch (err) {
      console.error(err)
    }
  }