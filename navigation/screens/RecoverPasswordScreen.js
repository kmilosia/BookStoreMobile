import { Box, Column, Row, Text, View } from "native-base";
import { ActivityIndicator, Linking, ScrollView, TextInput } from "react-native";
import { COLORS, screenHeight, styles } from "../../styles/constants";
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import { recoverPassword } from "../../api/UserAPI";
import { Pressable } from "react-native";

export default function RecoverPasswordScreen ({navigation}) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [repeatSend, setRepeatSend] = useState(false)
    const [error, setError] = useState('')
    const submitEmail = () => {
        setLoading(true)
        if (email !== '' && /\S+@\S+\.\S+/.test(email)) {
        recoverPassword({email: email},setLoading, setError,setEmailSent)
        }else{
            setError("Email jest nieprawidłowy!")
            setLoading(false)
        }
    }
    return(
        <ScrollView>
            <View justifyContent='center' alignItems='center' width='100%' bg={COLORS.primary} height={screenHeight + 40} padding={10}>
                <Column width='100%' alignItems='center'>
                    <Box rounded='full' bg={COLORS.accent} padding={3} margin={5}>
                        <IonIcons name='key' color='white' size={30} />
                    </Box>
                    <Text color='white' fontSize={26} fontWeight={500} marginBottom={2}>Resetuj hasło</Text>
                    {emailSent ?
                    <>
                    <Text marginBottom={2} textAlign='center' color='white' fontSize={14} fontWeight={300}>Link resetujący hasło został wysłany na podany adres email.</Text>
                    <Pressable onPress={() => Linking.openURL('https://gmail.com')} style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Przejdź do skrzynki</Text>
                    </Pressable>
                    <Row marginTop={2} alignItems='center'>
                        <Text color={COLORS.light} fontWeight={200} marginRight={1}>Nie dostałeś kodu?</Text>
                        {repeatSend ?
                            <Text fontSize={12} style={{color: COLORS.accent}}>Kod został ponownie wysłany</Text>
                        :
                        <Pressable onPress={() => {submitEmail(); setRepeatSend(true)}}>
                            <Text style={{color: COLORS.accent}}>Wyślij ponownie</Text>
                        </Pressable>
                        }
                    </Row>
                    
                    </>
                    :
                    <>
                    <Text textAlign='center' color='white' fontSize={14} fontWeight={300}>Wprowadź swój email aby resetować hasło do Twojego konta.</Text>
                    <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{marginVertical: 10,color: 'white',borderWidth: 2, borderColor: COLORS.triary, width: '100%', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}} placeholderTextColor={COLORS.triary} placeholder='Email'/>
                    {error && <Text style={styles.errorText}>{error}</Text>}     
                    <Pressable onPress={submitEmail} style={styles.primaryButton}>
                        {loading ? <ActivityIndicator size='small' color='white' /> :
                        <Text style={styles.primaryButtonText}>Dalej</Text>}
                    </Pressable>
                    </>
                    }
                </Column>
            </View>
            <IonIcons onPress={() => navigation.navigate('Welcome')} style={{position: 'absolute', top: 60, left: 20}} name="arrow-back" size={30} color='white' />
        </ScrollView>
    )
}