import React from 'react';
import { Image, Pressable } from "react-native";
import { Row, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { screenWidth } from '../../styles/constants';

export default function HomeHeader() {
    const navigation = useNavigation();
    return (
        <Row width={screenWidth - 30} alignItems='center' justifyContent='space-between'>
            {/* <Text fontSize={22} fontWeight='normal' color='white'>Spellarium</Text> */}
            <Image source={{uri: 'https://iili.io/J7mafWX.png'}} width={100} height={20}/>
            <Pressable onPress={() => navigation.navigate('Search')}><Ionicons style={{fontSize: 22, color: 'white'}} name="search" /></Pressable>
        </Row>
    );
}