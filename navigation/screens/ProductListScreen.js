import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, TextInput, View } from "react-native";
import { COLORS, screenHeight } from "../../styles/constants";
import { AspectRatio, Box, CheckIcon, Column,Image, Row, Select, Text } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAllBooks, getSortedBooks} from '../../api/BooksAPI'
import ProductElement from "../../components/ProductElement";
import FormFilter from "../../components/filters/FormFilter";

export default function ProductListScreen({navigation}) {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [isSearchActive, setActive] = useState(false)
    const [value, setValue] = useState('')
    const [sorting, setSorting] = useState('')
    const [isFilterWindow, setIsFilterWindow] = useState(false)
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

    useEffect(()=>{
        getAllBooks(setBooks, setLoading)
    },[])
    useEffect(() => {
        setLoading(true)
        getSortedBooks(setBooks,setLoading, sorting)
    },[sorting])
    return (
        <>
        <ScrollView>
        <Column bg={COLORS.primary}>
            <Row width='100%' padding={2} flex={1}>
                <Select color='white' fontSize={14} borderWidth={2} borderColor={COLORS.triary} rounded='lg' flex={1} selectedValue={sorting} accessibilityLabel="Sortuj książki" width='100%' placeholder="Sortuj książki" mt={1} onValueChange={itemValue => setSorting(itemValue)}>
                  <Select.Item label="Domyślnie" value="" />
                  <Select.Item label="Alfabetycznie od A do Z" value="sortBy=alphabetical&sortOrder=desc" />
                  <Select.Item label="Alfabetycznie od Z do A" value="sortBy=alphabetical&sortOrder=asc" />
                  <Select.Item label="Cena malejąco" value="sortBy=price&sortOrder=desc" />
                  <Select.Item label="Cena rosnąco" value="sortBy=price&sortOrder=asc" />
                </Select>
                 {/*<View style={{position: 'relative', flexGrow: 1}}>
                    <TextInput onFocus={() => setActive(true)} onBlur={() => setActive(false)} 
                    style={{width: '100%', padding: 10, paddingRight: 50, fontSize: 16,backgroundColor: COLORS.secondary, color: 'white', borderRadius: 8, borderWidth: 2, borderColor: isSearchActive ? COLORS.accent : COLORS.triary}} placeholderTextColor={COLORS.triary} placeholder='Szukaj książek..' onChangeText={newValue => setValue(newValue)} />
                    <Ionicons name='search' size={20} color='white' style={{position: 'absolute', top: '50%',transform: [{translateY: -10}], right: 10, zIndex: 100}} />
                </View>*/}
                <Pressable onPress={() => {setIsFilterWindow(true)}} style={{marginTop: 4, borderRadius: 8, backgroundColor: COLORS.primary, borderWidth: 2, borderColor: COLORS.triary, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, marginLeft: 5 }}><Ionicons name="filter" size={20} color='white' /></Pressable>
            </Row>
            {loading ?
                <View style={{display: 'flex',backgroundColor: 'blue', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: screenHeight, backgroundColor: COLORS.primary}}>
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
        <Modal animationType="slide" transparent={true} visible={isFilterWindow} onRequestClose={() => {setIsFilterWindow(!isFilterWindow);}}>
            <View style={{ flex: 1, backgroundColor: COLORS.primary, padding: 20, alignItems: 'center' }}>
                <Pressable onPress={() => setFiltersOpen({ ...filtersOpen, form: !filtersOpen.form })} style={{width: '100%', paddingHorizontal: 14, paddingVertical: 10, borderWidth: 2, borderColor: COLORS.triary, borderRadius: 8, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text fontWeight={500} fontSize={18} color='white'>Rodzaj</Text>
                    <Ionicons name='chevron-down' color='white' size={18} />
                </Pressable>
                {filtersOpen.form &&
                <FormFilter />
                }
                <Pressable onPress={() => setIsFilterWindow(!isFilterWindow)} style={{ marginTop: 10, padding: 10, backgroundColor: COLORS.accent, borderRadius: 20 }}>
                    <Ionicons name="close" color='white' size={20} />
                </Pressable>
            </View>
        </Modal>  
        </>    
    )
}