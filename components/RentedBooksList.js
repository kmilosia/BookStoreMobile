import { useEffect, useState } from "react"
import PageLoader from "./loaders/PageLoader"
import { Image, ScrollView } from "react-native"
import { Column, Row, Text, View } from "native-base"
import { COLORS } from "../styles/constants"
import { getRentedBooks } from "../api/RentalAPI"
import { LinearGradient } from "expo-linear-gradient"

export default function RentedBooksList () {
    const [loading, setLoading] = useState(false)
    const [rentedBooks, setRentedBooks] = useState([])
    useEffect(() => {
        getRentedBooks(setRentedBooks, setLoading)
    },[])
    return (
        loading ? 
        <PageLoader />
        :
        <>
        {rentedBooks.length > 0 ?
        <View>
            <Text color={COLORS.light} fontWeight={600} fontSize={18} marginTop={4} marginBottom={2} marginLeft={2}>Wypożyczone książki</Text>
            <ScrollView horizontal>
                {rentedBooks.map((item,index) => {
                    return (
                        <View key={index} width={150} marginRight={5} height={220} position='relative' style={{borderRadius: 8}}>
                            <Image style={{position: 'absolute', zIndex: 10, borderRadius: 8 }} width={150} height={220} source={{uri: item.imageURL}} alt="Okładka książki"/>
                            <LinearGradient style={{position: 'absolute', zIndex: 20, width: 150, height: 220, borderRadius: 8 }} colors={['#ffffff00', '#000']}/>
                            <Row zIndex={30} justifyContent='flex-start' alignItems='flex-end' width={150} height={220} padding={4}>
                                <Text color='white' fontSize={14} fontWeight={500} >{item.bookTitle}</Text>
                            </Row>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
        
        :
        <View>
        <Column padding={5} width='100%' height='90%' bg={COLORS.primary} alignItems='center' justifyContent='center'>
            <Image source={{uri: 'https://iili.io/JuANuEu.png'}} width={200} height={200} alt='Pusta lista życzeń' />
            <Text textAlign='center' marginTop={5} color='white' fontSize={28} lineHeight={30} fontWeight={500}>Nie masz żadnych wypożyczonych książek</Text>
            <Text textAlign='center' marginTop={2} color='white' fontSize={16} fontWeight={300}>Przeglądaj nasze książki i wypożyczaj swoje ulubione tytuły.</Text>
        </Column>
        </View>
        }
        </>
    )
}