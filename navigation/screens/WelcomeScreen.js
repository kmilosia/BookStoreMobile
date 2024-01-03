import React, { useEffect, useState } from 'react';
import { Column, Image, Pressable, Row, Text, View } from 'native-base';
import { COLORS, screenHeight, styles } from "../../styles/constants";
import { TextInput } from 'react-native';
import { loginUser } from '../../api/UserAPI';
import SubmitButton from '../../components/buttons/SubmitButton';

export default function WelcomeScreen({ navigation }) {
    const [errors, setErrors] = useState({})
    const [submitError, setSubmitError ] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loginData, setLoginData]= useState({
        email: '',
        password: '',
        audience: 'www'
    })
    const handleLogin = () => {
        setErrors(validate(loginData))
        setSubmitting(true)
    }
    const validate = (values) => {
        let errors = {}
        if (!values.email) {
          errors.email = "Wprowadź swój email"
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = "Nieprawidłowy format"
        }
        if (!values.password) {
            errors.password = "Hasło jest obowiązkowe";
        }
        return errors
    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && submitting){
            setLoading(true)
            console.log("Logging")
            loginUser(loginData, setLoading, setSubmitError)
        }
    },[errors])
    return (
        <View width='100%' bg={COLORS.primary} height={screenHeight + 40}>
            <Column justifyContent='space-between' alignItems='center' height='100%' padding={10} width="100%">
                <Column alignItems='center' marginTop={5} width='100%'>
                    <Text fontSize={36} fontWeight='light' color='gray.200'>Witaj w Spellarium</Text>
                    <Image source={{uri: 'https://iili.io/J5hzila.png'}} width={100} height={100} alt="Magic Book Icon" marginY={5}/>
                    <TextInput value={loginData.email} onChangeText={(text) => setLoginData({ ...loginData, email: text })} style={{marginVertical: 10,color: 'white',borderWidth: 2, borderColor: COLORS.triary, width: '100%', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}} placeholderTextColor={COLORS.triary} placeholder='Email'/>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}               
                    <TextInput value={loginData.password} secureTextEntry onChangeText={(text) => setLoginData({ ...loginData, password: text })} style={{marginVertical: 10,color: 'white',borderWidth: 2, borderColor: COLORS.triary, width: '100%', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}} placeholderTextColor={COLORS.triary} placeholder='Hasło'/>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    <SubmitButton text="Zaloguj się" loading={loading} handle={handleLogin} />
                    <Pressable marginTop={2} alignSelf='flex-start'>
                        <Text fontSize={16} color={COLORS.triary} fontWeight='light'>Zapomniałeś hasła?</Text>
                    </Pressable>
                    {submitError && <Text style={styles.errorText}>{submitError}</Text>}
                </Column>
                <Row width='100%'>
                    <Text fontSize={16} fontWeight='light' color={COLORS.triary}>Nie masz jeszcze konta?</Text>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text fontSize={16} color={COLORS.accent} fontWeight='medium' marginLeft={1}>Zarejestruj się</Text>
                    </Pressable>
                </Row>
            </Column>
        </View>
    );
}
