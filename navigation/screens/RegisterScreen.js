import React from 'react';
import { Column, Image, Pressable, Row, Text, View } from 'native-base';
import { COLORS, screenHeight, styles } from "../../styles/constants";
import { TextInput } from 'react-native';

export default function RegisterScreen({ navigation }) {
    return (
        <View width='100%' bg={COLORS.primary} height={screenHeight + 40}>
            <Column justifyContent='space-between' alignItems='center' height='100%' padding={10} width="100%">
                <Column alignItems='center' marginTop={5} width='100%'>
                    <Text fontSize={36} fontWeight='light' color='gray.200'>Załóż konto</Text>
                    <Image source={{uri: 'https://iili.io/J5hzila.png'}} width={100} height={100} alt="Magic Book Icon" marginY={5}/>
                    <TextInput style={{marginVertical: 10,color: 'white',borderWidth: 2, borderColor: COLORS.triary, width: '100%', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}} placeholderTextColor={COLORS.triary} placeholder='Email'/>
                    <TextInput style={{marginVertical: 10,color: 'white',borderWidth: 2, borderColor: COLORS.triary, width: '100%', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}} placeholderTextColor={COLORS.triary} placeholder='Hasło'/>
                    <Pressable style={[styles.primaryButton, {width: '100%'}]}>
                        <Text style={styles.primaryButtonText}>Zaloguj się</Text>
                    </Pressable>
                    <Pressable marginTop={2} alignSelf='flex-start'>
                        <Text fontSize={16} color={COLORS.triary} fontWeight='light'>Zapomniałeś hasła?</Text>
                    </Pressable>
                </Column>
                <Row width='100%'>
                    <Text fontSize={16} fontWeight='light' color={COLORS.triary}>Nie masz jeszcze konta?</Text>
                    <Pressable>
                        <Text fontSize={16} color={COLORS.accent} fontWeight='medium' marginLeft={1}>Zarejestruj się</Text>
                    </Pressable>
                </Row>
            </Column>
        </View>
    );
}
