import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../utils/axiosClient";

export const getUserOrders = async (filter,setData,setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/User/Order?${filter}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
    } catch (error) {
        console.log(error)
    }
    setLoading(false)
  }
  export const getOrder = async (id, setData,setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/User/Order/${id}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
    } catch (error) {
        console.log(error)
    }
    setLoading(false)
  }
  export const makeOrder = async (data,setLoading, setSuccess) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.post(`/User/Order`, data, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        if(response.status === 200 || response.status === 204){
            setSuccess(true)
        }else{
            setSuccess(false)
        }
    } catch (error) {
        console.log(error)
        setSuccess(false)
    }
    setLoading(false)
  }