import axiosClient from "../utils/axiosClient"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const loginUser = async (data, setLoading, setError) => {
    try{
      const response = await axiosClient.post('/Account/login', data)
      await AsyncStorage.setItem('token', response.data);
      setLoading(false)
      navigation.navigate('Home')
    }catch(error){
        if (error.response && error.response.status === 400) {
            setError(error.response.data)
          } else {
            setError(error)
          }
          setLoading(false)
    }
  }