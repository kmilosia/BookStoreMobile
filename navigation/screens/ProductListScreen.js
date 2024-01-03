import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, TextInput, View } from "react-native";
import { COLORS, screenHeight } from "../../styles/constants";
import { AspectRatio, Box, Column,Image, Row, Text } from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAllBooks} from '../../api/BooksAPI'

export default function ProductListScreen({navigation}) {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [isSearchActive, setActive] = useState(false)
    const [value, setValue] = useState('')

    useEffect(()=>{
        getAllBooks(setBooks, setLoading)
    },[])
    return (
        loading ?
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: screenHeight, backgroundColor: 'white'}}>
            <ActivityIndicator size='medium' color={COLORS.accent} />
        </View> 
        :
        <ScrollView>
        <Column bg="white">
            <Row width='100%' padding={2} flex={1}>
                <View style={{position: 'relative', flexGrow: 1}}>
                    <TextInput onFocus={() => setActive(true)} onBlur={() => setActive(false)} style={{width: '100%', padding: 10, paddingRight: 50, fontSize: 16, borderRadius: 8, backgroundColor: 'white', borderWidth: 2, borderColor: isSearchActive ? COLORS.accent : COLORS.borderColor}} placeholder='Szukaj książek..' onChangeText={newValue => setValue(newValue)} />
                    <IconButton onPress={() => navigation.navigate('Search', {searchValue: value})} size={24} color='gray' icon='magnify' style={{zIndex: 100,position: 'absolute', right: 2, bottom: 1, display: 'flex', alignItems: 'center'}}/>
                </View>
                <Pressable style={{borderRadius: 8, backgroundColor: 'white', borderWidth: 2, borderColor: COLORS.borderColor, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, marginLeft: 5 }}><Ionicons name="filter" size={20} /></Pressable>
            </Row>
            <Row justifyContent='space-between' flexWrap='wrap'>
            {books?.map((item,index) => {
                    return(
                        <Box key={index} padding={2} width='50%'>
                        <Column rounded='lg' bg='white' borderWidth={2} borderColor={COLORS.borderColor} padding={3}>
                            <AspectRatio ratio={3/4} width='100%'>
                                <Image source={{uri: item.imageURL}} rounded='lg' alt='Image Book Cover' />
                            </AspectRatio>
                            <Text fontWeight='bold' fontSize={14} marginTop={2} lineHeight={16}>{item.title}</Text>
                            <Text fontSize={12} fontWeight='light'>{item.authors?.map((item) => {return (item.name + " " + item.surname )})}</Text>
                            <Row justifyContent='space-between' alignItems='center' marginTop={3}>
                                <Text fontSize={16} fontWeight='bold'>{item.price?.toFixed(2)}zł</Text>
                                <Row alignItems='center'>
                                    <Text fontSize={14} marginRight={1}>{item.score}</Text>
                                    <FontAwesome name='star' size={18} color='gold' />
                                </Row>
                            </Row>
                        </Column>
                        </Box>
                    )
                })}
            </Row>
            </Column>
        </ScrollView>      
    )
}