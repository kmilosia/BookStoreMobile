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
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
    } catch (error) {
        console.log(error)
    }
    setLoading(false)
}