import { Column, Row, Text, View } from "native-base";
import { ActivityIndicator, Modal, Pressable, ScrollView, TextInput } from "react-native";
import { COLORS, screenHeight, styles } from "../../../styles/constants";
import { useEffect, useState } from "react";
import { deleteUser, getUserData } from "../../../api/UserAPI";
import PageLoader from "../../../components/loaders/PageLoader";
import { useIsFocused } from "@react-navigation/native";

export default function UserDataScreen ({navigation}){
    const isFocused = useIsFocused()
    const [deleteModal, setDeleteModal] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)
    const handleDelete = () => {
        deleteUser(setSubmitLoading)
    }
    useEffect(() => {
        getUserData(setData,setLoading)
    },[])
    return(
        loading ? <PageLoader /> :
        <ScrollView>
            <Column width='100%' bg={COLORS.primary} padding={2} minHeight={screenHeight - 70}>
                <Column marginX={2} marginBottom={2}>
                    <Text color='white'>Imię:</Text>
                    <TextInput editable={false} value={data.name} style={[styles.inputStyle, {color: COLORS.triary}]} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text color='white'>Nazwisko:</Text>
                    <TextInput editable={false} value={data.surname} style={[styles.inputStyle, {color: COLORS.triary}]} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text color='white'>Nazwa użytkownika:</Text>
                    <TextInput editable={false} value={data.username} style={[styles.inputStyle, {color: COLORS.triary}]} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text color='white'>Adres email:</Text>
                    <TextInput editable={false} value={data.email} style={[styles.inputStyle, {color: COLORS.triary}]} />
                </Column>
                <Column marginX={2} marginBottom={2}>
                    <Text color='white'>Numer telefonu:</Text>
                    <TextInput editable={false} value={data.phoneNumber} style={[styles.inputStyle, {color: COLORS.triary}]} />
                </Column>
                <Pressable onPress={() => navigation.navigate('EditUserData')} style={{backgroundColor: COLORS.accent, borderRadius: 10, width: '47%', padding: 10, marginTop: 10, marginLeft: 10}}>
                    <Text color='white' textAlign='center' fontSize={16} fontWeight={500}>Edytuj dane</Text>
                </Pressable>
                <Row padding={0} marginTop='auto' width='100%'>
                    <Pressable onPress={() => navigation.navigate('ChangePassword')} style={{borderWidth: 2, borderColor: COLORS.accent, borderRadius: 10, width: '47%', padding: 10, marginTop: 10, marginLeft: 10}}>
                        <Text color={COLORS.accent} textAlign='center' fontSize={16} fontWeight={500}>Zmień hasło</Text>
                    </Pressable>
                    <Pressable onPress={() => setDeleteModal(true)} style={{borderWidth: 2, borderColor: COLORS.red, borderRadius: 10, width: '47%', padding: 10, marginTop: 10, marginLeft: 10}}>
                        <Text color={COLORS.red} textAlign='center' fontSize={16} fontWeight={500}>Usuń konto</Text>
                    </Pressable>
                </Row>
            </Column>
            <Modal animationType='fade' transparent={true} visible={deleteModal} onRequestClose={() => {setDeleteModal(false)}}>
                <View bg='rgba(0,0,0,0.7)' flex={1} alignItems='center' justifyContent='center'>
                <View rounded='lg' bg={COLORS.secondary} width='90%' padding={10} alignItems='center' justifyContent='center'>
                    <Text textAlign='center' color='white' fontWeight={500} fontSize={18}>Czy napewno chcesz usunąć konto?</Text>
                    <Row width='100%' marginTop={2}>
                        <Pressable onPress={() => handleDelete()} style={{borderWidth: 2, borderColor: COLORS.red,backgroundColor: COLORS.red, borderRadius: 10, width: '47%', padding: 10, marginTop: 10, marginLeft: 10}}>
                            {submitLoading ? <ActivityIndicator size='small' color='white' /> :
                            <Text color='white' textAlign='center' fontSize={16} fontWeight={500}>Usuń konto</Text>}
                        </Pressable>
                        <Pressable onPress={() => setDeleteModal(false)} style={{borderWidth: 2, borderColor: COLORS.accent, borderRadius: 10, width: '47%', padding: 10, marginTop: 10, marginLeft: 10}}>
                        <Text color={COLORS.accent} textAlign='center' fontSize={16} fontWeight={500}>Anuluj</Text>
                        </Pressable>
                    </Row>
                </View>
                </View>
            </Modal>
        </ScrollView>
    )
}