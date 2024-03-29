import AsyncStorage from "@react-native-async-storage/async-storage"
import axiosClient from "../utils/axiosClient"

export const recoverPassword = async (data, setLoading, setEmailSent) => {
    try{
      const response = await axiosClient.post('/Account/ForgotPassword', data)
      if (response.status === 200 || response.status === 204){
        setEmailSent(true)
      }
      }catch(error){
        console.log(error);
    }
    setLoading(false)
  }

  export const signUp = async (data, setLoading, setError,setRegistered) => {
    try{
      const response = await axiosClient.post('/Account/Register', data)
      if (response.status === 200 || response.status === 204) {
        setRegistered(true)
      }else{
        setError("Błąd podczas tworzenia konta")
      }
      }catch(e){
        setError("Błąd podczas tworzenia konta")
    }
    setLoading(false)
  }

  export const getUserData = async (setData, setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/User`, {
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
  export const editUserData = async (data, setLoading,setSuccess) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.put(`/User`, data,  {
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
      console.log(error);
      setSuccess(false)
    }
    setLoading(false)
  }
  export const changePassword = async (data, setLoading,setSuccess) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.put(`/User/Password`, data,  {
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
      setSuccess(false)
    }
    setLoading(false)
  }

  export const getUserAddress = async (setData,setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/User/Address`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        if(response.status === 200 || response.status === 204){
        setData(response.data)
        }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }
  export const changeUserAddress = async (data,setLoading, setSuccess) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.post(`/User/Address`,data, {
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
      setSuccess(false)
    }
    setLoading(false)
  }