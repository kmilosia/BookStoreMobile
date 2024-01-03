import React, {useState, useEffect} from 'react';
import { View, Text,Button } from 'react-native';
import { TextInput } from 'react-native';

export default function ProfileScreen({ navigation }) {
    const [value, setValue] = useState('')
    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
            <View style={{position: 'relative', width: '100'}}>
                <TextInput style={{elevation: 1,width: '100', padding: 10, paddingRight: 50, fontSize: 16, borderRadius: 10, backgroundColor: '#f9fafb'}} placeholder='Szukaj książek..'
                onChangeText={newValue => setValue(newValue)}
                />
             
            </View>

           
        </View>
    );
}
