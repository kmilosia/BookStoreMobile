import { Column, Row, Text } from "native-base";
import { Pressable, ScrollView, TextInput } from "react-native";
import { COLORS, styles } from "../../../styles/constants";
import { useEffect, useState } from "react";
import { getUserData } from "../../../api/UserAPI";
import PageLoader from "../../../components/loaders/PageLoader";

export default function EditUserDataScreen ({navigation}){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})
    useEffect(() => {
        getUserData(setData,setLoading)
    },[])
    return(
        loading ? <PageLoader /> :
        <ScrollView>
            <Column width='100%' bg={COLORS.primary} padding={2}>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Imię:</Text>
                    <TextInput onChangeText={(newText) => setData({...data, name: newText})} value={data.name} style={styles.inputStyle} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Nazwisko:</Text>
                    <TextInput onChangeText={(newText) => setData({...data, surname: newText})} value={data.surname} style={styles.inputStyle} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Nazwa użytkownika:</Text>
                    <TextInput onChangeText={(newText) => setData({...data, username: newText})} value={data.username} style={styles.inputStyle} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Adres email:</Text>
                    <TextInput onChangeText={(newText) => setData({...data, email: newText})} value={data.email} style={styles.inputStyle} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Numer telefonu:</Text>
                    <TextInput onChangeText={(newText) => setData({...data, phoneNumber: newText})} value={data.phoneNumber} style={styles.inputStyle} />
                </Column>
                <Row justifyContent='space-between' paddingX={3}>
                    <Pressable style={{borderWidth:2, borderColor: COLORS.accent, backgroundColor: COLORS.accent, borderRadius: 10, width: '49%', padding: 10, marginTop: 15}}>
                        <Text color='white' textAlign='center' fontSize={16} fontWeight={500}>Zapisz zmiany</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.goBack()} style={{borderWidth: 2, borderColor: COLORS.red, borderRadius: 10, width: '49%', padding: 10, marginTop: 15}}>
                        <Text color={COLORS.red} textAlign='center' fontSize={16} fontWeight={500}>Anuluj</Text>
                    </Pressable>
                </Row>
                
            </Column>
        </ScrollView>
    )
}