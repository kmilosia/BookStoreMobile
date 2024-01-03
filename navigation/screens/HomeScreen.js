import { Button, Column } from 'native-base';
import React, {useState} from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BannersList from '../../components/lists/BannersList';
import SearchBar from '../../components/SearchBar';
import HomeProducts from '../../components/HomeProducts';
const screenHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView>
            <Column style={{ padding: 10, backgroundColor: 'white', minHeight: screenHeight }}>
                <Button onPress={() => navigation.navigate('Welcome')} title="Go"/>
                <SearchBar navigation={navigation} />
                <BannersList />
                <HomeProducts navigation={navigation}/>
            </Column>
        </ScrollView>
    );
}