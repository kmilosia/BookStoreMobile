import React, {useState} from 'react';
import { Column,Row,Text,View } from 'native-base';
import { COLORS } from '../../styles/constants';
import { Pressable } from 'react-native';
import RentedBooksList from '../../components/lists/RentedBooksList';
import PurchasedBooksList from '../../components/lists/PurchasedBooksList';

export default function LibraryScreen() {
    const [showRented, setShowRented] = useState(true)
    return (
        <View height='100%'>
        <Column padding={3} width='100%' height='100%'>
            <Row width="100%" justifyContent='space-between' marginBottom={10}>
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
