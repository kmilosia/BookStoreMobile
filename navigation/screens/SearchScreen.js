import React,{useEffect,useState} from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { getSearchResults } from '../../api/BooksAPI';
import { getAuthors } from '../../api/DictionaryAPI';
import { COLORS, screenHeight } from '../../styles/constants';
import { Dimensions } from "react-native";
import { ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Box, Column, HStack, Select, VStack } from 'native-base';
import axiosClient from '../../utils/axiosClient';


export default function SearchScreen({ navigation, route }) {
    // const value = route.params.searchValue
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [sorting, setSorting] = useState('')
    
    useEffect(() => {
        // getAuthors(setData,setLoading)
        // getSearchResults(value,sorting,setData,setLoading)
    },[])
    return (
        loading ? 
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: screenHeight + 40, backgroundColor: COLORS.primary}}>
            <ActivityIndicator size='medium' color={COLORS.accent} />
        </View> 
        :
        <ScrollView>
            <Column style={{display: 'grid', gridTemplateRows: 'repeat(1, minmax(0, 1fr))', gap: 10,}} bg={COLORS.primary} minHeight={screenHeight} padding={5}>
                <Select color='white' placeholder='Sortuj wyniki..' borderColor={COLORS.triary} bg={COLORS.secondary} selectedValue={sorting} onValueChange={newValue => setSorting(newValue)}> 
                    <Select.Item label='Domyślnie' value='default'/>
                    <Select.Item label='Alfabetycznie A-Z' value='sortBy=alphabetical&sortOrder=desc'/>
                    <Select.Item label='Alfabetycznie Z-A' value='sortBy=alphabetical&sortOrder=asc'/>
                    <Select.Item label='Cena malejąco' value='sortBy=price&sortOrder=desc'/>
                    <Select.Item label='Cena rosnąco' value='sortBy=price&sortOrder=asc'/>
                </Select>
            {data?.map((item,index) => {
                return (
                    <HStack key={index}>
                        <Image resizeMode='cover' source={{uri: item.imageURL}} style={{width: 100, height: 150, borderRadius: 7}}/>
                    </HStack>
                    // <View key={index} style={{padding: 10, display: 'flex', flexDirection: 'row', height: 'auto'}}>
                    //     
                    //     <View style={{display: 'flex', flexDirection: 'column', paddingLeft: 20,paddingRight: 10, flexGrow: 1, flex: 1}}>
                    //         <Text style={{fontWeight: 600, marginBottom: 3, color: 'white', fontSize: 20, fontFamily: 'serif'}}>{item.title}</Text>
                    //         <View style={{display: 'flex', flexDirection: 'row', marginTop: 3, marginBottom: 3}}>
                    //         {item.authors?.map((item, index) => {
                    //             return (
                    //                 <Text style={{fontWeight: 300, color: 'white', fontWeight: 200}} key={index}>{item.name} {item.surname}</Text>
                    //             )
                    //         })}
                    //         </View>
                    //         <View style={{display: 'flex', flexDirection: 'row', marginTop: 'auto', justifyContent: 'space-between', alignItems: 'center'}}>
                    //             <View style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                    //                 <Text style={{fontWeight: 600, fontSize: 24, color: 'white'}}>{item.price.toFixed(2)}</Text>
                    //                 <Text style={{fontWeight: 600, fontSize: 14, color: 'white'}}> PLN</Text>
                    //             </View>
                    //             <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    //                 <Text style={{color: 'white', fontSize: 16, marginRight: 5}}>{item.score}</Text>
                    //                 <FontAwesome name='star' size={20} color='gold' />

                    //             </View>
                    //         </View>
                    //     </View>
                    // </View>
                )
            })}
            </Column>
        </ScrollView>
    );
}