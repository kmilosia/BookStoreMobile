import { Checkbox, Column, Row, Text } from "native-base";
import { COLORS } from "../../styles/constants";
import { Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import StarsRow from '../../components/StarsRow'

export default function ScoreFilter({filtersOpen,setFiltersOpen, filterElements, setFilterElements}){
    const data = [
        {value: 5},
        {value: 4},
        {value: 3},
        {value: 2},
        {value: 1},
    ]
    const handleCheckboxPress = (scoreId) => {
        const isSelected = filterElements.score.includes(`&ScoreValues=${scoreId}`);
        if (isSelected) {
          setFilterElements((prevValues) => ({
            ...prevValues,
            score: prevValues.score.replace(`&ScoreValues=${scoreId}`, ''),
        }));
        } else {
          setFilterElements((prevValues) => ({
            ...prevValues,
            score: `${prevValues.score}&ScoreValues=${scoreId}`,
        }));
        }
        console.log(filterElements.score);
      };
    return(
        <Column marginBottom={4} borderWidth={2} borderColor={COLORS.triary} bg={COLORS.secondary} borderRadius={8} width='100%'>
            <Pressable onPress={() => setFiltersOpen({ ...filtersOpen, score: !filtersOpen.score })} style={{width: '100%',borderBottomWidth: filtersOpen.score ? 2 : 0,borderColor: COLORS.triary, paddingHorizontal: 14, paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text fontWeight={500} fontSize={18} color='white'>Ocena</Text>
                <Ionicons name='chevron-down' color='white' size={18} />
            </Pressable>
            {filtersOpen.score &&
            <Column width='100%' paddingX={4} paddingY={3}>
                {data.map((item,index) => {
                    return(
                    <Row marginBottom={2} key={index}>
                        <BouncyCheckbox
                                isChecked={filterElements.score.includes(`&ScoreValues=${item.value}`)}
                                onPress={() => {handleCheckboxPress(item.value)}}
                                size={20}
                                fillColor={COLORS.accent}
                                unfillColor="#ffffff"
                                textStyle={{
                                    textDecorationLine: 'none'
                                }}
                                iconStyle={{
                                    borderRadius: 4
                                }}
                                innerIconStyle={{
                                    borderRadius: 4
                                }}
                        />
                        <StarsRow value={item.value}/>
                    </Row>
                    )
                })}    
            </Column>
            }
        </Column>
    )
}