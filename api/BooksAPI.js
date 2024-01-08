import axiosClient from "../utils/axiosClient"

export const getSearchResults = async (search,sorting,setData,setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/All-Books?searchPhrase=${search}&${sorting}`)
        setData(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }

  export const getBooksByCategory = async (id,setData,setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/All-Books?categoryIds=${id}`)
        setData(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }
  export const getAllBooks = async (setBooks,setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/All-Books`)
        setBooks(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }
  export const getSortedBooks = async (setBooks,setLoading, sorting) => {
    try{
        const response = await axiosClient.get(`/BookItems/All-Books?${sorting}`)
        setBooks(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }

  export const getBookDetails = async (id, setData, setLoading) => {
    try{
        const response = await axiosClient.get(`/BookItems/Book-Details?bookItemId=${id}`)
        setData(response.data)
        console.log(response.data);
        setLoading(false)
    }catch(err){
        console.error(err)
    }
}