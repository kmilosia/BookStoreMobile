import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../utils/axiosClient";

export const getLibraryItems = async (id, setData, setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/Library?libraryStatusId=${id}`, {
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