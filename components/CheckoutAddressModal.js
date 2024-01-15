import { Modal, Pressable, ScrollView, TextInput } from "react-native";
import { COLORS, screenWidth, styles } from "../styles/constants";
import { Center, Column, Row, Select, Text, View } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { getCities, getCountries } from "../api/DictionaryAPI";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function CheckoutAddressModal({isAddressOpen, setIsAddressOpen,selectedDeliveryMethod, address, setAddress, deliveryAddress, setDeliveryAddress}) {
    const [selected, setSelected] = useState({})
    const [errors, setErrors] = useState({})
    const [selectedCity, setSelectedCity] = useState(null)
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])
    const [sameAddress, setSameAddress] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [newInvoiceAddress, setNewInvoiceAddress] = useState({
        street: '',
        streetNumber: '',
        houseNumber: '',
        postcode: '',
        cityID: null,
        countryID: 1,
        addressTypeID: 1
    })
    const [newDeliveryAddress, setNewDeliveryAddress] = useState({
        street: '',
        streetNumber: '',
        houseNumber: '',
        postcode: '',
        cityID: '',
        countryID: 1,
        addressTypeID: 2
    })
    useEffect(() => {
        getCities(setCities)
        getCountries(setCountries)
    },[])
    const validate = (values) => {
        let errors = {}
        if (!values.street) {
          errors.street = "Wprowadź ulicę!"
        }
        if (!values.streetNumber) {
            errors.streetNumber = "Wprowadź numer ulicy!"
        }
        if (!values.houseNumber) {
            errors.houseNumber = "Wprowadź numer domu!"
        }
        if (!values.postcode) {
            errors.postcode = "Wprowadź kod pocztowy!"
        }
        if (!values.cityID) {
            errors.cityID = "Wybierz miasto!"
        }
        return errors
    }
    const validateBoth = (values, secondValues) => {
        let errors = {}
        if (!values.street) {
          errors.street = "Wprowadź ulicę!"
        }
        if (!values.streetNumber) {
            errors.streetNumber = "Wprowadź numer ulicy!"
        }
        if (!values.houseNumber) {
            errors.houseNumber = "Wprowadź numer domu!"
        }
        if (!values.postcode) {
            errors.postcode = "Wprowadź kod pocztowy!"
        }
        if (!values.cityID) {
            errors.cityID = "Wybierz miasto!"
        }
        if (!secondValues.street) {
            errors.deliveryStreet = "Wprowadź ulicę!"
          }
          if (!secondValues.streetNumber) {
              errors.deliveryStreetNumber = "Wprowadź numer ulicy!"
          }
          if (!secondValues.houseNumber) {
              errors.deliveryHouseNumber = "Wprowadź numer domu!"
          }
          if (!secondValues.postcode) {
              errors.deliveryPostcode = "Wprowadź kod pocztowy!"
          }
          if (!secondValues.cityID) {
              errors.deliveryCityID = "Wybierz miasto!"
          }
        return errors
    }
    const handleSubmit = () => {
        if(sameAddress && selectedDeliveryMethod.name === 'Dostawa do domu'){
            setErrors(validateBoth(newInvoiceAddress))
        }else{
            setErrors(validate(newInvoiceAddress, newDeliveryAddress))
        }
        setSubmitting(true)
    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && submitting){
            if(selectedDeliveryMethod.name === 'Dostawa do domu'){
                setAddress(newInvoiceAddress)
                setDeliveryAddress(newDeliveryAddress)
            }else{
                setAddress(newInvoiceAddress)
            }
            setIsAddressOpen(false)
        }
    },[errors])
    return(
        <Modal animationType="fade" transparent={true} visible={isAddressOpen} onRequestClose={() => {setIsAddressOpen(false);}}>
        <View style={{ flex: 1, backgroundColor: COLORS.primary,padding: 20, alignItems: 'center',paddingBottom: 60 }}>
        <ScrollView width='100%'>
            <Column width='100%'>
                <Row justifyContent='flex-start' alignItems='center' marginBottom={3}>
                    <Pressable onPress={() => setIsAddressOpen(false)}>
                        <Ionicons name="arrow-back-outline" color='white' size={26} />
                    </Pressable>
                </Row>
                <Text color='white' fontWeight={600} fontSize={24}>Adres faktury</Text>
                <TextInput value={newInvoiceAddress.street} onChangeText={(text) => setNewInvoiceAddress({ ...newInvoiceAddress, street: text })} placeholder="Ulica" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {Object.keys(errors).length > 0 && <Text style={styles.errorText}>{errors.street}</Text>}
                <TextInput value={newInvoiceAddress.streetNumber} onChangeText={(text) => setNewInvoiceAddress({ ...newInvoiceAddress, streetNumber: text })} placeholder="Numer ulicy" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {Object.keys(errors).length > 0 && <Text style={styles.errorText}>{errors.streetNumber}</Text>}
                <TextInput value={newInvoiceAddress.houseNumber} onChangeText={(text) => setNewInvoiceAddress({ ...newInvoiceAddress, houseNumber: text })} placeholder="Numer domu" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {Object.keys(errors).length > 0 && <Text style={styles.errorText}>{errors.houseNumber}</Text>}
                <TextInput value={newInvoiceAddress.postcode} onChangeText={(text) => setNewInvoiceAddress({ ...newInvoiceAddress, postcode: text })} placeholder="Kod pocztowy" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {Object.keys(errors).length > 0 && <Text style={styles.errorText}>{errors.postcode}</Text>}
                <Select marginY={2} placeholderTextColor={COLORS.triary} color='white' fontSize={14} borderWidth={2} backgroundColor={COLORS.secondary} borderColor={COLORS.triary} borderRadius={10} flex={1} selectedValue={newInvoiceAddress.cityID} width='100%' placeholder="Wybierz miasto" onValueChange={(value) => setNewInvoiceAddress({ ...newInvoiceAddress, cityID: value })}>
                  {cities?.map((item,index) => {
                    return (
                        <Select.Item key={index} label={item.name} value={item.id} />  
                    )
                  })}
                </Select>
                {Object.keys(errors).length > 0 && <Text style={styles.errorText}>{errors.cityID}</Text>}
                <TextInput editable={false} value={countries.length > 0 ? countries[0].name : ''} style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {Object.keys(selectedDeliveryMethod).length > 0 && selectedDeliveryMethod.name === 'Dostawa do domu' &&
                <BouncyCheckbox
                    // isChecked={sameAddress}
                    onPress={() => {setSameAddress(!sameAddress)}}
                    size={20}
                    fillColor={COLORS.accent}
                    unfillColor="#ffffff"
                    text='Adres dostawy taki sam jak adres faktury'
                    marginBottom={8}
                    marginTop={5}
                    textStyle={{
                        color: COLORS.light,
                        textDecorationLine: 'none'
                        }}
                    iconStyle={{
                        borderRadius: 4
                        }}
                    innerIconStyle={{
                        borderRadius: 4
                    }}
                />}
            </Column>
            </ScrollView>
            <Center position='absolute' bottom={5} left={0} width={screenWidth}>
            <Pressable onPress={() => handleSubmit()} style={styles.roundButton}>
                    <Text style={styles.roundButtonText}>Akceptuj</Text>
            </Pressable>
            </Center>
        </View> 
    </Modal>  
    )
}