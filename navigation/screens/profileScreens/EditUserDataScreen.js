import { Column, Row, Text } from "native-base";
import { ActivityIndicator, Pressable, ScrollView, TextInput } from "react-native";
import { COLORS, styles } from "../../../styles/constants";
import { useEffect, useState } from "react";
import { editUserData, getUserData } from "../../../api/UserAPI";
import PageLoader from "../../../components/loaders/PageLoader";
import { useMessageStore } from "../../../store/messageStore";

export default function EditUserDataScreen ({navigation}){
    const setMessage = useMessageStore((state) => state.setMessage)
    const [data, setData] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [errors, setErrors] = useState({})
    useEffect(() => {
        getUserData(setData,setLoading)
    },[])
    const validate = (values) => {
        let errors = {}
        if (!values.email) {
          errors.email = "Email jest obowiązkowy!"
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = "Nieprawidłowy format email!"
        }
        if (!values.username) {
            errors.username = "Nazwa użytkownika jest obowiązkowa!";
        }
        if (!values.name) {
            errors.name = "Imię jest obowiązkowe!";
        }
        if (!values.surname) {
            errors.surname = "Nazwisko jest obowiązkowe!";
        }
        if (!values.phoneNumber) {
            errors.phoneNumber = "Numer telefonu jest obowiązkowy!";
        }
        return errors
    }
    const handleSubmit = () => {
        setErrors(validate(data))
        setSubmitting(true)
    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && submitting){
            const userDetails = {
                name: data.name, 
                surname: data.surname,
                email: data.email,
                username: data.username,
                phoneNumber: data.phoneNumber
            }
            setSubmitLoading(true)
            editUserData(userDetails, setSubmitLoading, setSuccess)
        }
    },[errors])
    useEffect(() => {
        if(success){
            setMessage({value: "Dane zostały zmienione", type: 'success', bool: true})
            navigation.navigate('Profile')
        }else if(success === false){
            setMessage({value: "Błąd podczas zmiany danych", type: 'error', bool: true})
        }
    },[success])
    return(
        loading ? <PageLoader /> :
        <ScrollView>
            <Column width='100%' bg={COLORS.primary} padding={2}>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Imię:</Text>
                    <TextInput onChangeText={(newText) => setData({...data, name: newText})} value={data.name} style={styles.inputStyle} />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Nazwisko:</Text>
                    <TextInput onChangeText={(newText) => setData({...data, surname: newText})} value={data.surname} style={styles.inputStyle} />
                    {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Nazwa użytkownika:</Text>
                    <TextInput onChangeText={(newText) => setData({...data, username: newText})} value={data.username} style={styles.inputStyle} />
                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Adres email:</Text>
                    <TextInput onChangeText={(newText) => setData({...data, email: newText})} value={data.email} style={styles.inputStyle} />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Numer telefonu:</Text>
                    <TextInput onChangeText={(newText) => setData({...data, phoneNumber: newText})} value={data.phoneNumber} style={styles.inputStyle} />
                    {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                </Column>
                <Row justifyContent='space-between' paddingX={3}>
                    <Pressable onPress={handleSubmit} style={{borderWidth:2, borderColor: COLORS.accent, backgroundColor: COLORS.accent, borderRadius: 10, width: '49%', padding: 10, marginTop: 15}}>
                        {submitLoading ? <ActivityIndicator size='small' color='white' /> :
                        <Text color='white' textAlign='center' fontSize={16} fontWeight={500}>Zapisz zmiany</Text>}
                    </Pressable>
                    <Pressable onPress={() => navigation.goBack()} style={{borderWidth: 2, borderColor: COLORS.red, borderRadius: 10, width: '49%', padding: 10, marginTop: 15}}>
                        <Text color={COLORS.red} textAlign='center' fontSize={16} fontWeight={500}>Anuluj</Text>
                    </Pressable>
                </Row>
            </Column>
        </ScrollView>
    )
}