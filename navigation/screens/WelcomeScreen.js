import React, { useEffect, useState } from 'react';
import { Column, Image, Pressable, Row, Text, View } from 'native-base';
import { COLORS, screenHeight, styles } from "../../styles/constants";
import { ScrollView, TextInput } from 'react-native';
import SubmitButton from '../../components/buttons/SubmitButton';
import { useAuthStore } from '../../store/userStore';

export default function WelcomeScreen({ navigation }) {
    const signIn = useAuthStore((state) => state.signIn)
    const error = useAuthStore((state) => state.error)
    const loading = useAuthStore((state) => state.loading)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
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
            signIn(loginData)
        }
    },[errors])
    return (
        <ScrollView>
        <View width='100%' bg={COLORS.primary} height={screenHeight + 40}>
            <Column justifyContent='center' alignItems='center' height='100%' padding={5} width="100%">
                <Column alignItems='center' marginTop={5} width='100%'>
                    <Text fontSize={36} fontWeight='light' color='gray.200'>Witaj w Spellarium</Text>
                    <Image source={{uri: 'https://iili.io/J5hzila.png'}} width={100} height={100} alt="Magic Book Icon" marginY={5}/>
                    <TextInput value={loginData.email} onChangeText={(text) => setLoginData({ ...loginData, email: text })} style={{marginVertical: 10,color: 'white',borderWidth: 2, borderColor: COLORS.triary, width: '100%', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}} placeholderTextColor={COLORS.triary} placeholder='Email'/>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}               
                    <TextInput value={loginData.password} secureTextEntry onChangeText={(text) => setLoginData({ ...loginData, password: text })} style={{marginVertical: 10,color: 'white',borderWidth: 2, borderColor: COLORS.triary, width: '100%', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}} placeholderTextColor={COLORS.triary} placeholder='Hasło'/>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    <SubmitButton text="Zaloguj się" loading={loading} handle={handleLogin} />
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    <Pressable onPress={() => {navigation.navigate('RecoverPassword')}} marginTop={2}>
                        <Text color={COLORS.triary}>Zapomniałeś hasła?</Text>
                    </Pressable>
                </Column>
                <Row width='100%' justifyContent='center' position='absolute' bottom={5}>
                    <Text fontWeight='light' color={COLORS.triary}>Nie masz jeszcze konta?</Text>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text color={COLORS.accent} fontWeight='medium' marginLeft={1}>Zarejestruj się</Text>
                    </Pressable>
                </Row>
            </Column>
        </View>
        </ScrollView>
    );
}
