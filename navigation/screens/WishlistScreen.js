import React, {useState} from 'react';
import { View, Text } from 'react-native';
import ForwardLoginScreen from './ForwardLoginScreen';

export default function WishlistScreen({ navigation }) {
    const [isAuth, setIsAuth] = useState(false)
    return (
        !isAuth ? 
        <ForwardLoginScreen title="Zaloguj się aby mieć dostęp do listy życzeń!" />
        :
        <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
            <View style={{position: 'relative', width: '100'}}>
               <Text>Lista życzeń</Text>
            </View>
        </View>
    );
}
