import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import PageLoader from "../../../components/loaders/PageLoader";
import { getUserRentedBooks } from "../../../api/RentalAPI";
import { Center, Column, Row, Text, View } from "native-base";
import { COLORS } from "../../../styles/constants";
import { convertDateUser } from "../../../utils/dateConverter";

export default function UserRentalsScreen ({navigation}) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [filter, setFilter] = useState('')
    useEffect(() => {
        setLoading(true)
        getUserRentedBooks(filter, setData, setLoading)
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
        {data.length > 0 ?
        <ScrollView>
            <Column padding={3}>
                <Row justifyContent='space-between' marginBottom={3}>
                    <Pressable onPress={() => setFilter('')} style={[styles.button,{backgroundColor: filter === '' ? COLORS.accent : COLORS.secondary, borderColor: filter === '' ? COLORS.accent : COLORS.border }]} >
                        <Text style={styles.buttonText}>Wszystkie</Text>
                    </Pressable>
                    <Pressable onPress={() => setFilter('rentalTypeId=1')} style={[styles.button,{backgroundColor: filter === 'rentalTypeId=1' ? COLORS.accent : COLORS.secondary, borderColor: filter === 'rentalTypeId=1' ? COLORS.accent : COLORS.border }]} >
                        <Text style={styles.buttonText}>Aktywne</Text>
                    </Pressable>
                    <Pressable onPress={() => setFilter('rentalTypeId=2')} style={[styles.button,{backgroundColor: filter === 'rentalTypeId=2' ? COLORS.accent : COLORS.secondary, borderColor: filter === 'rentalTypeId=2' ? COLORS.accent : COLORS.border }]} >
                        <Text style={styles.buttonText}>Zakończone</Text>
                    </Pressable>
                </Row>
                {data?.map((item,index) => {
                    return(
                        <Pressable key={index} onPress={() => navigation.navigate("Library")}>
                        <Column padding={3} borderWidth={2} borderColor={COLORS.border} marginBottom={3} borderRadius={8}>
                            <Row>
                                <Image source={{uri: item.imageURL}} width={80} height={120} style={{borderRadius: 8}}/>
                                <Column marginLeft={3} flexGrow={1} flex={1}>
                                    <Text color='white' fontWeight={600} fontSize={16}>{item.bookTitle}</Text>
                                    <Text color='white'>{item.fileFormatName}</Text>
                                    <Text color='white' fontWeight={300} marginTop='auto'>Data ważności: {item.expirationDate && convertDateUser(item.expirationDate)}</Text>
                                </Column>
                            </Row>
                        </Column>
                        </Pressable> 
                    )
                })}
            </Column>
        </ScrollView>
        :
        <View height='100%'>
            <Center height='100%' padding={5}>
                <Image source={{uri: 'https://iili.io/JT0PtrN.png'}} width={200} height={200}/>
                <Text textAlign='center' marginTop={5} color='white' fontSize={28} lineHeight={30} fontWeight={500}>Twoje wypożyczenia są puste</Text>
                <Text textAlign='center' marginTop={2} color='white' fontSize={16} fontWeight={300}>Wypożyczaj książki teraz.</Text>
            </Center>
        </View>
        }
</>
    )
}