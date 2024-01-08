import React, {useState, useEffect} from 'react';
import { View, Text,Button } from 'react-native';
import { TextInput } from 'react-native';
import ForwardLoginScreen from './ForwardLoginScreen';

export default function ProfileScreen({ navigation }) {
    const [isAuth, setIsAuth] = useState(false)
    return (
        !isAuth ? 
        <ForwardLoginScreen title="Zaloguj się aby móc przejść do swojego profilu!" />
        :
        <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
            <View style={{position: 'relative', width: '100'}}>
               <Text>Profil</Text>
            </View>
        </View>
    );
}
