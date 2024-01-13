import { Column, Text } from "native-base";
import { Pressable, ScrollView, TextInput } from "react-native";
import { COLORS, styles } from "../../../styles/constants";
import { useEffect, useState } from "react";
import { getUserData } from "../../../api/UserAPI";
import PageLoader from "../../../components/loaders/PageLoader";

export default function UserDataScreen ({navigation}){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getUserData(setData,setLoading)
    },[])
    return(
        loading ? <PageLoader /> :
        <ScrollView>
            <Column width='100%' bg={COLORS.primary} padding={2}>
                <Column marginX={2} marginBottom={2}>
                    <Text color='white'>Imię:</Text>
                    <TextInput editable={false} value={data.name} style={[styles.inputStyle, {color: COLORS.light}]} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text color='white'>Nazwisko:</Text>
                    <TextInput editable={false} value={data.surname} style={[styles.inputStyle, {color: COLORS.light}]} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text color='white'>Nazwa użytkownika:</Text>
                    <TextInput editable={false} value={data.username} style={[styles.inputStyle, {color: COLORS.light}]} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text color='white'>Adres email:</Text>
                    <TextInput editable={false} value={data.email} style={[styles.inputStyle, {color: COLORS.light}]} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text color='white'>Numer telefonu:</Text>
                    <TextInput editable={false} value={data.phoneNumber} style={[styles.inputStyle, {color: COLORS.light}]} />
                </Column>
                <Pressable onPress={() => navigation.navigate('EditUserData')} style={{backgroundColor: COLORS.accent, borderRadius: 10, width: '50%', padding: 10, marginTop: 10, marginLeft: 10}}>
                    <Text color='white' textAlign='center' fontSize={16} fontWeight={500}>Edytuj profil</Text>
                </Pressable>
            </Column>
        </ScrollView>
    )
}