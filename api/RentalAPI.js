import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../utils/axiosClient";

export const getPurchasedBooks = async (setData, setLoading) => {
    try {
        console.log("here");
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get('/Rental', {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        })
        console.log(response.data);
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error(error);
    }
}
export const getRentedBooks = async (setData, setLoading) => {
    try {
        console.log("here");
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get('/Rental', {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        })
        console.log(response.data);
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error(error);
    }
}