import AsyncStorage from "@react-native-async-storage/async-storage"
import axiosClient from "../utils/axiosClient"

export const getSearchResults = async (search,setData,setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?searchPhrase=${search}`)
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
    }catch(err){
        console.log(err)
    }
    setLoading(false)
  }

  export const getBooksByCategory = async (id,setData,setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?categoryIds=${id}`)
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
    }catch(err){
        console.log(err)
    }
    setLoading(false)
  }
  export const getAllBooks = async (setBooks,setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store`)
        if (response.status === 200 || response.status === 204) {
        setBooks(response.data)
        }
    }catch(err){
        console.log(err)
    }
    setLoading(false)
  }
  export const getSortedBooks = async (setBooks,setLoading, sorting) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?${sorting}`)
        if (response.status === 200 || response.status === 204) {
        setBooks(response.data)
        }
    }catch(err){
        console.log(err)
    }
    setLoading(false)
  }
  export const getSortedAndFilteredBooks = async (setBooks,setLoading, sorting, filter) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?${filter}&${sorting}`)
        if (response.status === 200 || response.status === 204) {
        setBooks(response.data)
        }
    }catch(err){
        console.log(err)
    }
    setLoading(false)
  }
  export const getBookDetails = async (id, setData, setLoading) => {
    try{
        const userToken = await AsyncStorage.getItem('token')
        const response = await axiosClient.get(`/BookItems/Store/${id}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        })
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
    }catch(err){
        console.log(err)
    }
    setLoading(false)
}
export const getBooksByBookId = async (id, setData) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?bookId=${id}`)
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
    }catch(err){
        console.log(err)
    }
}

export const getSimilarBooks = async (id, setData) => {
    try{
        const response = await axiosClient.get(`/BookItems/Store?categoryIds=${id}&numberOfElements=10`)
        if (response.status === 200 || response.status === 204) {
        setData(response.data)
        }
    }catch(err){
        console.log(err)
    }
}