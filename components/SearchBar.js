import { View } from "native-base";
import { useState } from "react";
import { TextInput } from "react-native";

export default function SearchBar ({navigation}) {
    const [value, setValue] = useState('')
    return (
        <View style={{position: 'relative', width: '100', marginBottom: 10}}>
            <TextInput style={{width: '100', padding: 10, paddingRight: 50, fontSize: 16, borderRadius: 8, backgroundColor: '#eee'}} placeholder='Szukaj książek..' onChangeText={newValue => setValue(newValue)} />
            {/* <IconButton onPress={() => navigation.navigate('Search', {searchValue: value})} size={24} color='gray' icon='magnify' style={{zIndex: 100,position: 'absolute', right: 1, bottom: 1, display: 'flex', alignItems: 'center'}}/> */}
        </View>
    )
}