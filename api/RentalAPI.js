import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../utils/axiosClient";

export const getPurchasedBooks = async (setData, setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get('/Rental', {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        })
        if(response.status === 200 || response.status === 204){
        setData(response.data)
        }
    } catch (error) {
        console.log(error)
    }
    setLoading(false)
}
export const getRentedBooks = async (setData, setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get('/Rental?rentalTypeId=1', {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        })
        if(response.status === 200 || response.status === 204){
        setData(response.data)
        }
    } catch (error) {
        console.log(error)
    }
    setLoading(false)
}

export const rentBook = async (data, setLoading, setSuccess) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.post('/Rental',data, {
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

export const getUserRentedBooks = async (filter, setData, setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/Rental?${filter}`, {
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