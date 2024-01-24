import { useEffect, useState } from "react"
import PageLoader from "../../components/loaders/PageLoader"
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet } from "react-native"
import { Column, Row, Text, View } from "native-base"
import { COLORS, styles } from "../../styles/constants"
import useCartStore from "../../store/cartStore"
import { makeOrder } from "../../api/OrderAPI"
import DiscountCodeElement from "../../components/checkout/DiscountCodeElement"
import DeliveryModal from "../../components/checkout/DeliveryModal"
import PaymentModal from "../../components/checkout/PaymentModal"
import InvoiceAddressModal from "../../components/checkout/InvoiceAddressModal"
import CheckoutAddressModal from "../../components/checkout/CheckoutAddressModal"
import { useMessageStore } from "../../store/messageStore"

export default function CheckoutScreen ({navigation}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const returnCart = useCartStore((state) => state.returnCart)
    const totalAmount = useCartStore((state) => state.totalAmount)
    const emptyCart = useCartStore((state) => state.emptyCart)
    const isElectronicPurchase = useCartStore((state) => state.isElectronicPurchase)
    const [loading, setLoading] = useState(true)
    const [orderLoading, setOrderLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [cart, setCart] = useState([])
    const [invoiceAddress, setInvoiceAddress] = useState({})
    const [deliveryAddress, setDeliveryAddress] = useState({})
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({})
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState({})
    const [sum, setSum] = useState(totalAmount)
    const [isDeliveryOpen, setIsDeliveryOpen] = useState(false)
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)
    const [isInvoiceAddressOpen, setIsInvoiceAddressOpen] = useState(false)
    const [isDeliveryAddressOpen, setIsDeliveryAddressOpen] = useState(false)
    const [discountData, setDiscountData] = useState(null)
    const [amountAfterDiscount, setAmountAfterDiscount] = useState(null)
    useEffect(() => {
        returnCart(setCart, setLoading)
        if(isElectronicPurchase){
            setSelectedDeliveryMethod({id: 1,price: 0, name: 'Dostawa elektroniczna'})
        }
    },[])
    useEffect(() => {
        if(Object.keys(selectedDeliveryMethod).length > 0){
            setSum(totalAmount + selectedDeliveryMethod.price)
        }else{
            setSum(totalAmount)
        }
    },[selectedDeliveryMethod,totalAmount])
    
    const handleSubmit = () => {
        setErrors(validate)
        setSubmitting(true)
    }
    const finishSubmit = () => {
        setOrderLoading(true)
        const data = {
            deliveryMethodID: selectedDeliveryMethod.id,
            paymentMethodID: selectedPaymentMethod.id,
            invoiceAddress: {
                street: invoiceAddress.street,
                streetNumber: invoiceAddress.streetNumber,
                houseNumber: invoiceAddress.houseNumber,
                postcode: invoiceAddress.postcode,
                cityID: invoiceAddress.cityID,
                countryID: invoiceAddress.countryID,
                addressTypeID: 3,
            },
            cartItems: cart.map((item) => ({
                bookItemID: item.id,
                quantity: item.quantity,
            }))
        }
        if(discountData?.discountID){
            data.discountCodeID = discountData.discountID
        }
        if(selectedDeliveryMethod.name === 'Dostawa do domu' && Object.keys(deliveryAddress).length > 0){
            data.deliveryAddress = {
                street: deliveryAddress.street,
                streetNumber: deliveryAddress.streetNumber,
                houseNumber: deliveryAddress.houseNumber,
                postcode: deliveryAddress.postcode,
                cityID: deliveryAddress.cityID,
                countryID: deliveryAddress.countryID,
                addressTypeID: 4,
            }
        }
        makeOrder(data, setOrderLoading,setSuccess)
    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && submitting){
            finishSubmit()
        }
    },[errors])
   
    const validate = () => {
        let errors = {}
        if (Object.keys(selectedDeliveryMethod).length <= 0) {
          errors.delivery = "Wybierz sposób dostawy!"
        }
        if (Object.keys(selectedPaymentMethod).length <= 0) {
            errors.payment = "Wybierz metodę płatności!"
        }
        if (Object.keys(invoiceAddress).length <= 0) {
            errors.invoiceAddress = "Wybierz adres faktury!"
        }
        if (selectedDeliveryMethod.name === 'Dostawa do domu') {
            if (Object.keys(deliveryAddress).length <= 0) {
                errors.deliveryAddress = "Wybierz adres dostawy!"
            }
        }
        return errors
    }
    const style = StyleSheet.create({
        discountPrice: {
            color: COLORS.light,
            fontWeight: 300,
            fontSize: 14,            
            textDecorationLine: 'line-through'
        },
        defaultPrice: {
            color: COLORS.light,
            fontWeight: 500,
            fontSize: 16,
            textDecorationLine: 'none'
        }
    })
    useEffect(() => {
        if(success){
            navigation.navigate('OrderConfirm')
            emptyCart()
        }else if(success === false){
            setMessage({value: "Nie można było złożyć zamówienia. Spróbuj ponownie później.", type: 'error', bool: true})
        }
    },[success])
    return (
        loading ? <PageLoader /> :
        <>
        <ScrollView>
            <Column bg={COLORS.primary} width='100%' minHeight='100%' padding={3}>
                {cart?.map((item,index) => {
                    return(
                        <Column key={index} paddingY={3} paddingX={5} borderRadius={8} bg={COLORS.secondary} marginBottom={3}>
                        <Row>
                            <Image style={{borderRadius: 8}} source={{uri: item.imageURL}} height={120} width={80} alt="Książka"/>
                            <Column marginLeft={3} flexGrow={1} flex={1}>
                                <Text color='white' fontWeight={600} fontSize={16}>{item.title}</Text>
                                <Text color='white' fontWeight={300} fontSize={12}>{item.formID && item.formID === 1 ? 'Książka' : 'Ebook'}</Text>
                                <Row alignItems='baseline' marginTop='auto'>
                                    <Text color={COLORS.light} fontWeight={600} fontSize={16}>{item.quantity}</Text>
                                    <Text color={COLORS.light} fontWeight={600} fontSize={14}> x </Text>
                                    <Row alignItems='baseline'>
                                        {item.discountedBruttoPrice !== 0 &&                                                                                                                                                        
                                       <Text color={COLORS.accent} fontWeight={500} fontSize={16} marginRight={1}>{item.discountedBruttoPrice.toFixed(2)}zł</Text>}
                                        <Text style={item.discountedBruttoPrice !== 0 ? style.discountPrice : style.defaultPrice}>{item.price?.toFixed(2)}zł</Text>
                                    </Row>
                                </Row>
                            </Column>
                        </Row>
                        {item.formID === 2 && <Text color={COLORS.accent} fontWeight={300} marginTop={2} fontSize={12}>Produkt elektroniczny zostanie dostarczony na Twój adres email.</Text>}
                        </Column>
                    )
                })}
                {!isElectronicPurchase &&(
                Object.keys(selectedDeliveryMethod).length > 0 ?
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
                )}
                {errors.delivery && <Text style={styles.errorText}>{errors.delivery}</Text>}
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
                {errors.payment && <Text style={styles.errorText}>{errors.payment}</Text>}
                <Column width='100%' bg={COLORS.secondary} marginBottom={3} padding={5} borderRadius={8}>
                    <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center'>
                        <Text color='white' fontWeight={600} fontSize={18}>Adres faktury</Text>
                        {Object.keys(invoiceAddress).length > 0 ?
                        <Pressable onPress={() => setIsInvoiceAddressOpen(true)}>
                            <Text fontWeight={300} fontSize={12} color='white'>Edytuj</Text>
                        </Pressable>
                        :
                        <Pressable onPress={() => {setIsInvoiceAddressOpen(true)}} style={{borderRadius: 30, backgroundColor: COLORS.accent, paddingVertical: 5, paddingHorizontal: 20}}>
                            <Text fontWeight={600} color='white'>Wybierz</Text>
                        </Pressable>
                        }
                    </Row>
                    {Object.keys(invoiceAddress).length > 0 &&
                        <Column>
                            <Text color={COLORS.light}>{invoiceAddress.street} {invoiceAddress.streetNumber}, {invoiceAddress.houseNumber}</Text>
                            <Text color={COLORS.light}>{invoiceAddress.postcode}, {invoiceAddress.cityName}</Text>
                            <Text color={COLORS.light}>{invoiceAddress.countryName}</Text>
                        </Column>
                    }
                </Column>
                {errors.invoiceAddress && <Text style={styles.errorText}>{errors.invoiceAddress}</Text>}
                {Object.keys(selectedDeliveryMethod).length > 0 && selectedDeliveryMethod.name === 'Dostawa do domu' &&
                <Column width='100%' bg={COLORS.secondary} marginBottom={3} padding={5} borderRadius={8}>
                    <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center'>
                        <Text color='white' fontWeight={600} fontSize={18}>Adres dostawy</Text>
                        {Object.keys(deliveryAddress).length > 0 ?
                        <Pressable onPress={() => setIsDeliveryAddressOpen(true)}>
                            <Text fontWeight={300} fontSize={12} color='white'>Edytuj</Text>
                        </Pressable>
                        :
                        <Pressable onPress={() => {setIsDeliveryAddressOpen(true)}} style={{borderRadius: 30, backgroundColor: COLORS.accent, paddingVertical: 5, paddingHorizontal: 20}}>
                            <Text fontWeight={600} color='white'>Wybierz</Text>
                        </Pressable>
                        }
                    </Row>
                    {Object.keys(deliveryAddress).length > 0 &&
                        <Column>
                            <Text color={COLORS.light}>{deliveryAddress.street} {deliveryAddress.streetNumber}, {deliveryAddress.houseNumber}</Text>
                            <Text color={COLORS.light}>{deliveryAddress.postcode}, {deliveryAddress.cityName}</Text>
                            <Text color={COLORS.light}>{deliveryAddress.countryName}</Text>
                        </Column>
                    }
                </Column>
                }
                {errors.deliveryAddress && <Text style={styles.errorText}>{errors.deliveryAddress}</Text>}
                <DiscountCodeElement setAmountAfterDiscount={setAmountAfterDiscount} setDiscountData={setDiscountData} discountData={discountData} cart={cart} setCart={setCart}/>
                <Column bg={COLORS.secondary} width='100%' borderRadius={8} marginBottom={3} padding={5}>
                    <Row justifyContent='space-between' maxWidth='100%' width='100%' marginBottom={3}>
                        <Text color={COLORS.light} fontWeight={300}>Suma koszyka</Text>
                        <Text color='white' fontWeight={600}>{totalAmount ? totalAmount.toFixed(2) : '0.00'}zł</Text>
                    </Row>
                    <Row justifyContent='space-between' maxWidth='100%' width='100%' marginBottom={3}>
                        <Text color={COLORS.light} fontWeight={300}>Dostawa</Text>
                        <Text color='white' fontWeight={600}>{Object.keys(selectedDeliveryMethod).length > 0 ? selectedDeliveryMethod.price : '0.00'}zł</Text>
                    </Row>
                    {discountData &&
                    <Row justifyContent='space-between' maxWidth='100%' width='100%' marginBottom={3}>
                        <Text color={COLORS.light} fontWeight={300}>Kod rabatowy</Text>
                        <Text color='white' fontWeight={600}>{discountData?.discountCode}</Text>
                    </Row>}
                    <Row borderTopColor={COLORS.border} borderTopWidth={1} paddingTop={2} justifyContent='space-between' maxWidth='100%' width='100%'>
                        <Text color={COLORS.light} fontSize={16} fontWeight={600}>Suma do zapłaty</Text>
                        <Text color='white' fontSize={16} fontWeight={600}>{sum ? sum.toFixed(2) : '0.00'}zł</Text>
                    </Row>
                </Column>
                 <Pressable onPress={() => handleSubmit()} style={{width: '100%', backgroundColor: COLORS.accent, borderRadius: 8}}>
                    {orderLoading ? <ActivityIndicator size='small' color='white' /> :
                    <Text fontWeight={500} fontSize={16} color='white' textAlign='center' padding={3}>Opłać i zamów</Text>}
                </Pressable>
            </Column>
        </ScrollView>
        <DeliveryModal setIsDeliveryOpen={setIsDeliveryOpen} isDeliveryOpen={isDeliveryOpen} setSelectedDeliveryMethod={setSelectedDeliveryMethod}/>
        <PaymentModal setIsPaymentOpen={setIsPaymentOpen} isPaymentOpen={isPaymentOpen} setSelectedPaymentMethod={setSelectedPaymentMethod}/>
        <InvoiceAddressModal isInvoiceAddressOpen={isInvoiceAddressOpen} setIsInvoiceAddressOpen={setIsInvoiceAddressOpen} invoiceAddress={invoiceAddress} setInvoiceAddress={setInvoiceAddress}/>
        <CheckoutAddressModal isDeliveryAddressOpen={isDeliveryAddressOpen} setIsDeliveryAddressOpen={setIsDeliveryAddressOpen} deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress}/>
        </>
    )
}