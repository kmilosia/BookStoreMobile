import { useEffect, useState } from "react"
import PageLoader from "../../components/loaders/PageLoader"
import { Image, Pressable, ScrollView, TextInput } from "react-native"
import { Column, Row, Text } from "native-base"
import { COLORS, styles } from "../../styles/constants"
import useCartStore from "../../store/cartStore"
import { getUserAddress } from "../../api/UserAPI"
import DeliveryModal from "../../components/DeliveryModal"
import PaymentModal from "../../components/PaymentModal"
import CheckoutAddressModal from "../../components/CheckoutAddressModal"

export default function CheckoutScreen () {
    const returnCart = useCartStore((state) => state.returnCart)
    const totalAmount = useCartStore((state) => state.totalAmount)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    const [address, setAddress] = useState({})
    const [deliveryAddress, setDeliveryAddress] = useState({})
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({})
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState({})
    const [sum, setSum] = useState(0)
    const [isDeliveryOpen, setIsDeliveryOpen] = useState(false)
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)
    const [isAddressOpen, setIsAddressOpen] = useState(false)
    useEffect(() => {
        returnCart(setCart, setLoading)
        getUserAddress(setAddress)
    },[])
    useEffect(() => {
        setSum(totalAmount)
    },[totalAmount])
    useEffect(() => {
        console.log(address);
    },[])
    return (
        loading ? <PageLoader /> :
        <>
        <ScrollView>
            <Column bg={COLORS.primary} width='100%' minHeight='100%' padding={3}>
                {cart?.map((item,index) => {
                    return(
                        <Row key={index} paddingY={3} paddingX={5} borderRadius={8} bg={COLORS.secondary} marginBottom={3}>
                            <Image style={{borderRadius: 8}} source={{uri: item.imageURL}} height={120} width={80} alt="Książka"/>
                            <Column marginLeft={3} flexGrow={1} flex={1}>
                                <Text color='white' fontWeight={600} fontSize={16}>{item.title}</Text>
                                <Text color='white' fontWeight={300} fontSize={12}>{item.formID && item.formID === 1 ? 'Książka' : 'Ebook'}</Text>
                                <Row alignItems='baseline' marginTop='auto'>
                                    <Text color={COLORS.light} fontWeight={600} fontSize={16}>{item.quantity}</Text>
                                    <Text color={COLORS.light} fontWeight={600} fontSize={14}> x </Text>
                                    <Text color={COLORS.light} fontWeight={600} fontSize={16}>{item.price?.toFixed(2)}zł</Text>
                                </Row>
                            </Column>
                        </Row>
                    )
                })}
                 {Object.keys(selectedDeliveryMethod).length > 0 ?
                <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' borderRadius={8} bg={COLORS.secondary} padding={5} marginBottom={3}>
                    <Text color='white' fontWeight={600}>{selectedDeliveryMethod.name}</Text>
                    <Pressable onPress={() => setIsDeliveryOpen(true)}>
                        <Text fontWeight={600} color={COLORS.accent}>Zmień</Text>
                    </Pressable>
                </Row>
                :
                <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' borderRadius={8} bg={COLORS.secondary} padding={5} marginBottom={3}>
                    <Text color='white' fontWeight={600} fontSize={18}>Dostawa</Text>
                    <Pressable onPress={() => {setIsDeliveryOpen(true)}} style={{borderRadius: 30, backgroundColor: COLORS.accent, paddingVertical: 5, paddingHorizontal: 20}}>
                        <Text fontWeight={600} color='white'>Wybierz</Text>
                    </Pressable>
                </Row>
                }
                {Object.keys(selectedPaymentMethod).length > 0 ?
                <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' borderRadius={8} bg={COLORS.secondary} padding={5} marginBottom={3}>
                    <Text color='white' fontWeight={600}>{selectedPaymentMethod.name}</Text>
                    <Pressable onPress={() => setIsPaymentOpen(true)}>
                        <Text fontWeight={600} color={COLORS.accent}>Zmień</Text>
                    </Pressable>
                </Row>
                :
                <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' borderRadius={8} bg={COLORS.secondary} padding={5} marginBottom={3}>
                    <Text color='white' fontWeight={600} fontSize={18}>Metoda płatności</Text>
                    <Pressable onPress={() => {setIsPaymentOpen(true)}} style={{borderRadius: 30, backgroundColor: COLORS.accent, paddingVertical: 5, paddingHorizontal: 20}}>
                        <Text fontWeight={600} color='white'>Wybierz</Text>
                    </Pressable>
                </Row>
                }
                <Column width='100%' bg={COLORS.secondary} marginBottom={3} padding={5} borderRadius={8}>
                    <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center'>
                        <Text color='white' fontWeight={600} fontSize={18}>Adres</Text>
                        {Object.keys(address).length > 0 ?
                        <Pressable>
                            <Text fontWeight={300} fontSize={12} color='white'>Edytuj</Text>
                        </Pressable>
                        :
                        <Pressable onPress={() => {setIsAddressOpen(true)}} style={{borderRadius: 30, backgroundColor: COLORS.accent, paddingVertical: 5, paddingHorizontal: 20}}>
                            <Text fontWeight={600} color='white'>Dodaj</Text>
                        </Pressable>
                        }
                    </Row>
                </Column>
                <Column width='100%' bg={COLORS.secondary} marginBottom={3} padding={5} paddingBottom={3} borderRadius={8}>
                    <Text color='white'>Posiadasz kod rabatowy?</Text>
                    <TextInput placeholder="Wprowadź kod rabatowy" style={styles.inputStyle} placeholderTextColor={COLORS.triary} />
                </Column>
                <Column bg={COLORS.secondary} width='100%' borderRadius={8} marginBottom={3} padding={5}>
                    <Row justifyContent='space-between' maxWidth='100%' width='100%' marginBottom={3}>
                        <Text color={COLORS.light} fontWeight={300}>Suma koszyka</Text>
                        <Text color='white' fontWeight={600}>{totalAmount?.toFixed(2)}zł</Text>
                    </Row>
                    <Row justifyContent='space-between' maxWidth='100%' width='100%' marginBottom={3}>
                        <Text color={COLORS.light} fontWeight={300}>Dostawa</Text>
                        <Text color='white' fontWeight={600}>0zł</Text>
                    </Row>
                    <Row justifyContent='space-between' maxWidth='100%' width='100%' marginBottom={3}>
                        <Text color={COLORS.light} fontWeight={300}>Kod rabatowy</Text>
                        <Text color='white' fontWeight={600}>-0.00zł</Text>
                    </Row>
                    <Row borderTopColor={COLORS.border} borderTopWidth={1} paddingTop={2} justifyContent='space-between' maxWidth='100%' width='100%'>
                        <Text color={COLORS.light} fontSize={16} fontWeight={600}>Suma do zapłaty</Text>
                        <Text color='white' fontSize={16} fontWeight={600}>{sum?.toFixed(2)}zł</Text>
                    </Row>
                </Column>
                 <Pressable style={{width: '100%', backgroundColor: COLORS.accent, borderRadius: 8}}>
                    <Text fontWeight={500} fontSize={16} color='white' textAlign='center' padding={3}>Opłać i zamów</Text>
                </Pressable>
            </Column>
        </ScrollView>
        <DeliveryModal setIsDeliveryOpen={setIsDeliveryOpen} isDeliveryOpen={isDeliveryOpen} setSelectedDeliveryMethod={setSelectedDeliveryMethod}/>
        <PaymentModal setIsPaymentOpen={setIsPaymentOpen} isPaymentOpen={isPaymentOpen} setSelectedPaymentMethod={setSelectedPaymentMethod}/>
        <CheckoutAddressModal isAddressOpen={isAddressOpen} setIsAddressOpen={setIsAddressOpen} address={address} deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress} setAddress={setAddress} selectedDeliveryMethod={selectedDeliveryMethod}/>
        </>
    )
}