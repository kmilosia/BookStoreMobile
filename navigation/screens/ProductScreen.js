import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { getBookDetails } from "../../api/BooksAPI";
import PageLoader from "../../components/loaders/PageLoader";
import { AspectRatio, Center, Column, Image, Row, Text } from "native-base";
import { COLORS, screenWidth } from "../../styles/constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Pressable } from "react-native";


export default function ProductScreen ({route}) {
    const bookID = route.params.bookID
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getBookDetails(bookID, setBook, setLoading)
    },[])

    return (
        loading ? <PageLoader /> :

        <ScrollView>
            <Column bg='white' alignItems='center'>
                <View style={{position: 'relative', width: '100%', height: 600}}>
                    <Image style={{position: 'absolute', zIndex: 10 }} blurRadius={10} width='100%' height={600} resizeMode="cover" source={{uri: book.images[0].imageURL}} alt="Book Cover" />
                    <Center width='100%' height='100%'>
                        <Image style={{position: 'absolute', zIndex: 20}} width='60%' height={400} resizeMode="cover" rounded='lg' source={{uri: book.images[0].imageURL}} alt="Book Cover" />
                    </Center>
                    <Row style={{position: 'absolute', bottom: -20, zIndex: 30, width: '100%'}}>
                        <Center width='100%' display='flex' flexDirection='row'>
                        <Pressable style={{backgroundColor: 'black', height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, paddingRight: 3, marginRight: 4}}><FontAwesome color='white' name="angle-left" size={30} /></Pressable>
                        <Pressable style={{backgroundColor: 'black', height: 50, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, paddingLeft: 3, marginLeft: 4}}><FontAwesome color="white" name="angle-right" size={30} /></Pressable>
                        </Center>
                    </Row>
                </View>
                {/* <AspectRatio ratio={4/6} width="100%">
                    <Image resizeMode="cover" source={{uri: book.images[0].imageURL}} alt="Book Cover" />
                </AspectRatio> */}
                <Column padding={3} alignItems='center' marginTop={5}>
                    <Text textAlign='center' fontSize={28} fontWeight='bold' lineHeight={26}>{book.bookTitle}</Text>
                    <Text fontWeight='light' fontSize={20}>{book.authors?.map((item)=> {return(item.name + " " + item.surname)})}</Text>
                    <Row alignItems='center' marginY={2}>
                        <FontAwesome name="star" size={20} color='gold'/>
                        <Text marginLeft={1} fontSize={18}>{book.score}</Text>
                    </Row>
                    <Pressable style={{borderRadius: 20, backgroundColor: COLORS.accent, paddingHorizontal: 20, paddingVertical: 10}}><Text fontSize={20} color='white' fontWeight='bold'>Dodaj do koszyka</Text></Pressable>
                    
                </Column>

            </Column>
        </ScrollView>
    )
}