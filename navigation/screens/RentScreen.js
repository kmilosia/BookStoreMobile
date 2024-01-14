import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView } from "react-native";
import { getPaymentMethods, getRentalTypes } from "../../api/DictionaryAPI";
import { getBookDetails } from "../../api/BooksAPI";
import PageLoader from "../../components/loaders/PageLoader";
import { Column, Row, Text, View } from "native-base";
import { COLORS, styles } from "../../styles/constants";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RadioButtonRN from "radio-buttons-react-native";
import { rentBook } from "../../api/RentalAPI";
import { useMessageStore } from "../../store/messageStore";

export default function RentScreen({route, navigation}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const bookID = route.params.bookID
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(null)
    const [book, setBook] = useState([])
    const [paymentMethods, setPaymentMethods] = useState([])
    const [rentalTypes, setRentalTypes] = useState([])
    const [selectedRentalType, setSelectedRentalType] = useState(null)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
    const [rentalData, setRentalData] = useState([])
    const [paymentData, setPaymentData] = useState([])
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    useEffect(() => {
        getBookDetails(bookID,setBook,setLoading)
        getPaymentMethods(setPaymentMethods)
        getRentalTypes(setRentalTypes)
    },[])
    useEffect(() => {
        if(rentalTypes.length > 0){
            const newData = rentalTypes.map((item) => ({
                label: item.name,
                value: item.id
            }))
            setRentalData(newData) 
        }
        if(paymentMethods.length > 0){
            const newData = paymentMethods.map((item) => ({
                label: item.name,
                value: item.id
            }))
            setPaymentData(newData) 
        }
    },[rentalTypes, paymentMethods])
    const handleSubmit = () => {
        setErrors(validate(selectedPaymentMethod, selectedRentalType))
        setSubmitting(true)
    }
    const validate = (selectedPaymentMethod, selectedRentalType) => {
        let errors = {}
        if (!selectedPaymentMethod) {
          errors.paymentMethods = "Wybierz sposób płatności!"
        }
        if (!selectedRentalType) {
            errors.rentalType = "Wybierz typ wypożyczenia!";
        }
        return errors
    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && submitting){
            setLoading(true)
            const currentDate = new Date();
            const formattedStartDate = currentDate.toISOString();
            const data = {
                startDate: formattedStartDate,
                bookItemID: bookID,
                paymentMethodID: selectedPaymentMethod,
                rentalTypeID: selectedRentalType
            }
            rentBook(data,setLoading, setSuccess)
        }
    },[errors])
    useEffect(() => {
        if(success){
            setMessage({value: "Książka została wypożyczona!", type: 'success', bool: true})
            navigation.navigate('Library')
        }else if(success === false){
            setMessage({value: "Nieudana próba wypożyczenia. Spróbuj ponownie!", type: 'error', bool: true})
        }
    },[success])
    return (
        loading ? <PageLoader /> :
        <ScrollView>
            <Column width='100%' bg={COLORS.primary}>
                <View height={280} position='relative' width='100%'>
                    <Image style={{position: 'absolute', zIndex: 10,width: '100%' }} blurRadius={20} height={280} resizeMode="cover" source={{uri: book.images[0].imageURL}} alt="Book Cover" />
                    <LinearGradient style={{position: 'absolute', zIndex: 20, width: '100%', height: 280, resizeMode: 'cover' }} colors={['#ffffff00', '#181826']}/>
                    <Row width='100%' alignItems='flex-end' height='100%' position='absolute' zIndex={30} padding={5}>
                        <Image height={220} width={150} style={{borderRadius: 8}} source={{uri: book.images[0].imageURL}} alt="Book Cover" />
                        <Column flexGrow={1} flex={1} marginLeft={3} height={220}>
                        <Text color='white' fontWeight={600} fontSize={20} lineHeight={22}>{book.bookTitle}</Text>
                        <Text color='white' fontWeight={300}>{book.authors?.map((item) => {return (item.name + " " + item.surname)})}</Text>
                        <Row alignItems='center' marginBottom={2}>
                                <FontAwesome name="star" size={20} color='gold'/>
                                <Text color='white' marginLeft={1} fontSize={18}>{book.score}</Text>
                        </Row>   
                        <Text color='white' marginTop='auto' fontSize={16} fontWeight={600}>{book.fileFormatName}</Text>
                        </Column>
                    </Row>
                </View>
                <Column padding={3}>
                    <Text color='white' fontSize={16} fontWeight={500} marginBottom={2}>Wybierz typ wypożyczenia:</Text>
                    <RadioButtonRN
                        data={rentalData}
                        selectedBtn={(e) => setSelectedRentalType(e.value)}
                        boxDeactiveBgColor={COLORS.primary}
                        textColor='white'
                        activeColor={COLORS.accent}
                        deactiveColor={COLORS.border}
                        />
                    {errors.rentalType && <Text style={styles.errorText}>{errors.rentalType}</Text>}
                    <Text color='white' fontSize={16} fontWeight={500} marginTop={5} marginBottom={2}>Wybierz metodę płatności:</Text>
                    <RadioButtonRN
                        data={paymentData}
                        selectedBtn={(e) => setSelectedPaymentMethod(e.value)}
                        boxDeactiveBgColor={COLORS.primary}
                        textColor='white'
                        activeColor={COLORS.accent}
                        deactiveColor={COLORS.border}
                    />
                    {errors.paymentMethods && <Text style={styles.errorText}>{errors.paymentMethods}</Text>}
                    <Pressable onPress={() => handleSubmit()} style={{borderRadius: 30, backgroundColor: COLORS.accent, padding: 10, width: '100%', marginTop: 20, marginBottom: 10 }}>
                        {loading ? <ActivityIndicator size='small' color='white' /> :
                        <Text textAlign='center' color='white' fontSize={16} fontWeight={500}>Wypożycz</Text>}
                    </Pressable>
                </Column>
            </Column>
        </ScrollView>
    )
}