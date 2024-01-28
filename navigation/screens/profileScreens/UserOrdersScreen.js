import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import PageLoader from "../../../components/loaders/PageLoader";
import { Center, Column, Row, Text, View } from "native-base";
import { COLORS } from "../../../styles/constants";
import { convertDateUser } from "../../../utils/dateConverter";
import { getUserOrders } from "../../../api/OrderAPI";

export default function UserOrdersScreen ({navigation}) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [filter, setFilter] = useState('')
    const [selected, setSelected] = useState(null)
    useEffect(() => {
        getUserOrders(filter, setData, setLoading)
    },[filter])
    const styles = StyleSheet.create({
        button: {
            borderRadius: 50,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'gray',
            paddingVertical: 6,
            paddingHorizontal: 20,
            marginRight: 5,
            flexGrow: 1
        },
        buttonText: {
            fontWeight: 500,
            color: 'white',
            textAlign: 'center'
        }
    })
    return(
        loading ? <PageLoader /> :
        <>
        {data?.length > 0 ?
        <>
        <ScrollView>
            <Column padding={3}>
                <Row justifyContent='space-between' marginBottom={3}>
                    <Pressable onPress={() => setFilter('')} style={[styles.button,{backgroundColor: filter === '' ? COLORS.accent : COLORS.secondary, borderColor: filter === '' ? COLORS.accent : COLORS.border }]} >
                        <Text style={styles.buttonText}>Wszystkie</Text>
                    </Pressable>
                    <Pressable onPress={() => setFilter('OrderStatusId=1')} style={[styles.button,{backgroundColor: filter === 'OrderStatusId=1' ? COLORS.accent : COLORS.secondary, borderColor: filter === 'OrderStatusId=1' ? COLORS.accent : COLORS.border }]} >
                        <Text style={styles.buttonText}>Aktywne</Text>
                    </Pressable>
                    <Pressable onPress={() => setFilter('OrderStatusId=2')} style={[styles.button,{backgroundColor: filter === 'OrderStatusId=2' ? COLORS.accent : COLORS.secondary, borderColor: filter === 'OrderStatusId=2' ? COLORS.accent : COLORS.border }]} >
                        <Text style={styles.buttonText}>Zakończone</Text>
                    </Pressable>
                </Row>
                {data?.map((item,index) => {
                    return(
                        <Pressable onPress={() => navigation.navigate('Order', {orderId: item.id})}>
                        <Column key={index} padding={5} borderWidth={2} borderColor={COLORS.border} marginBottom={3} borderRadius={8}>
                            <Text color={COLORS.light} fontWeight={300} fontSize={12} marginBottom={4}>Zamówienie o numerze {item.id} z dnia {item.orderDate && convertDateUser(item.orderDate)}</Text>
                            {item.orderItems.map((book,index) => {
                                return(
                                    <Row key={index} marginTop={index > 0 ? 5 : 0} borderTopWidth={index > 0 ? 1 : 0} paddingTop={index > 0 ? 4 : 0} borderTopColor={COLORS.border}>
                                        <Image source={{uri: book.imageURL}} width={80} height={120} style={{borderRadius: 8}}/>
                                        <Column marginLeft={3} flexGrow={1} flex={1}>
                                            <Text color='white' fontWeight={600} fontSize={16}>{book.bookTitle}</Text>
                                            <Text color='white' fontWeight={300} fontSize={14}>{book.formName}</Text>
                                            <Text marginTop='auto' color='white' fontWeight={600} fontSize={14}>{book.quantity} x {book.totalBruttoPrice}zł</Text>
                                        </Column>
                                    </Row>
                                )
                            })}
                        </Column>
                        </Pressable>
                    )
                })}
            </Column>
        </ScrollView>
        </>
        :
        <View height='100%'>
            <Center height='100%' padding={5}>
                <Image source={{uri: 'https://iili.io/JT0PtrN.png'}} width={200} height={200}/>
                <Text textAlign='center' marginTop={5} color='white' fontSize={28} lineHeight={30} fontWeight={500}>Nie posiadasz żadnych zamówień</Text>
                <Text textAlign='center' marginTop={2} color='white' fontSize={16} fontWeight={300}>Kupuj swoje ulubione książki w naszym sklepie.</Text>
            </Center>
        </View>
        }
</>
    )
}