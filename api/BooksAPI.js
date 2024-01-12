import axiosClient from "../utils/axiosClient"

export const getSearchResults = async (search,setData,setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?searchPhrase=${search}`)
        setData(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }

  export const getBooksByCategory = async (id,setData,setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?categoryIds=${id}`)
        setData(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }
  export const getAllBooks = async (setBooks,setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store`)
        setBooks(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }
  export const getSortedBooks = async (setBooks,setLoading, sorting) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?${sorting}`)
        setBooks(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }

  export const getBookDetails = async (id, setData, setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store/${id}`)
        setData(response.data)
        console.log(response.data);
        setLoading(false)
    }catch(err){
        console.error(err)
    }
}
export const getBooksByBookId = async (id, setData) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?bookId=${id}`)
        setData(response.data)
    }catch(err){
        console.error(err)
    }
}

export const getSimilarBooks = async (id, setData) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?categoryIds=${id}&numberOfElements=10`)
        setData(response.data)
    }catch(err){
        console.error(err)
    }
}