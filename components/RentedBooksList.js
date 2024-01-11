import { useEffect, useState } from "react"
import PageLoader from "./loaders/PageLoader"
import { Image, ScrollView } from "react-native"
import { Column, Text, View } from "native-base"
import { COLORS } from "../styles/constants"
import { getRentedBooks } from "../api/RentalAPI"

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
        <ScrollView horizontal>

        </ScrollView>
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