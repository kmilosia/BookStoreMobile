import { Row, Text, View } from "native-base";
import { useMessageStore } from "../../store/messageStore";
import { useEffect } from "react";

export default function Message (){
    const message = useMessageStore((state) => state.message)
    const setMessage = useMessageStore((state) => state.setMessage)
    useEffect(() => {
        if(message.bool){
            setTimeout(() => {
                setMessage({value: '', type: '', bool: false})
              }, 2000)
        }
    },[message])
    return(
        <View position='absolute' bottom={2} left={0} width='100%' padding={2} zIndex={100}>
            <Row alignItems='center' justifyContent='center' bg={message.type === "error" ? 'red.500' : 'green.500'} rounded='lg' padding={3}>
            <Text color='white' fontWeight={500} fontSize={16}>{message.value}</Text>
            </Row>
        </View>
    )
}