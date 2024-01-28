import { ActivityIndicator, Image, Pressable, ScrollView } from "react-native";
import PageLoader from "../../components/loaders/PageLoader";
import { useEffect, useState } from "react";
import { getInvoice,getPDF, getOrder } from "../../api/OrderAPI";
import { Column, Row, Text, View } from "native-base";
import { convertDateUser } from "../../utils/dateConverter";
import { COLORS, styles } from "../../styles/constants";
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";


export default function OrderScreen ({navigation, route}){
    const orderId = route.params.orderId
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [invoiceLoading, setInvoiceLoading] = useState(false)
    const [invoice, setInvoice] = useState(null)
    const [showDetails, setShowDetails] = useState({
        orderDetails: false,
        paymentDetails: false,
        deliveryDetails: false,
    })
    useEffect(() => {
        if(orderId){
            getOrder(orderId,setData, setLoading)
        }
    },[orderId])
    const handleGetInvoice = () => {
        getInvoice(orderId)
    }
    return(
        loading ? <PageLoader/> :
        <ScrollView>
            <Column padding={5}>
                <Text color='white' fontSize={26} fontWeight={500}>Twoje zamówienie</Text>
                <Text color='gray.400' fontSize={14} fontWeight={300}>Wszystkie informacje o Twoim zamówieniu znajdziesz na tej stronie.</Text>
                <Column borderRadius={8} backgroundColor={COLORS.secondary} borderWidth={2} borderColor={COLORS.triary} marginTop={3}>
                    <Pressable onPress={() => setShowDetails((prev) => ({...prev, orderDetails: !prev.orderDetails}))}>
                        <Row paddingX={4} paddingY={4} width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center'>
                            <Text color='white' fontWeight={600} fontSize={18}>Szczegóły zamówienia</Text>
                            <IonIcons name={showDetails.orderDetails ? "chevron-up" : "chevron-down"} color={COLORS.triary} size={24}/>
                        </Row>
                    </Pressable>
                    {showDetails.orderDetails &&
                    <Column paddingX={4} paddingBottom={4}>
                        <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' marginY={1}>
                            <Text color='white' fontWeight={300} fontSize={14}>ID zamówienia</Text>
                            <Text color='white' fontWeight={500} fontSize={14}>{data.id}</Text>
                        </Row>
                        <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' marginY={1}>
                            <Text color='white' fontWeight={300} fontSize={14}>Data zamówienia</Text>
                            <Text color='white' fontWeight={500} fontSize={14}>{data.orderDate && convertDateUser(data.orderDate)}</Text>
                        </Row>
                        <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' marginY={1}>
                            <Text color='white' fontWeight={300} fontSize={14}>Status zamówienia</Text>
                            <Text color='white' fontWeight={300} fontSize={14}>{data.orderStatus.name}</Text>
                        </Row>
                    </Column>}
                    <Pressable onPress={() => setShowDetails((prev) => ({...prev, paymentDetails: !prev.paymentDetails}))}>
                        <Row borderTopColor={COLORS.triary} borderTopWidth={2} paddingX={4} paddingY={4} width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center'>
                            <Text color='white' fontWeight={600} fontSize={18}>Płatność</Text>
                            <IonIcons name={showDetails.paymentDetails ? "chevron-up" : "chevron-down"} color={COLORS.triary} size={24}/>
                        </Row>
                    </Pressable>
                    {showDetails.paymentDetails &&
                    <Column paddingX={4} paddingBottom={4}>
                        <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' marginY={1}>
                            <Text color='white' fontWeight={300} fontSize={14}>Kwota</Text>
                            <Text color='white' fontWeight={500} fontSize={14}>{data.payment.amount?.toFixed(2)}zł</Text>
                        </Row>
                        <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' marginY={1}>
                            <Text color='white' fontWeight={300} fontSize={14}>Data płatności</Text>
                            <Text color='white' fontWeight={500} fontSize={14}>{data.payment.paymentDate && convertDateUser(data.payment.paymentDate)}</Text>
                        </Row>
                        <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' marginY={1}>
                            <Text color='white' fontWeight={300} fontSize={14}>Metoda płatności</Text>
                            <Text color='white' fontWeight={500} fontSize={14}>{data.payment.paymentMethod.name}</Text>
                        </Row>
                        <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' marginY={1}>
                            <Text color='white' fontWeight={300} fontSize={14}>Status transakcji</Text>
                            <Text color='white' fontWeight={500} fontSize={14}>{data.payment.transactionStatus.name}</Text>
                        </Row>
                    </Column>}
                    <Pressable onPress={() => setShowDetails((prev) => ({...prev, deliveryDetails: !prev.deliveryDetails}))}>
                        <Row borderTopColor={COLORS.triary} borderTopWidth={2} paddingX={4} paddingY={4} width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center'>
                            <Text color='white' fontWeight={600} fontSize={18}>Dostawa</Text>
                            <IonIcons name={showDetails.deliveryDetails ? "chevron-up" : "chevron-down"} color={COLORS.triary} size={24}/>
                        </Row>
                    </Pressable>
                    {showDetails.deliveryDetails &&
                    <Column paddingX={4} paddingBottom={4}>
                        <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' marginY={1}>
                            <Text color='white' fontWeight={300} fontSize={14}>Sposób dostawy</Text>
                            <Text color='white' fontWeight={500} fontSize={14}>{data.deliveryMethod.name}</Text>
                        </Row>
                        <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' marginY={1}>
                            <Text color='white' fontWeight={300} fontSize={14}>Cena za dostawę</Text>
                            <Text color='white' fontWeight={500} fontSize={14}>{data.deliveryMethod.price?.toFixed(2)}zł</Text>
                        </Row>
                    </Column>}
                    
                </Column>
                <Column borderRadius={8} backgroundColor={COLORS.secondary} borderWidth={2} borderColor={COLORS.triary} marginTop={3}>
                    <View paddingX={4} paddingY={2} backgroundColor={COLORS.triary}>
                        <Text color={COLORS.light} fontSize={16} fontWeight={600}>Zamówienie #{data.id}</Text>
                    </View>
                    {data.orderItems.map((item,index) => {
                        return(
                            <Pressable key={index} onPress={() => navigation.navigate('Product', {bookID: item.id})}>
                            <Row borderTopWidth={index > 0 ? 2 : 0} padding={4} borderTopColor={COLORS.triary}>
                                <Image source={{uri: item.imageURL}} width={100} height={150} style={{borderRadius: 8}}/>
                                <Column marginLeft={3} flexGrow={1} flex={1}>
                                    <Text color='white' fontWeight={600} fontSize={16}>{item.bookTitle}</Text>
                                    <Text color='white' fontWeight={600} fontSize={12}>{item.formName === 'Book' ? 'Książka' : 'Ebook'}</Text>
                                    <Column marginTop='auto' width='100%'>
                                        <Pressable onPress={(e) => {e.stopPropagation();navigation.navigate('ReviewBook', {item: item})}} style={{alignSelf: 'flex-end', marginBottom: 4}}>
                                            <Text style={{color: COLORS.accent, fontWeight: 500}}>Oceń książkę</Text>
                                        </Pressable>
                                        <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='baseline'>
                                            <Text color='white' fontWeight={600} fontSize={14}>{item.quantity} x {item.bruttoPrice}zł</Text>
                                            <Text color='white' fontWeight={600} fontSize={16}>{item.totalBruttoPrice}zł</Text>
                                        </Row>
                                    </Column>
                                </Column>
                            </Row>
                            </Pressable>
                        )
                    })}
                    <Row paddingX={4} paddingY={4} width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' borderTopWidth={2} borderColor={COLORS.triary}>
                    <Text color={COLORS.light} fontSize={18} fontWeight={600}>Kwota</Text>
                    <Text color={COLORS.light} fontSize={18} fontWeight={600}>{data.totalBruttoPrice?.toFixed(2)}zł</Text>
                    </Row>
                    </Column>
                    <Pressable onPress={() => handleGetInvoice()} style={[styles.primaryButton,{width: 'max', marginTop: 12}]}>
                        {invoiceLoading ? <ActivityIndicator size='small' color='white' /> :
                        <Text style={styles.primaryButtonText}>Pobierz fakturę</Text>}
                    </Pressable>
            </Column>
        </ScrollView>
    )
}
