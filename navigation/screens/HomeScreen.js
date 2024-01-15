import { Column } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import BannersList from '../../components/lists/BannersList';
import HomeProducts from '../../components/HomeProducts';
import { COLORS, screenHeight } from '../../styles/constants';
import HomeNews from '../../components/HomeNews';

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