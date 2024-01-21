import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../utils/axiosClient";

export const reserveBook = async (id) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.post(`/Reservations/Store/${id}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        setLoading(false)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }
  export const deleteReservation = async (id) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.delete(`/Reservations/Store/${id}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        setLoading(false)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }
  export const getReservations = async (setData, setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/Reservations/Store`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        setLoading(false)
        setData(response.data)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }
  export const getReservationDetails = async (id,setData, setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/Reservations/${id}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        setLoading(false)
        setData(response.data)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }