import { Modal, Pressable, ScrollView } from "react-native";
import { COLORS, screenWidth, styles } from "../../styles/constants";
import { Center, Column, Row, Text, View } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { getDeliveryMethods } from "../../api/DictionaryAPI";
import RadioButtonRN from "radio-buttons-react-native";

export default function DeliveryModal ({isDeliveryOpen, setIsDeliveryOpen,setSelectedDeliveryMethod}){
    const [data, setData] = useState([])
    const [checkboxData, setCheckboxData] = useState([])
    const [selected, setSelected] = useState({})
    const [error, setError] = useState(null)
    useEffect(() => {
        getDeliveryMethods(setData)
    },[])
    useEffect(() => {
        if(data.length > 0){
            const newData = data.slice(1).map((item) => ({
                label: item.name,
                value: item
            }))
            setCheckboxData(newData) 
        }
    },[data])
    const handleSubmit = () => {
        if(Object.keys(selected).length > 0){
            setSelectedDeliveryMethod(selected)
            setIsDeliveryOpen(false)
        }else{
            setError('Wybierz dostawę!')
        }
    }
    return(
        <Modal animationType="fade" transparent={true} visible={isDeliveryOpen} onRequestClose={() => {setIsDeliveryOpen(false);}}>
            <View style={{ flex: 1, backgroundColor: COLORS.primary,padding: 20, alignItems: 'center',paddingBottom: 60 }}>
            <ScrollView width='100%'>
                <Column width='100%'>
                    <Row justifyContent='flex-start' alignItems='center' marginBottom={3}>
                        <Pressable onPress={() => setIsDeliveryOpen(false)}>
                            <Ionicons name="arrow-back-outline" color='white' size={26} />
                        </Pressable>
                    </Row>
                    <Text color='white' fontWeight={600} fontSize={24} marginBottom={3}>Sposoby dostawy</Text>
                     <RadioButtonRN
                     data={checkboxData}
                     selectedBtn={(e) => setSelected(e.value)}
                     boxDeactiveBgColor={COLORS.primary}
                     textColor='white'
                     activeColor={COLORS.accent}
                     deactiveColor={COLORS.border}
                     />
                    {error && <Text style={styles.errorText}>{error}</Text>}
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