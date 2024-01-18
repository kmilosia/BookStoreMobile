import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView } from "react-native";
import { getUserAddress } from "../../../api/UserAPI";
import PageLoader from "../../../components/loaders/PageLoader";
import { Center, Column, Text, View } from "native-base";
import { COLORS } from "../../../styles/constants";

export default function UserAddressScreen ({navigation}) {
    const [userAddress, setUserAddress] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getUserAddress(setUserAddress, setLoading)
    },[])
    return(
        loading ? <PageLoader /> :
        <>
                {userAddress.length > 0 ?
                <Column>
                </Column>
                :
                <View height='100%'>
                    <Center height='100%' padding={5}>
                    <Image source={{uri: 'https://iili.io/JT0PtrN.png'}} width={200} height={200}/>
                    <Text textAlign='center' marginTop={5} color='white' fontSize={28} lineHeight={30} fontWeight={500}>Nie dodano żadnego adresu</Text>
                    <Text textAlign='center' marginTop={2} color='white' fontSize={16} fontWeight={300}>Dodaj nowy adres dostawy lub adres faktury.</Text>
                    </Center>
                    <View position='absolute' bottom={8} left={0} width='100%' display='flex' alignItems='center'>
                        <Pressable onPress={()=> navigation.navigate('AddUserAddress')} style={{backgroundColor: COLORS.accent, width: '90%', padding: 10, borderRadius: 30}}>
                            <Text color='white' fontWeight={500} fontSize={16} textAlign='center'>Dodaj nowy adres</Text>
                        </Pressable>
                    </View>
                </View>
                }
        </>
    )
}