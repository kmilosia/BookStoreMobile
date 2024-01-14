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
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error(error);
    }
}
export const getRentedBooks = async (setData, setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get('/Rental', {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        })
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error(error);
    }
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
        setLoading(false)
    } catch (error) {
        console.error(error);
        setLoading(false)
    }
}