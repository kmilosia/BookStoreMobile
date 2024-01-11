import React, {useEffect, useState} from 'react';
import PageLoader from '../../components/loaders/PageLoader';
import { returnCart } from '../../utils/cart';
import { COLORS, screenHeight } from '../../styles/constants';
import { Column, ScrollView, Text, View } from 'native-base';
import { Image } from 'react-native';
import CartElement from '../../components/CartElement';

export default function CartScreen({ navigation }) {
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    useEffect(() => {
        returnCart(setCart, setLoading)
    },[])
    return (
        loading ?
        <PageLoader />
        :
        <>
        {cart.length > 0 ?
            <ScrollView>
            <Column bg={COLORS.primary} width='100%' minHeight={screenHeight} padding={3}>
                {cart?.map((item,index) => {
                    return (
                       <CartElement key={index} item={item} cart={cart} />
                    )
                })}
            </Column>
        </ScrollView>
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
