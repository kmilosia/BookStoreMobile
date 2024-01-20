import { Column, Row, Text } from "native-base";
import { ActivityIndicator, Pressable, ScrollView, TextInput } from "react-native";
import { COLORS, styles } from "../../../styles/constants";
import { useEffect, useState } from "react";
import { changePassword } from "../../../api/UserAPI";
import { useMessageStore } from "../../../store/messageStore";

export default function PasswordScreen ({navigation}){
    const setMessage = useMessageStore((state) => state.setMessage)
    const [submitting, setSubmitting] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [errors, setErrors] = useState({})
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    })
   
    const validate = (values) => {
        let errors = {}
        if (!values.oldPassword) {
          errors.oldPassword = "Wprowadź obecne hasło!"
        }
        if (!values.newPassword) {
          errors.newPassword = "Wprowadź hasło!"
        }else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}/.test(values.newPassword)) {
          errors.newPassword = "Nieprawidłowy format - hasło powinno się składać z minimum 6 znaków, minimum jednego znaku specjalnego oraz jednej wielkiej litery.";
        } 
        if (!values.repeatNewPassword) {
            errors.repeatNewPassword = "Powtórz hasło!"
        }
        if(values.newPassword !== values.repeatNewPassword){
            errors.submit = "Hasła nie mogą się od siebie różnić!"
        }
        return errors
      }
    const handleSubmit = () => {
        setErrors(validate(data))
        setSubmitting(true)
    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && submitting){
            setSubmitLoading(true)
            changePassword(data, setSubmitLoading,setSuccess)
        }
    },[errors])
    useEffect(() => {
        if(success){
            setMessage({value: "Hasło zostało zmienione", type: 'success', bool: true})
            navigation.navigate('Profile')
        }else if(success === false){
            setMessage({value: "Błąd podczas zmiany hasła", type: 'error', bool: true})
        }else{}
    },[success])
    return(
        <ScrollView>
            <Column width='100%' bg={COLORS.primary} padding={2}>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Stare hasło:</Text>
                    <TextInput secureTextEntry onChangeText={(newText) => setData({...data, oldPassword: newText})} value={data.oldPassword} style={styles.inputStyle} />
                    {errors.oldPassword && <Text style={styles.errorText}>{errors.oldPassword}</Text>}
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Nowe hasło:</Text>
                    <TextInput secureTextEntry onChangeText={(newText) => setData({...data, newPassword: newText})} value={data.newPassword} style={styles.inputStyle} />
                    {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text style={styles.inputLabel}>Powtórz nowe hasło:</Text>
                    <TextInput secureTextEntry onChangeText={(newText) => setData({...data, repeatNewPassword: newText})} value={data.repeatNewPassword} style={styles.inputStyle} />
                    {errors.repeatNewPassword && <Text style={styles.errorText}>{errors.repeatNewPassword}</Text>}
                </Column>
                {errors.submit && <Text style={styles.errorText}>{errors.submit}</Text>}
                <Row justifyContent='space-between' paddingX={3}>
                    <Pressable onPress={handleSubmit} style={{borderWidth:2, borderColor: COLORS.accent, backgroundColor: COLORS.accent, borderRadius: 10, width: '49%', padding: 10, marginTop: 15}}>
                        {submitLoading ? <ActivityIndicator size='small' color='white' /> :
                        <Text color='white' textAlign='center' fontSize={16} fontWeight={500}>Zmień hasło</Text>}
                    </Pressable>
                    <Pressable onPress={() => navigation.goBack()} style={{borderWidth: 2, borderColor: COLORS.red, borderRadius: 10, width: '49%', padding: 10, marginTop: 15}}>
                        <Text color={COLORS.red} textAlign='center' fontSize={16} fontWeight={500}>Anuluj</Text>
                    </Pressable>
                </Row>
            </Column>
        </ScrollView>
    )
}