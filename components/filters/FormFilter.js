import { Checkbox, Column, Text } from "native-base";
import { useEffect, useState } from "react";
import { getForms } from "../../api/DictionaryAPI";
import { COLORS } from "../../styles/constants";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function FormFilter () {
    const [data, setData] = useState([])
    const [groupValues, setGroupValues] = useState([])
    useEffect(() =>{
        getForms(setData)
    },[])
    return (
        <Column>
            <Checkbox.Group onToggle={setGroupValues} value={groupValues} accessibilityLabel="Wybierz formę książki">
            {data?.map((item,index) => {
                return(
                    <BouncyCheckbox
                    key={index}
                    size={20}
                    fillColor="#c084fc"
                    unfillColor="#ffffff"
                    text={item.name}
                    />
                    // <Checkbox onChange={() => {console.log('Hello')}} colorScheme='purple' key={index} value={item.id} my={2}><Text color='white'>{item.name}</Text></Checkbox>
                )
            })}
            </Checkbox.Group>
        </Column>
    )
}