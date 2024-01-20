import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, TextInput } from "react-native";
import { getCities, getCountries } from "../../../api/DictionaryAPI";
import { Column, Select, Text } from "native-base";
import { COLORS, styles } from "../../../styles/constants";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { changeUserAddress } from "../../../api/UserAPI";
import { useMessageStore } from "../../../store/messageStore";

export default function AddUserAddressScreen ({navigation}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])
    const [isSame, setIsSame] = useState(false)
    const [success, setSuccess] = useState(null)
    const [mailingAddress, setMailingAddress] = useState({
        street: '',
        streetNumber: '',
        houseNumber: '',
        postcode: '',
        cityID: null,
        cityName: '',
        countryID: 1,
    })
    const [address, setAddress] = useState({
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
    },[])
    const validate = (address,mailingAddress) => {
        let errors = {}
        if (!address.street) {
          errors.street = "Wprowadź ulicę!"
        }
        if (!address.streetNumber) {
            errors.streetNumber = "Wprowadź numer ulicy!"
        }
        if (!address.houseNumber) {
            errors.houseNumber = "Wprowadź numer domu!"
        }
        if (!address.postcode) {
            errors.postcode = "Wprowadź kod pocztowy!"
        }
        if (!address.cityID) {
            errors.cityID = "Wybierz miasto!"
        }
        if (!mailingAddress.street && !isSame) {
          errors.mailingStreet = "Wprowadź ulicę!"
        }
        if (!mailingAddress.streetNumber && !isSame) {
            errors.mailingStreetNumber = "Wprowadź numer ulicy!"
        }
        if (!mailingAddress.houseNumber && !isSame) {
            errors.mailingHouseNumber = "Wprowadź numer domu!"
        }
        if (!mailingAddress.postcode && !isSame) {
            errors.mailingPostcode = "Wprowadź kod pocztowy!"
        }
        if (!mailingAddress.cityID && !isSame) {
            errors.mailingCityID = "Wybierz miasto!"
        }
        return errors
    }
    const handleSubmit = () => {
        setErrors(validate(address, mailingAddress))
        setSubmitting(true)
    }
    const finishSubmit = () => {
        const data = {
            address: {
                street: address.street,
                streetNumber: address.streetNumber,
                houseNumber: address.houseNumber,
                postcode: address.postcode,
                cityID: address.cityID,
                countryID: address.countryID,
                addressTypeID: 1
            }
        }
        if(!isSame){
            let newAddress = {
                street: mailingAddress.street,
                streetNumber: mailingAddress.streetNumber,
                houseNumber: mailingAddress.houseNumber,
                postcode: mailingAddress.postcode,
                cityID: mailingAddress.cityID,
                countryID: mailingAddress.countryID,
                addressTypeID: 2
            }
            data.mailingAddress =  newAddress
        }
        console.log(data);
        changeUserAddress(data,setLoading,setSuccess)
    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && submitting){
            finishSubmit()
        }
    },[errors])
    useEffect(() => {
        if(success){
            setMessage({value: "Adres został dodany", type: 'success', bool: true})
            navigation.navigate('Profile')
        }else if(success === false){
            setMessage({value: "Błąd podczas dodawania adresu", type: 'error', bool: true})
        }
    },[success])
    return(
        <ScrollView>
            <Column padding={3}>
                <Text color='white' fontWeight={600} fontSize={20} paddingX={1}>Adres zamieszkania</Text>
                <TextInput value={address.street} onChangeText={(text) => setAddress({ ...address, street: text })} placeholder="Ulica" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
                <TextInput value={address.streetNumber} onChangeText={(text) => setAddress({ ...address, streetNumber: text })} placeholder="Numer ulicy" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.streetNumber && <Text style={styles.errorText}>{errors.streetNumber}</Text>}
                <TextInput value={address.houseNumber} onChangeText={(text) => setAddress({ ...address, houseNumber: text })} placeholder="Numer domu" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.houseNumber && <Text style={styles.errorText}>{errors.houseNumber}</Text>}
                <TextInput value={address.postcode} onChangeText={(text) => setAddress({ ...address, postcode: text })} placeholder="Kod pocztowy" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.postcode && <Text style={styles.errorText}>{errors.postcode}</Text>}
                <Select marginY={2} placeholderTextColor={COLORS.triary} color='white' fontSize={14} borderWidth={2} backgroundColor={COLORS.secondary} borderColor={COLORS.triary} borderRadius={10} flex={1} selectedValue={address.cityID} width='100%' placeholder="Wybierz miasto" onValueChange={(value) => {setAddress({ ...address, cityID: value })}}>
                  {cities?.map((item,index) => {
                    return (
                        <Select.Item key={index} label={item.name} value={item.id} />  
                    )
                  })}
                </Select>
                {errors.cityID && <Text style={styles.errorText}>{errors.cityID}</Text>}
                <TextInput editable={false} value={countries.length > 0 ? countries[0].name : ''} style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>

                <BouncyCheckbox 
                isChecked={isSame}
                onPress={() => setIsSame(!isSame)}
                size={20}
                fillColor={COLORS.accent}
                unfillColor="#ffffff"
                text="Adres korespondencji taki sam jak adres zamieszkania"
                marginBottom={10}
                marginTop={10}
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
                />

                {!isSame &&
                <>
                <Text color='white' fontWeight={600} fontSize={20} paddingX={1}>Adres korespondencji</Text>
                <TextInput value={mailingAddress.street} onChangeText={(text) => setMailingAddress({ ...mailingAddress, street: text })} placeholder="Ulica" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.mailingStreet && <Text style={styles.errorText}>{errors.mailingStreet}</Text>}
                <TextInput value={mailingAddress.streetNumber} onChangeText={(text) => setMailingAddress({ ...mailingAddress, streetNumber: text })} placeholder="Numer ulicy" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.mailingStreetNumber && <Text style={styles.errorText}>{errors.mailingStreetNumber}</Text>}
                <TextInput value={mailingAddress.houseNumber} onChangeText={(text) => setMailingAddress({ ...mailingAddress, houseNumber: text })} placeholder="Numer domu" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.mailingHouseNumber && <Text style={styles.errorText}>{errors.mailingHouseNumber}</Text>}
                <TextInput value={mailingAddress.postcode} onChangeText={(text) => setMailingAddress({ ...mailingAddress, postcode: text })} placeholder="Kod pocztowy" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.mailingPostcode && <Text style={styles.errorText}>{errors.mailingPostcode}</Text>}
                <Select marginY={2} placeholderTextColor={COLORS.triary} color='white' fontSize={14} borderWidth={2} backgroundColor={COLORS.secondary} borderColor={COLORS.triary} borderRadius={10} flex={1} selectedValue={mailingAddress.cityID} width='100%' placeholder="Wybierz miasto" onValueChange={(value) => {setMailingAddress({ ...mailingAddress, cityID: value })}}>
                  {cities?.map((item,index) => {
                    return (
                        <Select.Item key={index} label={item.name} value={item.id} />  
                    )
                  })}
                </Select>
                {errors.mailingCityID && <Text style={styles.errorText}>{errors.mailingCityID}</Text>}
                <TextInput editable={false} value={countries.length > 0 ? countries[0].name : ''} style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                </>
                }
                <Pressable onPress={() => handleSubmit()} style={{backgroundColor: COLORS.accent, width: '100%', padding: 10, borderRadius: 30,marginTop: 10}}>
                    {loading ? <ActivityIndicator size='small' color='white' /> :
                    <Text color='white' fontWeight={500} fontSize={16} textAlign='center'>Akceptuj</Text>}
                </Pressable>
            </Column>
        </ScrollView>
    )
}