import AsyncStorage from "@react-native-async-storage/async-storage"
import axiosClient from "../utils/axiosClient"

export const getReviews = async (id,setData, setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItemReview?bookItemId=${id}`)
        setData(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
}
export const getReviewsByAmount = async (id, setData, number) => {
    try{
        const response = await axiosClient.get(`/BookItemReview?bookItemId=${id}&numberOfElements=${number}`)
        setData(response.data)
    }catch(err){
        console.error(err)
    }
}
export const addReview = async (data,setLoading, setSuccess) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        console.log(userToken);
        const response = await axiosClient.post(`/BookItemReview`,data, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        setLoading(false)
        if(response.status === 200 || response.status === 204){
          setSuccess(true)
        }else{
          setSuccess(false)
        }
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
  }