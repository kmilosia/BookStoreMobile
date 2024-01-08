import React from 'react';
import { Column, Image, Pressable, Row, Text, View } from 'native-base';
import { COLORS, screenHeight, styles } from "../../styles/constants";
import { TextInput,ScrollView } from 'react-native';

export default function RegisterScreen({ navigation }) {
    return (
        <ScrollView>
            <View width='100%' bg={COLORS.primary} minHeight={screenHeight + 40}>
            <Column justifyContent='space-between' alignItems='center' height='100%' padding={10} width="100%">
                <Column alignItems='center' marginTop={5} width='100%'>
                    <Text fontSize={36} fontWeight='light' color='gray.200'>Załóż konto</Text>
                    <Image source={{uri: 'https://iili.io/J5hzila.png'}} width={100} height={100} alt="Magic Book Icon" marginY={5}/>
                    <TextInput style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Imię'/>
                    <TextInput style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Nazwisko'/>
                    <TextInput style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Numer telefonu'/>
                    <TextInput style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Email'/>
                    <TextInput style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Hasło'/>
                    <Pressable style={[styles.primaryButton, {width: '100%'}]}>
                        <Text style={styles.primaryButtonText}>Załóż konto</Text>
                    </Pressable>
                </Column>   
                <Row width='100%' justifyContent='center'>
                    <Text fontSize={16} fontWeight='light' color={COLORS.triary}>Posiadasz konto?</Text>
                    <Pressable onPress={() => navigation.navigate('Welcome')}>
                        <Text fontSize={16} color={COLORS.accent} fontWeight='medium' marginLeft={1}>Zaloguj się</Text>
                    </Pressable>
                </Row>        
            </Column>
            </View>
        </ScrollView>
    );
}
