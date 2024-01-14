import { Column, Text } from "native-base";
import { COLORS } from "../../styles/constants";
import { Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useEffect, useState } from "react";
import { getAuthors } from "../../api/DictionaryAPI";

export default function AuthorFilter({filtersOpen,setFiltersOpen, filterElements, setFilterElements}){
    const [data, setData] = useState([])
    const handleCheckboxPress = (authorId) => {
        const isSelected = filterElements.author.includes(`&AuthorIds=${authorId}`);
        if (isSelected) {
          setFilterElements((prevValues) => ({
            ...prevValues,
            author: prevValues.author.replace(`&AuthorIds=${authorId}`, ''),
        }));
        } else {
          setFilterElements((prevValues) => ({
            ...prevValues,
            author: `${prevValues.author}&AuthorIds=${authorId}`,
        }));
        }
      };
    useEffect(() =>{
        getAuthors(setData)
    },[])
    return(
        <Column marginBottom={4} borderWidth={2} borderColor={COLORS.triary} bg={COLORS.secondary} borderRadius={8} width='100%'>
            <Pressable onPress={() => setFiltersOpen({ ...filtersOpen, author: !filtersOpen.author })} style={{width: '100%',borderBottomWidth: filtersOpen.author ? 2 : 0,borderColor: COLORS.triary, paddingHorizontal: 14, paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text fontWeight={500} fontSize={18} color='white'>Autor</Text>
                <Ionicons name='chevron-down' color='white' size={18} />
            </Pressable>
            {filtersOpen.author &&
            <Column width='100%' paddingX={4} paddingY={3}>
                {data?.map((item,index) => {
                    return(
                        <BouncyCheckbox
                        isChecked={filterElements.author.includes(`&AuthorIds=${item.id}`)}
                        onPress={() => {handleCheckboxPress(item.id)}}
                        key={index}
                        size={20}
                        fillColor={COLORS.accent}
                        unfillColor="#ffffff"
                        text={item.name + " " + item.surname}
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