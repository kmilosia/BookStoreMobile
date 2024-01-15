import React, {useEffect, useState} from 'react';
import PageLoader from '../../components/loaders/PageLoader';
import { returnCart } from '../../utils/cart';
import { COLORS } from '../../styles/constants';
import { Column, ScrollView, Text, View } from 'native-base';
import { Image, Pressable } from 'react-native';
import CartElement from '../../components/CartElement';
import { useIsFocused } from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons'

export default function CartScreen({ navigation }) {
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    const updateCartAfterDelete = (id) => {
        setCart((prev) => {
          const updatedItems = prev.map((item) => {
            if (item.id === id) {
              return null
            }
            return item
          }).filter(Boolean)
          return updatedItems
        })
      }
    useEffect(() => {
        if(isFocused){
            returnCart(setCart, setLoading)
        }
    },[isFocused])
    return (
        loading ?
        <PageLoader />
        :
        <>
        
        {cart.length > 0 ?
            <>
            <Pressable onPress={() => navigation.navigate('Checkout')} style={{width: '90%',alignSelf: 'center',position: 'absolute',bottom: 10,zIndex: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary,borderWidth: 2, borderColor: COLORS.accent, borderRadius: 30, paddingVertical: 10}}>
            <Text fontWeight={500} marginRight={1} fontSize={16} color={COLORS.accent}>Złóż zamówienie</Text>
            <IonIcons color={COLORS.accent} name='lock-closed' size={18} />
            </Pressable>
            <ScrollView>
            <Column bg={COLORS.primary} width='100%' minHeight='100%' padding={3} paddingBottom={20}>
                {cart?.map((item,index) => {
                    return (
                       <CartElement key={index} item={item} updateCartAfterDelete={updateCartAfterDelete} />
                    )
                })}
            </Column>
        </ScrollView>
        </>
        :
        <View>
        <Column padding={5} width='100%' height='100%' bg={COLORS.primary} alignItems='center' justifyContent='center'>
            <Image source={{uri: 'https://iili.io/JuANTBe.png'}} width={200} height={200} alt='Pusty koszyk' />
            <Text textAlign='center' marginTop={2} color='white' fontSize={30} fontWeight={500}>Koszyk jest pusty</Text>
            <Text textAlign='center' marginTop={2} color='white' fontSize={16} fontWeight={300}>Zapełnij swój koszyk wymarzonymi książkami.</Text>
        </Column>
        </View>
        }
        </>
    );
}
