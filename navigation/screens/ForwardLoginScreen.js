import { Text, View } from "native-base";
import { COLORS } from "../../styles/constants";
import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'

export default function ForwardLoginScreen ({title}) {
    const navigation = useNavigation()
    return (
        <View padding={10} display='flex' flexDirection='column' alignItems='center' justifyContent='center' width='100%' height='100%' backgroundColor={COLORS.primary}>
            <Image src='https://iili.io/J7XFou4.png' style={{height: 200, width: 200, marginBottom: 20}} />
            <Text marginBottom={5} textAlign='center' color='white' fontSize={24} fontWeight={300}>{title}</Text>
            <Pressable onPress={() => {navigation.navigate('Welcome')}} style={{flexDirection: 'row',display: 'flex',alignItems: 'center',backgroundColor: COLORS.accent, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 8,}}>
                <Text marginRight={1} textAlign='center' color='white' fontWeight={500} fontSize={18}>Przejdź do logowania</Text>
                <Feather name="arrow-up-right" size={22} color='white' />
            </Pressable>
        </View>
    )
}