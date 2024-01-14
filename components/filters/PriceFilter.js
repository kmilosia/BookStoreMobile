import { Column, Row, Text } from "native-base";
import { COLORS } from "../../styles/constants";
import { Pressable, StyleSheet, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function PriceFilter({filtersOpen,setFiltersOpen, filterElements, setFilterElements}){
    const style = StyleSheet.create({
        inputStyle: {
            width: '48%',
            color: 'white',
            backgroundColor: COLORS.primary,
            paddingVertical: 5,
            paddingHorizontal: 10, 
            borderRadius: 8,
            borderWidth: 2,
            borderColor: COLORS.border
        }
    })
    return(
        <Column marginBottom={4} borderWidth={2} borderColor={COLORS.triary} bg={COLORS.secondary} borderRadius={8} width='100%'>
            <Pressable onPress={() => setFiltersOpen({ ...filtersOpen, price: !filtersOpen.price })} style={{width: '100%',borderBottomWidth: filtersOpen.price ? 2 : 0,borderColor: COLORS.triary, paddingHorizontal: 14, paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text fontWeight={500} fontSize={18} color='white'>Cena</Text>
                <Ionicons name='chevron-down' color='white' size={18} />
            </Pressable>
            {filtersOpen.price &&
            <Column width='100%' paddingX={4} paddingY={3}>
                <Row width='100%' maxWidth='100%' justifyContent='space-between'>
                    <TextInput style={style.inputStyle} placeholderTextColor={COLORS.light} keyboardType="numeric" onChangeText={(text) => {setFilterElements((prevValues) => ({...prevValues, minPrice: text,}));}} value={filterElements.minPrice} placeholder="Cena od"/>
                    <TextInput style={style.inputStyle} placeholderTextColor={COLORS.light} keyboardType="numeric" onChangeText={(text) => {setFilterElements((prevValues) => ({...prevValues, maxPrice: text,}));}} value={filterElements.maxPrice} placeholder="Cena do"/>
                </Row>
            </Column>
            }
        </Column>
    )
}