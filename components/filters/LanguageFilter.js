import { Column, Text } from "native-base";
import { COLORS } from "../../styles/constants";
import { Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useEffect, useState } from "react";
import { getLanguage } from "../../api/DictionaryAPI";

export default function LanguageFilter({filtersOpen,setFiltersOpen, filterElements, setFilterElements}){
    const [data, setData] = useState([])
    const handleCheckboxPress = (languageId) => {
        const isSelected = filterElements.language.includes(`&LanguageIds=${languageId}`);
        if (isSelected) {
          setFilterElements((prevValues) => ({
            ...prevValues,
            language: prevValues.language.replace(`&LanguageIds=${languageId}`, ''),
        }));
        } else {
          setFilterElements((prevValues) => ({
            ...prevValues,
            language: `${prevValues.language}&LanguageIds=${languageId}`,
        }));
        }
      };
    useEffect(() =>{
        getLanguage(setData)
    },[])
    return(
        <Column marginBottom={4} borderWidth={2} borderColor={COLORS.triary} bg={COLORS.secondary} borderRadius={8} width='100%'>
            <Pressable onPress={() => setFiltersOpen({ ...filtersOpen, language: !filtersOpen.language })} style={{width: '100%',borderBottomWidth: filtersOpen.language ? 2 : 0,borderColor: COLORS.triary, paddingHorizontal: 14, paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text fontWeight={500} fontSize={18} color='white'>Język</Text>
                <Ionicons name='chevron-down' color='white' size={18} />
            </Pressable>
            {filtersOpen.language &&
            <Column width='100%' paddingX={4} paddingY={3}>
                {data?.map((item,index) => {
                    return(
                        <BouncyCheckbox
                        isChecked={filterElements.language.includes(`&LanguageIds=${item.id}`)}
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
            </Column>
            }
        </Column>
    )
}