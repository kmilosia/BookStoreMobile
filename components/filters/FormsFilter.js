import { Checkbox, Column, Text } from "native-base";
import { COLORS } from "../../styles/constants";
import { Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useEffect, useState } from "react";
import { getForms } from "../../api/DictionaryAPI";

export default function FormsFilter({filtersOpen,setFiltersOpen, filterElements, setFilterElements}){
    const [data, setData] = useState([])
    const handleCheckboxPress = (formId) => {
        const isSelected = filterElements.form.includes(`&FormIds=${formId}`);
        if (isSelected) {
          setFilterElements((prevValues) => ({
            ...prevValues,
            form: prevValues.form.replace(`&FormIds=${formId}`, ''),
        }));
        } else {
          setFilterElements((prevValues) => ({
            ...prevValues,
            form: `${prevValues.form}&FormIds=${formId}`,
        }));
        }
        console.log(filterElements.form);
      };
    useEffect(() =>{
        getForms(setData)
    },[])
    return(
        <Column marginBottom={4} borderWidth={2} borderColor={COLORS.triary} bg={COLORS.secondary} borderRadius={8} width='100%'>
            <Pressable onPress={() => setFiltersOpen({ ...filtersOpen, form: !filtersOpen.form })} style={{width: '100%',borderBottomWidth: filtersOpen.form ? 2 : 0,borderColor: COLORS.triary, paddingHorizontal: 14, paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text fontWeight={500} fontSize={18} color='white'>Rodzaj</Text>
                <Ionicons name='chevron-down' color='white' size={18} />
            </Pressable>
            {filtersOpen.form &&
            <Column width='100%' paddingX={4} paddingY={3}>
                <Checkbox.Group accessibilityLabel="Wybierz formę książki">
                {data?.map((item,index) => {
                    return(
                        <BouncyCheckbox
                        isChecked={filterElements.form.includes(`&FormIds=${item.id}`)}
                        onPress={() => {handleCheckboxPress(item.id)}}
                        key={index}
                        size={20}
                        fillColor={COLORS.accent}
                        unfillColor="#ffffff"
                        text={item.name === 'Book' ? 'Książka' : 'Ebook'}
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