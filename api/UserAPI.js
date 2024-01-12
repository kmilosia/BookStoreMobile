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