import React, {useState, useEffect} from 'react';
import { Pressable, StyleSheet } from 'react-native';
import {Column,Text} from 'native-base'
import { AuthContext } from '../MainContainer';
import { COLORS } from '../../styles/constants';
import PageLoader from '../../components/loaders/PageLoader';
import { getUserData } from '../../api/UserAPI';
import IonIcons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function ProfileScreen({ navigation }) {
    const {signOut} = React.useContext(AuthContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
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
    useEffect(() => {
        getUserData(setData,setLoading)
    },[])
    return (
        loading ? <PageLoader /> :
            <Column width="100%" alignItems='center' padding={3}>
                <Column width='100%'>
                    <Pressable onPress={() => navigation.navigate("UserData")} style={style.optionContainer}>
                        <IonIcons name='person-outline' color='white' size={20}/>
                        <Text marginLeft={5} color='white' fontSize={18}>Dane użytkownika</Text>
                    </Pressable>
                    <Pressable style={style.optionContainer}>
                        <IonIcons name='lock-closed-outline' color='white' size={20}/>
                        <Text marginLeft={5} color='white' fontSize={18}>Konto</Text>
                    </Pressable>
                    <Pressable style={style.optionContainer}>
                        <IonIcons name='home-outline' color='white' size={20}/>
                        <Text marginLeft={5} color='white' fontSize={18}>Adres dostawy</Text>
                    </Pressable>
                    <Pressable style={style.optionContainer}>
                        <IonIcons name='cube-outline' color='white' size={20}/>
                        <Text marginLeft={5} color='white' fontSize={18}>Zamówienia</Text>
                    </Pressable>
                    <Pressable style={style.optionContainer}>
                        <AntDesign name='key' color='white' size={20}/>
                        <Text marginLeft={5} color='white' fontSize={18}>Wypożyczenia</Text>
                    </Pressable>
                    <Pressable onPress={() => {signOut()}} style={style.optionContainer}>
                        <AntDesign name='logout' color='white' size={20}/>
                        <Text marginLeft={5} color='white' fontSize={18}>Wyloguj się</Text>
                    </Pressable>
                </Column>
            </Column>
    );
}
