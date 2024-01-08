import React from 'react';
import { Pressable } from "react-native";
import { Row, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { screenWidth } from '../../styles/constants';

export default function DefaultHeader({title}) {
    const navigation = useNavigation();
    return (
        <Row width={screenWidth - 30} alignItems='center' justifyContent='space-between' >
            <Pressable onPress={() => navigation.goBack()}><Ionicons style={{fontSize: 24, color: 'white'}} name="arrow-back" /></Pressable>
            <Text fontSize={22} fontWeight='normal' color='white'>{title}</Text>
            <Pressable onPress={() => navigation.navigate('Search')}><Ionicons style={{fontSize: 22, color: 'white'}} name="search" /></Pressable>
        </Row>
    );
}


