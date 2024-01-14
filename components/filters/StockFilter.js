import { Checkbox, Column, Text } from "native-base";
import { COLORS } from "../../styles/constants";
import { Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useEffect, useState } from "react";
import { getAvailabilities } from "../../api/DictionaryAPI";

export default function StockFilter({filtersOpen,setFiltersOpen, filterElements, setFilterElements}){
    const [data, setData] = useState([])
    const handleCheckboxPress = (stockId) => {
        const isSelected = filterElements.stock.includes(`&AvailabilitiesIds=${stockId}`);
        if (isSelected) {
          setFilterElements((prevValues) => ({
            ...prevValues,
            stock: prevValues.stock.replace(`&AvailabilitiesIds=${stockId}`, ''),
        }));
        } else {
          setFilterElements((prevValues) => ({
            ...prevValues,
            stock: `${prevValues.stock}&AvailabilitiesIds=${stockId}`,
        }));
        }
      };
    useEffect(() =>{
        getAvailabilities(setData)
    },[])
    return(
        <Column marginBottom={4} borderWidth={2} borderColor={COLORS.triary} bg={COLORS.secondary} borderRadius={8} width='100%'>
            <Pressable onPress={() => setFiltersOpen({ ...filtersOpen, stock: !filtersOpen.stock })} style={{width: '100%',borderBottomWidth: filtersOpen.stock ? 2 : 0,borderColor: COLORS.triary, paddingHorizontal: 14, paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text fontWeight={500} fontSize={18} color='white'>Dostępność</Text>
                <Ionicons name='chevron-down' color='white' size={18} />
            </Pressable>
            {filtersOpen.stock &&
            <Column width='100%' paddingX={4} paddingY={3}>
                <Checkbox.Group accessibilityLabel="Wybierz dostępność książki">
                {data?.map((item,index) => {
                    return(
                        <BouncyCheckbox
                        isChecked={filterElements.stock.includes(`&AvailabilitiesIds=${item.id}`)}
                        onPress={() => {handleCheckboxPress(item.id)}}
                        key={index}
                        size={20}
                        fillColor={COLORS.accent}
                        unfillColor="#ffffff"
                        text={item.name}
                        marginBottom={8}
                        textStyle={{
                            color: 'white',
                            textDecorationLine: 'none'
                        }}
                        iconStyle={{
                            borderRadius: 4
                        }}
                        innerIconStyle={{
                            borderRadius: 4
                        }}
                        />
                    )
                })}
                </Checkbox.Group>
            </Column>
            }
        </Column>
    )
}