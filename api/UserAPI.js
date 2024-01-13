import AsyncStorage from "@react-native-async-storage/async-storage"
import axiosClient from "../utils/axiosClient"

export const recoverPassword = async (data, setLoading, setError, setEmailSent) => {
    try{
      const response = await axiosClient.post('/Account/ForgotPassword', data)
      setLoading(false)
      if (response.status === 200) {
        setEmailSent(true)
      }
      }catch(error){
        if (error.response && error.response.status === 400) {
            console.log(error.response.data)
          } else {
            console.log(error)
          }
          setLoading(false)
    }
  }

  export const signUp = async (data, setLoading, setError,setRegistered) => {
    try{
      const response = await axiosClient.post('/Account/Register', data)
      setLoading(false)
      if (response.status === 200) {
        setRegistered(true)
      }
      }catch(error){
        if (error.response && error.response.status === 400) {
            console.log(error.response.data)
          } else {
            console.log(error)
          }
          setLoading(false)
    }
  }

  export const getUserData = async (setData, setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/User`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        console.log(response.data);
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error(error)
    }
  }