import { useEffect, useState } from "react"
import PageLoader from "./loaders/PageLoader"
import { Image, Pressable, ScrollView } from "react-native"
import { Column, Row, Text, View } from "native-base"
import { COLORS, styles } from "../styles/constants"
import { getUserRentedBooks } from "../api/RentalAPI"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"

export default function RentedBooksList () {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const [activeBooks, setActiveBooks] = useState([])
    const [inactiveBooks, setInactiveBooks] = useState([])
    useEffect(() => {
        getUserRentedBooks('rentalStatusId=1',setActiveBooks, setLoading)
        getUserRentedBooks('rentalStatusId=2',setInactiveBooks, setLoading)
    },[])
    return (
        loading ? 
        <PageLoader />
        :
        <>
        {activeBooks.length > 0 || inactiveBooks.length > 0 ?
        <ScrollView>
            {activeBooks.length > 0 &&
            <>
            <Text color={COLORS.light} fontWeight={600} fontSize={22} marginY={4} marginLeft={2}>Wypożyczone książki</Text>
            <ScrollView horizontal>
                {activeBooks.map((item,index) => {
                    return (
                        <Pressable key={index} onPress={() => navigation.navigate('RentedBook', {item: item})}>
                        <View width={300} marginRight={5} height={420} position='relative' style={{borderRadius: 8}}>
                            <Image style={{position: 'absolute', zIndex: 10, borderRadius: 8 }} width={300} height={420} source={{uri: item.imageURL}} alt="Okładka książki"/>
                            <LinearGradient style={{position: 'absolute', zIndex: 20, width: 300, height: 420, borderRadius: 8 }} colors={['#ffffff00', '#000']}/>
                            <Row zIndex={30} justifyContent='flex-start' alignItems='flex-end' width={300} height={420} padding={4}>
                                <Text color='white' fontSize={14} fontWeight={500} >{item.bookTitle}</Text>
                            </Row>
                        </View>
                        </Pressable>
                    )
                })}
            </ScrollView>
            </>}
            {inactiveBooks.length > 0 &&
            <>
            <Text color={COLORS.light} fontWeight={600} fontSize={22} marginY={4} marginLeft={2}>Wypożycz ponownie</Text>
            <ScrollView horizontal>
                {inactiveBooks.map((item,index) => {
                    return (
                        <Pressable key={index} onPress={() => navigation.navigate('Rent', {bookID: item.bookItemId})}>
                        <View width={300} marginRight={5} height={420} position='relative' style={{borderRadius: 8}}>
                            <Image style={{position: 'absolute', zIndex: 10, borderRadius: 8 }} width={300} height={420} source={{uri: item.imageURL}} alt="Okładka książki"/>
                            <LinearGradient style={{position: 'absolute', zIndex: 20, width: 300, height: 420, borderRadius: 8 }} colors={['#ffffff00', '#000']}/>
                            <Row zIndex={30} justifyContent='flex-start' alignItems='flex-end' width={300} height={420} padding={4}>
                                <Text color='white' fontSize={14} fontWeight={500} >{item.bookTitle}</Text>
                            </Row>
                        </View>
                        </Pressable>
                    )
                })}
            </ScrollView>
            </>}
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