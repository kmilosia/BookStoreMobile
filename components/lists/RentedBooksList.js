import { useEffect, useState } from "react"
import { Image, Pressable, ScrollView } from "react-native"
import { Column, Row, Text, View } from "native-base"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import PageLoader from "../loaders/PageLoader"
import { COLORS } from "../../styles/constants"
import { getLibraryItems } from "../../api/LibraryAPI"

export default function RentedBooksList () {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const [activeBooks, setActiveBooks] = useState([])
    useEffect(() => {
        getLibraryItems(1,setActiveBooks, setLoading)
    },[])
    return (
        loading ? 
        <PageLoader />
        :
        <>
        {activeBooks?.length > 0 ?
            <ScrollView horizontal>
                {activeBooks.map((item,index) => {
                    return (
                        <Pressable key={index} onPress={() => navigation.navigate('RentedBook', {item: item})}>
                        <View width={320} marginRight={5} height={520} position='relative' style={{borderRadius: 8}}>
                            <Image style={{position: 'absolute', zIndex: 10, borderRadius: 8 }} width={320} height={520} source={{uri: item.imageURL}} alt="Okładka książki"/>
                            <LinearGradient style={{position: 'absolute', zIndex: 20, width: 320, height: 520, borderRadius: 8 }} colors={['#ffffff00', '#000']}/>
                            <Row zIndex={30} justifyContent='flex-start' alignItems='flex-end' width={320} height={520} padding={4}>
                                <Text color='white' fontSize={14} fontWeight={500} >{item.bookTitle}</Text>
                            </Row>
                        </View>
                        </Pressable>
                    )
                })}
            </ScrollView>
        :
        <View>
        <Column padding={5} width='100%' height='90%' bg={COLORS.primary} alignItems='center' justifyContent='center'>
            <Image source={{uri: 'https://iili.io/JuANuEu.png'}} width={200} height={200} alt='Pusta lista' />
            <Text textAlign='center' marginTop={5} color='white' fontSize={28} lineHeight={30} fontWeight={500}>Nie masz żadnych wypożyczonych książek</Text>
            <Text textAlign='center' marginTop={2} color='white' fontSize={16} fontWeight={300}>Przeglądaj nasze książki i wypożyczaj swoje ulubione tytuły.</Text>
        </Column>
        </View>
        }
        </>
    )
}