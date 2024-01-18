import { Image, Pressable } from "react-native";
import { Column, Text, View } from "native-base";
import { COLORS } from "../../styles/constants";
import { LinearGradient } from "expo-linear-gradient";
import { convertDateUser } from "../../utils/dateConverter";

export default function RentedBookScreen({route,navigation}) {
    const item = route.params.item
    return (
    <View height='100%' position='relative' width='100%'>
        <Image style={{position: 'absolute', zIndex: 10,width: '100%',height: '100%' }} blurRadius={20} resizeMode="cover" source={{uri: item.imageURL}} alt="Book Cover" />
        <LinearGradient style={{position: 'absolute', zIndex: 20, width: '100%', height: '100%', resizeMode: 'cover' }} colors={['#ffffff00', '#181826']}/>
        <Column justifyContent='center' width='100%' alignItems='center' minHeight='100%' position='absolute' zIndex={30} padding={5}>
            <Image height={400} width={280} style={{borderRadius: 8}} source={{uri: item.imageURL}} alt="Okładka książki" /> 
            <Text color='white' fontWeight={600} fontSize={30} lineHeight={32} textAlign='center' marginTop={5}>{item.bookTitle}</Text>  
            <Text color='white' fontSize={16} textAlign='center' fontWeight={600}>{item.fileFormatName}</Text>
            <Text color='white' textAlign='center' fontWeight={300}>Data ważności: {item.expirationDate && convertDateUser(item.expirationDate)}</Text>
            <Pressable style={{backgroundColor: COLORS.accent, borderRadius: 8, padding: 12, width: '90%',marginTop: 20}}>
                <Text textAlign='center' fontWeight={500} fontSize={16} color='white'>Czytaj książkę</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ReviewBook', {item: item})} style={{backgroundColor: COLORS.accent, borderRadius: 8, padding: 12, width: '90%',marginTop: 12}}>
                <Text textAlign='center' fontWeight={500} fontSize={16} color='white'>Oceń książkę</Text>
            </Pressable>
        </Column>
    </View>        
    )
}
