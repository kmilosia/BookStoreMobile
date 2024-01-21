import { Column, Row, Text } from "native-base"
import { Image, Pressable } from "react-native"
import IonIcons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { COLORS } from "../styles/constants"
import { useState } from "react"
import { addWishlistItem } from "../api/WishlistAPI"
import { useMessageStore } from "../store/messageStore"
import useCartStore from "../store/cartStore"

export default function CartElement ({item,updateCartAfterDelete}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const decrementCartItem = useCartStore((state) => state.decrementCartItem)
    const incrementCartItem = useCartStore((state) => state.incrementCartItem)
    const removeCartItem = useCartStore((state) => state.removeCartItem)
    const [quantity, setQuantity] = useState(item.quantity)
    const decrement = () => {
        setQuantity((prevQuantity) => prevQuantity - 1);
        decrementCartItem(item)
    }
    const increment = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        incrementCartItem(item)
    }
    const remove = () => {
        removeCartItem(item)
        updateCartAfterDelete(item.id)
    }
    const moveToWishlist = () => {
        addWishlistItem(item.id)
        removeCartItem(item)
        updateCartAfterDelete(item.id)
        setMessage({value: 'Produkt przeniesiono do listy życzeń', type: 'success', bool: true})
    }
    return (
        <Row marginY={2} rounded='lg' borderWidth={2} borderColor={COLORS.border} padding={3}>
        <Image source={{uri: item.imageURL}} width={120} height={180} style={{borderRadius: 8}} />
        <Column marginLeft={3} flexGrow={1} flex={1}>
            <Row alignItems='start' justifyContent='space-between'>
                <Text fontWeight={600} fontSize={16} lineHeight={18} color='white'>{item.title}</Text>
                <Pressable onPress={() => {moveToWishlist()}}>
                    <IonIcons name='heart-outline' color='white' size={22} />
                </Pressable>
            </Row>
            <Text fontWeight={300} color='white'>{item.authors?.map((item) => {return (item.name + " " + item.surname)})}</Text>
            <Text fontWeight={500} fontSize={12} color='white'>{item.formID === 1 ? 'Ksiażka' : 'Ebook'}</Text>
            <Row justifyContent='space-between' alignItems='flex-end' marginTop='auto' width='100%'>
                <Text fontWeight={600} fontSize={20} color='white'>{item.price?.toFixed(2)}zł</Text>
                <Row alignItems='center' borderWidth={2} borderColor={COLORS.border} borderRadius={8} padding={0}>
                    {quantity === 1 ?
                    <Pressable style={{paddingHorizontal: 8}} onPress={() => {remove()}}>
                        <IonIcons name='trash' color='white' size={18} />
                    </Pressable> 
                    :
                    <Pressable style={{paddingHorizontal: 8}} onPress={() => {decrement()}}>
                        <Entypo name='minus' color='white' size={18} />
                    </Pressable> 
                    }
                    <Text color='white' fontSize={18} borderLeftWidth={2} borderRightWidth={2} borderColor={COLORS.border} paddingX={2}>{quantity}</Text>
                    <Pressable style={{paddingHorizontal: 8}} onPress={() => {increment()}}>
                        <Entypo name='plus' color='white' size={18} />
                    </Pressable>   
                </Row>
            </Row>
        </Column>
    </Row>
    )
}