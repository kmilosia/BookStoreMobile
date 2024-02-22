import AsyncStorage from "@react-native-async-storage/async-storage"
import axiosClient from "../utils/axiosClient"

export const getWishlist = async (data, setData, setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/Wishlist/${data}`, {
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
  export const getWishlistGuid = async (setData) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get('/Wishlist', {
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
  }
  export const deleteWishlistItem = async (id) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.post(`/Wishlist/Item?bookItemId=${id}&isWishlisted=true`, null, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
  }
  export const addWishlistItem = async (id) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.post(`/Wishlist/Item?bookItemId=${id}&isWishlisted=false`, null, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
  }