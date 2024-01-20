import { Modal, Pressable, ScrollView, TextInput } from "react-native";
import { COLORS, screenWidth, styles } from "../../styles/constants";
import { Center, Column, Row, Select, Text, View } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { getCities, getCountries } from "../../api/DictionaryAPI";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { getUserAddress } from "../../api/UserAPI";
import RadioButtonRN from "radio-buttons-react-native";

export default function CheckoutAddressModal({isDeliveryAddressOpen,setIsDeliveryAddressOpen,setDeliveryAddress}) {
    const [data, setData] = useState([])
    const [loadingUserAddress, setLoadingUserAddress] = useState(false)
    const [userAddress, setUserAddress] = useState([])
    const [errors, setErrors] = useState({})
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])
    const [selected, setSelected] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [addNew, setAddNew] = useState(false)
    const [newAddress, setNewAddress] = useState({
        street: '',
        streetNumber: '',
        houseNumber: '',
        postcode: '',
        cityID: null,
        cityName: '',
        countryID: 1,
    })
    useEffect(() => {
        getCities(setCities)
        getCountries(setCountries)
        getUserAddress(setUserAddress,setLoadingUserAddress)
    },[])
    useEffect(() => {
        if(userAddress.length > 0){
            const newData = userAddress.map((item) => ({
                label: item.street + " " + item.streetNumber + "/" + item.houseNumber + " " + item.postcode + ", " + item.cityID + ", " + "Polska" ,
                value: item
            }))
            setData(newData) 
        }
    },[userAddress])
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
    const handleAddNew = () => {
        setErrors(validate(newAddress))
        setSubmitting(true)
    }
    const handleAccept = () => {

    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && submitting){
            setDeliveryAddress(newAddress)
            setIsDeliveryAddressOpen(false)
        }
    },[errors])
    return(
        <Modal animationType="fade" transparent={true} visible={isDeliveryAddressOpen} onRequestClose={() => {setIsDeliveryAddressOpen(false);}}>
        <View style={{ flex: 1, backgroundColor: COLORS.primary,padding: 20, alignItems: 'center',paddingBottom: 60 }}>
        <ScrollView width='100%'>
            <Column width='100%'>
                <Row justifyContent='flex-start' alignItems='center' marginBottom={3}>
                    <Pressable onPress={() => setIsDeliveryAddressOpen(false)}>
                        <Ionicons name="arrow-back-outline" color='white' size={26} />
                    </Pressable>
                </Row>
                <Text color='white' fontWeight={600} fontSize={24}>Adres dostawy</Text>
                {(data.length > 0 && !addNew) &&
                 <RadioButtonRN
                 data={data}
                 selectedBtn={(e) => setSelected(e)}
                 boxDeactiveBgColor={COLORS.primary}
                 textColor='white'
                 activeColor={COLORS.accent}
                 deactiveColor={COLORS.border}
                 /> 
                }
                 {!addNew  &&
                <Pressable onPress={() => setAddNew(true)} style={[styles.roundButton, {width: '100%'}]}>
                    <Row alignItems='center' justifyContent='center'>
                        <Ionicons color='white' name="add" size={20} marginRight={5} />
                        <Text style={styles.roundButtonText}>Dodaj nowy adres</Text>
                    </Row>
                </Pressable>
                }
                {addNew &&
                <>
                <TextInput value={newAddress.street} onChangeText={(text) => setNewAddress({ ...newAddress, street: text })} placeholder="Ulica" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
                <TextInput value={newAddress.streetNumber} onChangeText={(text) => setNewAddress({ ...newAddress, streetNumber: text })} placeholder="Numer ulicy" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.streetNumber && <Text style={styles.errorText}>{errors.streetNumber}</Text>}
                <TextInput value={newAddress.houseNumber} onChangeText={(text) => setNewAddress({ ...newAddress, houseNumber: text })} placeholder="Numer domu" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.houseNumber && <Text style={styles.errorText}>{errors.houseNumber}</Text>}
                <TextInput value={newAddress.postcode} onChangeText={(text) => setNewAddress({ ...newAddress, postcode: text })} placeholder="Kod pocztowy" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.postcode && <Text style={styles.errorText}>{errors.postcode}</Text>}
                <Select marginY={2} placeholderTextColor={COLORS.triary} color='white' fontSize={14} borderWidth={2} backgroundColor={COLORS.secondary} borderColor={COLORS.triary} borderRadius={10} flex={1} selectedValue={newAddress.cityID} width='100%' placeholder="Wybierz miasto" onValueChange={(value) => {let result = cities.find((item) => item.id === value);setNewAddress({ ...newAddress, cityID: value, cityName: result.name })}}>
                  {cities?.map((item,index) => {
                    return (
                        <Select.Item key={index} label={item.name} value={item.id} />  
                    )
                  })}
                </Select>
                {errors.cityID && <Text style={styles.errorText}>{errors.cityID}</Text>}
                <TextInput editable={false} value={countries.length > 0 ? countries[0].name : ''} style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                </>
                }            
            </Column>
            </ScrollView>
            {addNew &&
            <Center position='absolute' bottom={5} left={0} width={screenWidth}>
            <Pressable onPress={() => handleAddNew()} style={styles.roundButton}>
                    <Text style={styles.roundButtonText}>Dodaj</Text>
            </Pressable>
            </Center>
            }
            {selected.length > 0 &&
            <Center position='absolute' bottom={5} left={0} width={screenWidth}>
            <Pressable onPress={() => handleAccept()} style={styles.roundButton}>
                    <Text style={styles.roundButtonText}>Akceptuj</Text>
            </Pressable>
            </Center>
            }
        </View> 
    </Modal>  
    )
}