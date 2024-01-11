import { Column, Row, Text } from "native-base"
import { Image, Pressable } from "react-native"
import IonIcons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { COLORS } from "../styles/constants"
import { useState } from "react"
import { decrementCartItem, incrementCartItem, logCart, removeCartItem } from "../utils/cart"
import { addWishlistItem } from "../api/WishlistAPI"


export default function CartElement ({item,cart}) {
    const [quantity, setQuantity] = useState(item.quantity)
    const decrement = () => {
        setQuantity((prevQuantity) => prevQuantity - 1);
        decrementCartItem(item)
    }
    const increment = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        incrementCartItem(item)
    }
    const moveToWishlist = () => {
        console.log(cart);
        addWishlistItem(item.id)
        removeCartItem(item)
        cart = cart.filter((item) => item.id !== item.id)
    }
    return (
        <Row marginY={3} rounded='lg' borderWidth={2} borderColor={COLORS.border} padding={3}>
        <Image source={{uri: item.imageURL}} width={120} height={180} style={{borderRadius: 8}} />
        <Column marginLeft={3} flexGrow={1} flex={1}>
            <Row alignItems='start' justifyContent='space-between'>
                <Text fontWeight={600} fontSize={16} lineHeight={18} color='white'>{item.title}</Text>
                <Pressable onPress={() => {moveToWishlist()}}>
                    <IonIcons name='heart-outline' color='white' size={22} />
                </Pressable>
            </Row>
            <Text fontWeight={300} color='white'>{item.authors?.map((item) => {return (item.name + " " + item.surname)})}</Text>
            <Text fontWeight={500} fontSize={12} color='white'>{item.formId === 1 ? 'Ksiażka' : 'Ebook'}</Text>
            <Row justifyContent='space-between' alignItems='center' marginTop='auto' width='100%'>
                <Text fontWeight={600} fontSize={20} color='white'>{item.price?.toFixed(2)}zł</Text>
                <Row alignItems='center'>
                    {quantity === 1 ?
                    <Pressable onPress={() => {decrement()}} disabled={quantity === 1 ? true : false}>
                        <Entypo name='minus' color='white' size={22} />
                    </Pressable> 
                    :
                    <Pressable onPress={() => {decrement()}} disabled={quantity === 1 ? true : false}>
                        <Entypo name='minus' color='white' size={22} />
                    </Pressable> 
                    }
                    <Text color='white' marginX={2} fontSize={20}>{quantity}</Text>
                    <Pressable onPress={() => {increment()}}>
                        <Entypo name='plus' color='white' size={22} />
                    </Pressable>   
                </Row>
            </Row>
        </Column>
    </Row>
    )
}