import { Column } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BannersList from '../../components/lists/BannersList';
import HomeProducts from '../../components/HomeProducts';
import { COLORS } from '../../styles/constants';
import HomeNews from '../../components/HomeNews';
const screenHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView>
            <Column padding={3} bg={COLORS.primary} minHeight={screenHeight}>
                <BannersList />           
                <HomeProducts navigation={navigation}/>
                <HomeNews navigation={navigation}/>
            </Column>
        </ScrollView>
    );
}