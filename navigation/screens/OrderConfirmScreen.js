import { Center,Text,Row } from "native-base";
import { Image } from "react-native";
import { COLORS } from "../../styles/constants";
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export default function OrderConfirmScreen(){
    const navigation = useNavigation()
    return(
        <>
        <Row position='absolute' justifyContent='flex-end' width='100%' top={12} paddingX={5} zIndex={100}>
            <Pressable onPress={() => navigation.navigate('Main')}><IonIcons style={{fontSize: 24, color: 'white'}} name="close-outline" /></Pressable>
        </Row>
        <Center width='100%' height='100%' paddingX={10}>
            <Image source={{uri: 'https://iili.io/JajR9AG.png'}} width={200} height={200} alt="Celebration"/> 
            <Text color='white' fontWeight={600} fontSize={30} textAlign='center' marginTop={4}>Zamówienie zostało złożone</Text>
            <Text color={COLORS.light} fontWeight={300} fontSize={16} marginY={2} textAlign='center'>Otrzymasz potwierdzenie zamówienia oraz dalsze informacje na Twój adres email</Text>
        </Center>
        </>
    )
}