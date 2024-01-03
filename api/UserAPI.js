import axiosClient from "../utils/axiosClient"

export const loginUser = async (data, setLoading, setError) => {
    try{
        const response = await axiosClient.post('/Account/login', data)
        setLoading(false)
        console.log(response.data);
        return response.data    
    }catch(error){
        if (error.response && error.response.status === 400) {
            setError(error.response.data)
          } else {
            setError(error)
          }
          setLoading(false)
    }
  }