import { ActivityIndicator, Image, Pressable, ScrollView, TextInput } from "react-native";
import { Column, Row, Text, View } from "native-base";
import { COLORS, styles } from "../../styles/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useMessageStore } from "../../store/messageStore";
import { addReview } from "../../api/ReviewsAPI";

export default function ReviewBookScreen({route,navigation}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const item = route.params.item
    const [inputValue, setInputValue] = useState('')
    const [score, setScore] = useState(0)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    useEffect(() => {
        if(success){
            setMessage({value: "Dodano nową recenzję książki!", type: 'success', bool: true})
            navigation.goBack()
        }else if(success === false){
            setMessage({value: "Błąd podczas dodawania recenzji!", type: 'error', bool: true})
        }
    },[success])
    const handleSubmit = () => {
        if(score < 1){
            setErrors({...errors, score: 'Ocena nie może być mniejsza od 1'})
        }else{
            const { score, ...remainingErrors } = errors
            setErrors(remainingErrors);
        }
        if(Object.keys(errors).length === 0){
            setLoading(true)
            const data = {
                content: inputValue,
                scoreId: score,
                bookItemId: item.bookItemId
            }
            addReview(data, setLoading, setSuccess)
        }        
    }
    return (
        <ScrollView>
        <Column width='100%' bg={COLORS.primary}>
        <View height={280} position='relative' width='100%'>
            <Image style={{position: 'absolute', zIndex: 10,width: '100%' }} blurRadius={20} height={280} resizeMode="cover" source={{uri: item.imageURL}} alt="Okładka książki" />
            <LinearGradient style={{position: 'absolute', zIndex: 20, width: '100%', height: 280, resizeMode: 'cover' }} colors={['#ffffff00', '#181826']}/>
            <Row width='100%' alignItems='flex-end' height='100%' position='absolute' zIndex={30} padding={5}>
                <Image height={220} width={150} style={{borderRadius: 8}} source={{uri: item.imageURL}} alt="Okładka książki" />
                <Column flexGrow={1} flex={1} marginLeft={3} justifyContent='center' height={220}>
                    <Text color='white' fontWeight={600} fontSize={20} textAlign='center' lineHeight={24}>{item.bookTitle}</Text>
                </Column>
            </Row>
        </View>
        <Column paddingX={5}>
            <Row alignItems='center' marginY={2}>
                {[...Array(5)].map((item,index) => {
                    return(
                        <FontAwesome key={index} onPress={() => {setScore(index + 1)}} name='star' size={30} color={score >= index + 1 ? 'gold' : COLORS.triary} style={{marginRight: 5}}/>
                    )
                })}
            </Row>
            <TextInput value={inputValue} onChangeText={text => setInputValue(text)} numberOfLines={4} multiline={true} textAlignVertical="top" placeholder="Treść oceny.." style={styles.inputStyle} placeholderTextColor={COLORS.triary}/>
            <Pressable onPress={() => handleSubmit()} style={{backgroundColor: COLORS.accent, padding: 12, width: '100%', borderRadius: 8, marginTop: 10, marginBottom: 5}}>
                {loading ? <ActivityIndicator size='small' color='white' /> :
                <Text color='white' textAlign='center' fontWeight={500} fontSize={16}>Dodaj ocenę</Text>}
            </Pressable>
            {errors.score && <Text style={styles.errorText}>{errors.score}</Text>}
        </Column>
    </Column>   
    </ScrollView>    
    )
}
