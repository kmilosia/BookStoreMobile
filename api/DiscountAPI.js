import axiosClient from "../utils/axiosClient"

export const restoreDiscountCode = async (data, setLoading, setError,setData) => {
    try{
      const response = await axiosClient.post('/User/Order/DiscountCode', data)
      if (response.status === 200 || response.status === 204) {
        setData(response.data)
      }else{
        setError("Niepoprawny kod rabatowy")
      }
      setLoading(false)
      }catch(e){
        setError("Niepoprawny kod rabatowy")
        setLoading(false)
    }
  }