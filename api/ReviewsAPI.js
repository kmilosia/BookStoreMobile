import axiosClient from "../utils/axiosClient"

export const getReviews = async (id,setData, setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItemReview/Get-Product-Reviews?bookItemId=${id}`)
        setData(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
}
export const getReviewsByAmount = async (id, setData, number) => {
    try{
        const response = await axiosClient.get(`/BookItemReview/Get-Product-Reviews?bookItemId=${id}&numberOfElements=${number}`)
        setData(response.data)
    }catch(err){
        console.error(err)
    }
}