import { Image, Linking, Pressable } from "react-native";
import { Column, Row, Text, View } from "native-base";
import { COLORS } from "../../styles/constants";
import { LinearGradient } from "expo-linear-gradient";
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PurchasedBookScreen({route,navigation}) {
    const item = route.params.item
    const handleDownloadBook = async () => {
        try{
            const userToken = await AsyncStorage.getItem('token')
            Linking.openURL(`http://192.168.1.15:3000/pobierz-ksiazke?token=${userToken}&id=${item.id}`)
        }catch(e){
            console.log(e);
        }
    }
    const handleReadBook = async () => {
        try{
            const userToken = await AsyncStorage.getItem('token')
            Linking.openURL(`http://192.168.1.15:3000/wyswietl-ksiazke?token=${userToken}&id=${item.id}`)
        }catch(e){
            console.log(e);
        }
    }
    return (
    <>
    <Row position='absolute' justifyContent='space-between' width='100%' top={12} paddingX={5} zIndex={100}>
        <Pressable onPress={() => navigation.goBack()}><IonIcons style={{fontSize: 24, color: 'white'}} name="arrow-back" /></Pressable>
    </Row>
    <View height='100%' position='relative' width='100%'>
        <Image style={{position: 'absolute', zIndex: 10,width: '100%',height: '100%' }} blurRadius={20} resizeMode="cover" source={{uri: item.imageURL}} alt="Book Cover" />
        <LinearGradient style={{position: 'absolute', zIndex: 20, width: '100%', height: '100%', resizeMode: 'cover' }} colors={['#ffffff00', '#181826']}/>
        <Column justifyContent='center' width='100%' alignItems='center' minHeight='100%' position='absolute' zIndex={30} padding={5} height='100%'>
            <Image height={400} width={280} style={{borderRadius: 8}} source={{uri: item.imageURL}} alt="Okładka książki" /> 
            <Text color='white' fontWeight={600} fontSize={30} lineHeight={32} textAlign='center' marginTop={6}>{item.bookTitle}</Text>  
            <Text color='white' fontSize={16} textAlign='center' fontWeight={600} marginY={2}>{item.fileFormatName}</Text>
            <Pressable onPress={() => handleDownloadBook()} style={{backgroundColor: COLORS.accent, borderRadius: 8, padding: 12, width: '90%',marginTop: 20}}>
                <Text textAlign='center' fontWeight={500} fontSize={16} color='white'>Pobierz książkę</Text>
            </Pressable>
            <Pressable onPress={() => handleReadBook()} style={{backgroundColor: COLORS.accent, borderRadius: 8, padding: 12, width: '90%',marginTop: 16}}>
                <Text textAlign='center' fontWeight={500} fontSize={16} color='white'>Czytaj książkę</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ReviewBook', {item: item})} style={{backgroundColor: COLORS.accent, borderRadius: 8, padding: 12, width: '90%',marginTop: 16}}>
                <Text textAlign='center' fontWeight={500} fontSize={16} color='white'>Oceń książkę</Text>
            </Pressable>
        </Column>
    </View>    
    </>    
    )
}
