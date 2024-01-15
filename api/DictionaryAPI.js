import axiosClient from "../utils/axiosClient";

export const getAuthors = async (setData) => {
    try{
        const response = await axiosClient.get(`/Author`)
        setData(response.data)
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
  export const getDeliveryMethods = async (setData) => {
    try {
      const response = await axiosClient.get(`/DeliveryMethod`)
      setData(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  export const getAvailabilities = async (setData) => {
    try {
      const response = await axiosClient.get(`/Availability`)
      setData(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  export const getLanguage = async (setData) => {
    try {
      const response = await axiosClient.get(`/Language`)
      setData(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  export const getPublisher = async (setData) => {
    try {
      const response = await axiosClient.get(`/Publisher`)
      setData(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  export const getCities = async (setData) => {
    try {
      const response = await axiosClient.get(`/City`)
      setData(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  export const getCountries = async (setData) => {
    try {
      const response = await axiosClient.get(`/Country`)
      setData(response.data)
    } catch (err) {
      console.error(err)
    }
  }