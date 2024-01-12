import { AspectRatio, Box, Column, Image, Row, Text } from "native-base"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/constants";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductElement ({item}) {
    const navigation = useNavigation()
    return(
        <Pressable onPress={() => navigation.navigate('Product',{bookID: item.id})} style={{padding: 5, width: '50%'}}>
        <Column rounded='lg' bg={COLORS.primary} borderWidth={2} borderColor={COLORS.border} padding={3}>
            <AspectRatio ratio={3/4} width='100%'>
                <Image source={{uri: item.imageURL}} rounded='lg' alt='Image Book Cover' />
            </AspectRatio>
            <Text fontWeight='bold' fontSize={14} marginTop={2} lineHeight={16} color='white'>{item.title}</Text>
            <Text fontSize={12} fontWeight='light' color='white'>{item.authors?.map((item) => {return (item.name + " " + item.surname )})}</Text>
            <Text color='white' fontSize={12} fontWeight='bold'>{item.formName === 'Book' ? 'Książka' : 'Ebook'}</Text>
            <Row justifyContent='space-between' alignItems='center' marginTop={3}>
                <Text fontSize={16} fontWeight='bold' color='white'>{item.price?.toFixed(2)}zł</Text>
                <Row alignItems='center'>
                    <FontAwesome name='star' size={18} color='gold' />
                    <Text color='white' marginLeft={1}>{item.score}</Text>
                </Row>
            </Row>
        </Column>
        </Pressable>
    )
}