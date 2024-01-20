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
      }else{
        setError("Błąd podczas tworzenia konta")
      }
      }catch(e){
        setError("Błąd podczas tworzenia konta")
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
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error(error)
    }
  }
  export const editUserData = async (data, setLoading,setSuccess) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        console.log(userToken);
        const response = await axiosClient.put(`/User`, data,  {
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
        console.error(error)
    }
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
        setLoading(false)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }

  export const getUserAddress = async (setData,setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/User/Address`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        setData(response.data)
        console.log(response.data);
        setLoading(false)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }
  export const changeUserAddress = async (data,setLoading, setSuccess) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.post(`/User/Address`,data, {
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
        console.error(error)
        setLoading(false)
    }
  }
  export const makeOrder = async (data) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.post(`/User/Order`, data, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        
    } catch (error) {
        console.error(error)
    }
  }
  export const getUserOrders = async (filter,setData,setLoading) => {
    try {
        const userToken = await AsyncStorage.getItem('token');
        const response = await axiosClient.get(`/User/Address?${filter}`, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
        })
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }