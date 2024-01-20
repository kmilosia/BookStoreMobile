import React, { useEffect, useState } from 'react';
import { Column, Image, Pressable, Row, Text, View } from 'native-base';
import { COLORS, screenHeight, styles } from "../../styles/constants";
import { TextInput,ScrollView,ActivityIndicator } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { signUp } from '../../api/UserAPI';

export default function RegisterScreen({ navigation }) {
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [registered, setRegistered] = useState(false)
    const [conditions, setConditions] = useState(false)
    const [data, setData]= useState({
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        phoneNumber: '',
        isSubscribed: false,
    })
    const handleRegister = () => {
        setErrors(validate(data))
        setSubmitting(true)
    }
    const validate = (values) => {
        let errors = {}
        if (!values.email) {
          errors.email = "Email jest obowiązkowy!"
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = "Nieprawidłowy format email!"
        }
        if (!values.password) {
            errors.password = "Hasło jest obowiązkowe!";
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
        if(!conditions){
            errors.conditions = "Zaakceptuj warunki naszego sklepu!"
        }
        return errors
    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && submitting){
            setLoading(true)
            signUp(data,setLoading,setError,setRegistered)
        }
    },[errors])
    return (
        <ScrollView>
            <View width='100%' bg={COLORS.primary} minHeight={screenHeight + 40}>
            <Column justifyContent='center' alignItems='center' height='100%' padding={5} width="100%">
                {registered ?
                <Column alignItems='center' width='100%'>
                    <Text color='white' fontSize={26} fontWeight={500} marginBottom={2}>Potwierdź swój adres email</Text>
                    <Text marginBottom={2} textAlign='center' color='white' fontSize={14} fontWeight={300}>Wysłaliśmy Ci link do aktywacji na Twój adres email.</Text>
                    <Pressable onPress={() => Linking.openURL('https://gmail.com')} style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Przejdź do skrzynki</Text>
                    </Pressable>
                </Column>
                :
                <Column alignItems='center' marginTop={5} width='100%'>
                    <Text fontSize={36} fontWeight='light' color='gray.200'>Załóż konto</Text>
                    <Image source={{uri: 'https://iili.io/J5hzila.png'}} width={100} height={100} alt="Magic Book Icon" marginY={5}/>
                    <TextInput onChangeText={(text) => setData({ ...data, name: text })} value={data.name} style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Imię'/>
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}               
                    <TextInput onChangeText={(text) => setData({ ...data, surname: text })} value={data.surname} style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Nazwisko'/>
                    {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}               
                    <TextInput onChangeText={(text) => setData({ ...data, phoneNumber: text })} value={data.phoneNumber} style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Numer telefonu'/>
                    {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}               
                    <TextInput onChangeText={(text) => setData({ ...data, email: text })} value={data.email} style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Email'/>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}               
                    <TextInput onChangeText={(text) => setData({ ...data, username: text })} value={data.username} style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Nazwa użytkownika'/>
                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}               
                    <TextInput secureTextEntry onChangeText={(text) => setData({ ...data, password: text })} value={data.password} style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Hasło'/>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}               
                    <BouncyCheckbox alignSelf="flex-start" margin={5} size={20} fillColor={COLORS.accent} text='Zapisz się do Newslettera' textStyle={{fontSize: 14, color: COLORS.light, textDecorationLine: 'none'}}
                    onPress={(isChecked) => {setData({ ...data, isSubscribed: isChecked });}} innerIconStyle={{borderRadius: 4}} iconStyle={{borderRadius: 4}}
                    />  
                    <BouncyCheckbox alignSelf="flex-start" margin={5} size={20} fillColor={COLORS.accent} text='Akceptuję warunki korzystania ze sklepu' textStyle={{fontSize: 14, color: COLORS.light, textDecorationLine: 'none'}}
                    onPress={(isChecked) => {setConditions(isChecked)}} innerIconStyle={{borderRadius: 4}} iconStyle={{borderRadius: 4}}
                    />   
                    {errors.conditions && <Text style={styles.errorText}>{errors.conditions}</Text>}                                              
                    <Pressable onPress={handleRegister} style={[styles.primaryButton, {width: '100%', marginTop: 10}]}>
                        {loading ? <ActivityIndicator size='small' color='white' /> :
                        <Text style={styles.primaryButtonText}>Zarejestruj się</Text>}
                    </Pressable>
                    {error && <Text style={styles.errorText}>{error}</Text>}               
                </Column>  }        
            </Column>
            </View>
            <IonIcons onPress={() => navigation.navigate('Welcome')} style={{position: 'absolute', top: 60, left: 20}} name="arrow-back" size={30} color='white' />
        </ScrollView>
    );
}
