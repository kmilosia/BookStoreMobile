import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import {Column,Text} from 'native-base'
import { COLORS } from '../../styles/constants';
import IonIcons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useAuthStore } from '../../store/userStore';

export default function ProfileScreen({ navigation }) {
    const signOut = useAuthStore((state) => state.signOut)
    const style = StyleSheet.create({
        optionContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingVertical: 20,
            borderRadius: 8,
            marginBottom: 20,
            backgroundColor: COLORS.secondary
        },
    })
    return (
            <Column width="100%" alignItems='center' padding={3}>
                <Column width='100%'>
                    <Pressable onPress={() => navigation.navigate("UserData")} style={style.optionContainer}>
                        <IonIcons name='person-outline' color='white' size={20}/>
                        <Text marginLeft={5} color='white' fontSize={18}>Dane użytkownika</Text>
                    </Pressable>               
                    <Pressable onPress={() => navigation.navigate('UserAddress')} style={style.optionContainer}>
                        <IonIcons name='home-outline' color='white' size={20}/>
                        <Text marginLeft={5} color='white' fontSize={18}>Adres użytkownika</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('UserOrders')} style={style.optionContainer}>
                        <IonIcons name='cube-outline' color='white' size={20}/>
                        <Text marginLeft={5} color='white' fontSize={18}>Zamówienia</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('UserRentals')} style={style.optionContainer}>
                        <AntDesign name='key' color='white' size={20}/>
                        <Text marginLeft={5} color='white' fontSize={18}>Wypożyczenia</Text>
                    </Pressable>
                    <Pressable onPress={() => {signOut()}} style={style.optionContainer}>
                        <AntDesign name='logout' color={COLORS.red} size={20}/>
                        <Text marginLeft={5} color={COLORS.red} fontSize={18}>Wyloguj się</Text>
                    </Pressable>
                </Column>
            </Column>
    );
}
