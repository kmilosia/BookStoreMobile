import { Center, Column, Text, View } from "native-base";
import { COLORS, styles } from "../../styles/constants";
import { ActivityIndicator, Pressable, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { restoreDiscountCode } from "../../api/DiscountAPI";

export default function DiscountCodeElement({cart,setCart,discountData,setDiscountData,setAmountAfterDiscount}){
    const [discountInput, setDiscountInput] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const handleSearchDiscount = () => {
        const data = {
            discountCode: discountInput,
            cartItems: cart.map((item) => ({
                bookItemID: item.id,
                quantity: item.quantity,
                singleItemBruttoPrice: item.price
            }))
        }
        setLoading(true)
        restoreDiscountCode(data,setLoading,setError,setDiscountData)
    }
    useEffect(() => {
        if(discountData){
            setCart((prev) => prev.map((item) => {
                const match = discountData.cartItems.find((discountItem) => discountItem.bookItemID === item.id)
                const newPrice = match ? match.singleItemBruttoPrice : item.price
                return {
                    ...item,
                    discountedBruttoPrice: newPrice
                }
            }))
            const newAmount = cart.reduce((total, item) => total + item.quantity * item.discountedBruttoPrice, 0);
            setAmountAfterDiscount(newAmount)
        }
    },[discountData])
    return(
        <Column width='100%' bg={COLORS.secondary} marginBottom={3} padding={5} paddingBottom={3} borderRadius={8}>
        <Text color='white'>Posiadasz kod rabatowy?</Text>
        <View position='relative' width='100%'>
            <TextInput onChangeText={newText => setDiscountInput(newText)} value={discountInput} style={styles.inputStyle} placeholderTextColor={COLORS.triary} placeholder='Wprowadź kod rabatowy'/>
            <Center height='100%' position='absolute' right={0} top={0}>
            <Pressable onPress={() => handleSearchDiscount()} style={{backgroundColor: COLORS.accent, padding: 12, borderRadius: 8, borderWidth: 2, borderColor: COLORS.triary}}>
                {loading ? <ActivityIndicator size='small' color='white' /> : <Ionicons name='search' color='white' size={20}/>}
            </Pressable>
            </Center>
        </View>
        {error && <Text color={COLORS.red} fontSize={12} fontWeight={300}>{error}</Text>}
        {discountData ? <Text color='green.400' fontSize={12} fontWeight={300}>Zniżka {discountData.discountCode} została zastosowana</Text> : null}
    </Column>
    )
}