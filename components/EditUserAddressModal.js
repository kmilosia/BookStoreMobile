import { Column, Row, Select, Text, View } from "native-base";
import { ActivityIndicator, Modal, Pressable, ScrollView, TextInput } from "react-native";
import IonIcons from 'react-native-vector-icons/Ionicons'
import { COLORS,styles } from "../styles/constants";
import { useEffect, useState } from "react";
import { getCities } from "../api/DictionaryAPI";
import { useMessageStore } from "../store/messageStore";
import { changeUserAddress } from "../api/UserAPI";

export default function EditUserAddressModal({isModal, setIsModal,editedAddress,setEditedAddress,userAddress,index}){
    const setMessage = useMessageStore((state) => state.setMessage)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [cities, setCities] = useState([])
    const validate = (address) => {
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
        return errors
    }
    const handleSubmit = () => {
        setErrors(validate(editedAddress))
        setSubmitting(true)
    }
    const finishSubmit = () => {
        let data = {
            address: {},
            mailingAddress: {}
        }
        if(editedAddress.addressTypeID === 1){
            data.address = {
                street: editedAddress.street,
                streetNumber: editedAddress.streetNumber,
                houseNumber: editedAddress.houseNumber,
                postcode: editedAddress.postcode,
                cityID: editedAddress.cityID,
                addressTypeID: editedAddress.addressTypeID
            }
            data.mailingAddress = {
                street: userAddress[index].street,
                streetNumber: userAddress[index].streetNumber,
                houseNumber: userAddress[index].houseNumber,
                postcode: userAddress[index].postcode,
                cityID: userAddress[index].cityID,
                addressTypeID: userAddress[index].addressTypeID
            }
        }else{
            
            data.mailingAddress = {
                street: editedAddress.street,
                streetNumber: editedAddress.streetNumber,
                houseNumber: editedAddress.houseNumber,
                postcode: editedAddress.postcode,
                cityID: editedAddress.cityID,
                addressTypeID: editedAddress.addressTypeID
            }
            data.address = {
                street: userAddress[index].street,
                streetNumber: userAddress[index].streetNumber,
                houseNumber: userAddress[index].houseNumber,
                postcode: userAddress[index].postcode,
                cityID: userAddress[index].cityID,
                addressTypeID: userAddress[index].addressTypeID
            }
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
            setMessage({value: "Adres został zmieniony", type: 'success', bool: true})
            setIsModal(false)
        }else if(success === false){
            setMessage({value: "Błąd podczas zmiany adresu", type: 'error', bool: true})
            setIsModal(false)
        }
    },[success])
    useEffect(() => {
        getCities(setCities)
    },[])
    return(
        <Modal animationType="fade" transparent={true} visible={isModal} onRequestClose={() => {setIsModal(false);}}>
        <View style={{ flex: 1, backgroundColor: COLORS.primary,padding: 20, alignItems: 'center',paddingBottom: 60 }}>
        <ScrollView width='100%'>
            <Column width='100%'>
                <Row justifyContent='flex-start' alignItems='center' marginBottom={3}>
                    <Pressable onPress={() => setIsModal(false)}>
                        <IonIcons name="arrow-back-outline" color='white' size={26} />
                    </Pressable>
                </Row>
                {editedAddress &&
                <>
                <Text color='white' fontWeight={600} fontSize={24} marginBottom={3}>Adres {editedAddress.addressTypeID === 1 ? 'zamieszkania' : 'korespondencji'}</Text>
                <TextInput value={editedAddress.street} onChangeText={(text) => setEditedAddress({ ...editedAddress, street: text })} placeholder="Ulica" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
                <TextInput value={editedAddress.streetNumber} onChangeText={(text) => setEditedAddress({ ...editedAddress, streetNumber: text })} placeholder="Numer ulicy" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.streetNumber && <Text style={styles.errorText}>{errors.streetNumber}</Text>}
                <TextInput value={editedAddress.houseNumber} onChangeText={(text) => setEditedAddress({ ...editedAddress, houseNumber: text })} placeholder="Numer domu" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.houseNumber && <Text style={styles.errorText}>{errors.houseNumber}</Text>}
                <TextInput value={editedAddress.postcode} onChangeText={(text) => setEditedAddress({ ...editedAddress, postcode: text })} placeholder="Kod pocztowy" style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                {errors.postcode && <Text style={styles.errorText}>{errors.postcode}</Text>}
                <Select marginY={2} placeholderTextColor={COLORS.triary} color='white' fontSize={14} borderWidth={2} backgroundColor={COLORS.secondary} borderColor={COLORS.triary} borderRadius={10} flex={1} selectedValue={editedAddress?.cityID} width='100%' placeholder="Wybierz miasto" onValueChange={(value) => {setEditedAddress({ ...editedAddress, cityID: value })}}>
                  {cities?.map((item,index) => {
                    return (
                        <Select.Item key={index} label={item.name} value={item.id} />  
                    )
                  })}
                </Select>
                {errors.cityID && <Text style={styles.errorText}>{errors.cityID}</Text>}
                <TextInput editable={false} value={editedAddress.countryName} style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
                <Pressable onPress={() => handleSubmit()} style={{borderRadius: 8, padding: 10, width: '100%', backgroundColor: COLORS.accent, marginTop: 5}}>
                    {loading ? <ActivityIndicator size='small' color='white' /> :
                    <Text color='white' fontWeight={500} fontSize={16} textAlign='center'>Zapisz</Text>}
                </Pressable>
                </>
                }
                </Column>
            </ScrollView>
        </View> 
    </Modal>  
    )
}