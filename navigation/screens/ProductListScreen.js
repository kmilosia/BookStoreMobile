import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, TextInput, View } from "react-native";
import { COLORS, screenHeight, styles } from "../../styles/constants";
import { AspectRatio, Box, CheckIcon, Column,Image, Row, Select, Text } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAllBooks, getSortedAndFilteredBooks, getSortedBooks} from '../../api/BooksAPI'
import ProductElement from "../../components/ProductElement";
import FormsFilter from "../../components/filters/FormsFilter";
import StockFilter from "../../components/filters/StockFilter";

export default function ProductListScreen({navigation}) {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [isSearchActive, setActive] = useState(false)
    const [value, setValue] = useState('')
    const [sorting, setSorting] = useState('')
    const [isFilterWindow, setIsFilterWindow] = useState(false)
    const [filter, setFilter] = useState('')
    const [filterElements, setFilterElements] = useState ({
        minPrice: '',
        maxPrice: '',
        author: '',
        publisher: '',
        category: '',
        language: '',
        score: '',
        stock: '',
        form: '',
    })
    const [filtersOpen, setFiltersOpen] = useState({
        form: false,
        stock: false,
        score: false,
        publisher: false,
        author: false,
        price: false,
        language: false,
        category: false
    })
    const buildFilter = () => {
        let filter = ''
        if (filterElements.minPrice !== '') {
          filter += `&priceFrom=${filterElements.minPrice}`
        }
        if (filterElements.maxPrice !== '') {
          filter += `&priceTo=${filterElements.maxPrice}`
        }
        if (filterElements.author !== '') {
            filter += `${filterElements.author}`
        }
        if (filterElements.publisher !== '') {
            filter += `${filterElements.publisher}`
        }
        if (filterElements.category !== '') {
            filter += `${filterElements.category}`
        }
        if (filterElements.language !== '') {
            filter += `${filterElements.language}`
        }
        if (filterElements.stock !== '') {
            filter += `${filterElements.stock}`
        }
        if (filterElements.score !== '') {
            filter += `${filterElements.score}`
        }
        if (filterElements.form !== '') {
            filter += `${filterElements.form}`
        }
        return filter
      }
      const applyFilters =() => {
        // isFilterWindow(false)
        const newFilter = buildFilter()
        setFilter(newFilter)
        console.log(filter);
    }
    const clearFilters = () => {
        setFilterElements({
          minPrice: '',
          maxPrice: '',
          author: '',
          publisher: '',
          category: '',
          language: '',
          score: '',
          stock: '',
          form: '',
        })
      }
    useEffect(()=>{
        getAllBooks(setBooks, setLoading)
    },[])
    // useEffect(() => {
    //     setLoading(true)
    //     getSortedAndFilteredBooks(setBooks,setLoading, sorting,filter)
    // },[sorting,filter])
    return (
        <>
        <ScrollView>
        <Column bg={COLORS.primary}>
            <Row width='100%' padding={2} flex={1}>
                <Select color='white' fontSize={14} borderWidth={2} backgroundColor={COLORS.secondary} borderColor={COLORS.triary} rounded='lg' flex={1} selectedValue={sorting} accessibilityLabel="Sortuj książki" width='100%' placeholder="Sortuj książki" mt={1} onValueChange={itemValue => setSorting(itemValue)}>
                  <Select.Item label="Domyślnie" value="" />
                  <Select.Item label="Alfabetycznie od A do Z" value="sortBy=alphabetical&sortOrder=asc" />
                  <Select.Item label="Alfabetycznie od Z do A" value="sortBy=alphabetical&sortOrder=desc" />
                  <Select.Item label="Cena malejąco" value="sortBy=price&sortOrder=desc" />
                  <Select.Item label="Cena rosnąco" value="sortBy=price&sortOrder=asc" />
                </Select>
                <Pressable onPress={() => {setIsFilterWindow(true)}} style={{marginTop: 4, borderRadius: 8, backgroundColor: COLORS.secondary, borderWidth: 2, borderColor: COLORS.triary, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, marginLeft: 5 }}><Ionicons name="filter" size={20} color='white' /></Pressable>
            </Row>
            {loading ?
                <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: screenHeight, backgroundColor: COLORS.primary}}>
                    <ActivityIndicator size='medium' color={COLORS.accent} />
                </View> 
            :
            <Row justifyContent='space-between' flexWrap='wrap'>
            {books?.map((item,index) => {
                    return(
                        <ProductElement item={item} key={index} />                    
                    )
                })}
            </Row>}
            </Column>
        </ScrollView>
        <Modal animationType="fade" transparent={true} visible={isFilterWindow} onRequestClose={() => {setIsFilterWindow(!isFilterWindow);}}>
            <View style={{ flex: 1, backgroundColor: COLORS.primary,padding: 20, alignItems: 'center' }}>
                <Row justifyContent='space-between' alignItems='center' width='100%' maxWidth='100%' marginBottom={3}>
                <Pressable onPress={() => clearFilters()}>
                    <Text color={COLORS.light} fontWeight={300} fontSize={12}>Wyczyść filtry</Text>
                </Pressable>
                <Pressable onPress={() => setIsFilterWindow(false)}>
                    <Ionicons name="close" color='white' size={26} />
                </Pressable>
                </Row>
                
                <FormsFilter filtersOpen={filtersOpen} filterElements={filterElements} setFilterElements={setFilterElements} setFiltersOpen={setFiltersOpen}/>
                <StockFilter filtersOpen={filtersOpen} filterElements={filterElements} setFilterElements={setFilterElements} setFiltersOpen={setFiltersOpen}/>
                
                <Pressable onPress={() => applyFilters()} style={{ marginTop: 'auto', padding: 10, backgroundColor: COLORS.accent, borderRadius: 30, width: '100%' }}>
                    <Text textAlign='center' fontSize={16} fontWeight={500} color='white'>Filtruj wyniki</Text>
                </Pressable>
            </View>
        </Modal>  
        </>    
    )
}