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
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }