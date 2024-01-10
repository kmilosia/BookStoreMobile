import React, {useState, useEffect} from 'react';
import { View, Text,Button, Pressable } from 'react-native';
import { TextInput } from 'react-native';
import ForwardLoginScreen from './ForwardLoginScreen';
import { AuthContext } from '../MainContainer';

export default function ProfileScreen({ navigation }) {
    const {signOut} = React.useContext(AuthContext)
    return (
        // <ForwardLoginScreen title="Zaloguj się aby móc przejść do swojego profilu!" />
        <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
            <View style={{position: 'relative', width: '100'}}>
               <Text>Profil</Text>
               <Pressable style={{backgroundColor: 'purple', padding: 10}} onPress={() => {signOut()}}>
                <Text>Wyloguj się</Text>
               </Pressable>
            </View>
        </View>
    );
}
