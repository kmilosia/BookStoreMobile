import { useState } from "react"
import PageLoader from "./loaders/PageLoader"
import { Image, ScrollView } from "react-native"
import { Column, Text, View } from "native-base"
import { COLORS } from "../styles/constants"

export default function PurchasedBooksList () {
    const [loading, setLoading] = useState(true)
    const [rentedBooks, setRentedBooks] = useState([])

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
            <Image source={{uri: 'https://iili.io/JuANTBe.png'}} width={200} height={200} alt='Pusta lista życzeń' />
            <Text textAlign='center' marginTop={5} color='white' fontSize={28} lineHeight={30} fontWeight={500}>Nie masz żadnych kupionych książek</Text>
            <Text textAlign='center' marginTop={2} color='white' fontSize={16} fontWeight={300}>Przeglądaj nasze książki i kupuj swoje ulubione tytuły.</Text>
        </Column>
        </View>
        }
        </>
    )
}