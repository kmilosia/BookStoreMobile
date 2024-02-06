import axiosClient from "../utils/axiosClient";

export const getAuthors = async (setData) => {
    try{
        const response = await axiosClient.get(`/Author`)
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
    }catch(err){
        console.log(err)
    }
  }
  export const getCategories = async (setData) => {
    try {
      const response = await axiosClient.get(`/Category`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  export const getForms = async (setData) => {
    try {
      const response = await axiosClient.get(`/Form`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  export const getPaymentMethods = async (setData) => {
    try {
      const response = await axiosClient.get(`/PaymentMethod`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  export const getRentalTypes = async (setData) => {
    try {
      const response = await axiosClient.get(`/RentalType`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  export const getDeliveryMethods = async (setData) => {
    try {
      const response = await axiosClient.get(`/DeliveryMethod`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  export const getAvailabilities = async (setData) => {
    try {
      const response = await axiosClient.get(`/Availability`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  export const getLanguage = async (setData) => {
    try {
      const response = await axiosClient.get(`/Language`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  export const getPublisher = async (setData) => {
    try {
      const response = await axiosClient.get(`/Publisher`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  export const getCities = async (setData) => {
    try {
      const response = await axiosClient.get(`/City`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  export const getCountries = async (setData) => {
    try {
      const response = await axiosClient.get(`/Country`)
      if (response.status === 200 || response.status === 204) {
      setData(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }