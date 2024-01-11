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
        console.log(userToken);
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error('Error wishlist:', error);
    }
  }
  export const getWishlistGuid = async (setData) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get('/Wishlist', {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        })
        setData(response.data)
    } catch (error) {
        console.error('Error guid:', error);
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
        console.error(error)
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
        console.error(error)
    }
  }