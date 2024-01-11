import React,{useState} from 'react';
import { View, TextInput, Image } from 'react-native';
import { getSearchResults } from '../../api/BooksAPI';
import { COLORS, screenHeight } from '../../styles/constants';
import { ScrollView } from 'react-native';
import { Column, Row, Text } from 'native-base';
import { Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductElement from '../../components/ProductElement';
import PageLoader from '../../components/loaders/PageLoader';

export default function SearchScreen() {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    
    const searchForBooks = () => {
        setSubmitted(true)
        setLoading(true)
        getSearchResults(search, setData, setLoading)
    }
    return (
        <ScrollView>
            <Column bg={COLORS.primary} minHeight={screenHeight - 40} padding={3}>
                <View style={{position: 'relative', width: '100', marginBottom: 10}}>
                    <TextInput style={{width: '100', paddingHorizontal: 15,paddingVertical: 10, paddingRight: 70, borderRadius: 30, backgroundColor: COLORS.secondary, borderWidth: 2, borderColor: COLORS.triary, color: 'white'}} placeholderTextColor={COLORS.triary} placeholder='Szukaj książek..' onChangeText={newValue => setSearch(newValue)} />
                    <Pressable onPress={() => {searchForBooks()}} style={{backgroundColor: COLORS.accent, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0, height: '100%', padding: 14, borderRadius: 30, borderWidth: 2, borderColor: COLORS.triary}}>
                        <Ionicons name='search' color='white' size={20}/>
                    </Pressable>
                </View>
                {loading ? <PageLoader /> :
                <>
                {submitted ?
                <>
                {data.length > 0 ?
                  <Column>
                  <Row justifyContent='space-between' flexWrap='wrap'>
                  {data?.map((item,index) => {
                      return (
                          <ProductElement item={item} key={index} />                    
                      )
                  })}
                  </Row>
                  </Column>
                :
                <Column padding={5} width='100%' height='80%' bg={COLORS.primary} alignItems='center' justifyContent='center'>
                <Image source={{uri: 'https://iili.io/J7pq7EP.png'}} width={200} height={200} alt='Nie znaleziono wyników' />
                <Text textAlign='center' marginTop={5} color='white' fontSize={28} lineHeight={30} fontWeight={500}>Nie znaleziono wyników wyszukiwania</Text>
                <Text textAlign='center' marginTop={2} color='white' fontSize={16} fontWeight={300}>Spróbuj wyszukać książki używając innego tytułu lub imiona autora.</Text>
                </Column>
                }
                </>
                :
                <Column padding={5} width='100%' height='80%' bg={COLORS.primary} alignItems='center' justifyContent='center'>
                <Image source={{uri: 'https://iili.io/J7pzAZJ.png'}} width={200} height={200} alt='Szukaj wyników' />
                <Text textAlign='center' marginTop={5} color='white' fontSize={28} lineHeight={30} fontWeight={500}>Szukaj książek</Text>
                <Text textAlign='center' marginTop={2} color='white' fontSize={16} fontWeight={300}>Wyszukaj wymarzoną książkę po tytule lub po jej autorze.</Text>
                </Column>
                }
                </>    
                }
            </Column>
        </ScrollView>
    )
}