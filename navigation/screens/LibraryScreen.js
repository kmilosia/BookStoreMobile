import React, {useState} from 'react';
import { View } from 'react-native';
import { Column,Row,Text } from 'native-base';
import { COLORS } from '../../styles/constants';
import { Pressable } from 'react-native';
import RentedBooksList from '../../components/RentedBooksList';
import PurchasedBooksList from '../../components/PurchasedBooksList';

export default function LibraryScreen({ navigation }) {
    const [showRented, setShowRented] = useState(true)
    return (
        <View>
        <Column padding={3} width='100%' height='100%' bg={COLORS.primary}>
            <Row width="100%" justifyContent='space-between'>
                <Pressable onPress={() => setShowRented(true)} style={{width: '49%', backgroundColor: showRented ? COLORS.accent : COLORS.primary, borderRadius: 50, borderWidth: 2, borderColor: COLORS.border, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10}}>
                    <Text color='white' fontWeight={600}>Wypożyczone</Text>
                </Pressable>
                <Pressable onPress={() => setShowRented(false)} style={{width: '49%', backgroundColor: showRented ? COLORS.primary : COLORS.accent, borderRadius: 50, borderWidth: 2, borderColor: COLORS.border, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10}}>
                    <Text color='white' fontWeight={600}>Kupione</Text>
                </Pressable>
            </Row>
            {showRented ? <RentedBooksList /> : <PurchasedBooksList />}
        </Column>
        </View>
    );
}
