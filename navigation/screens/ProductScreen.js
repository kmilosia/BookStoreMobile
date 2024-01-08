import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { getBookDetails } from "../../api/BooksAPI";
import PageLoader from "../../components/loaders/PageLoader";
import { AspectRatio, Center, Column, Image, Row, Text } from "native-base";
import { COLORS, screenHeight, screenWidth } from "../../styles/constants";
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
            <Column bg={COLORS.primary} alignItems='center' minHeight={screenHeight + 40}>
                <View style={{position: 'relative', width: '100%', height: 600}}>
                    <Image style={{position: 'absolute', zIndex: 10 }} blurRadius={10} width='100%' height={600} resizeMode="cover" source={{uri: book.images[0].imageURL}} alt="Book Cover" />
                    <Center width='100%' height='100%'>
                        <Image style={{position: 'absolute', zIndex: 20}} width='60%' height={400} resizeMode="cover" rounded='lg' source={{uri: book.images[0].imageURL}} alt="Book Cover" />
                    </Center>
                </View>
                {/* <AspectRatio ratio={4/6} width="100%">
                    <Image resizeMode="cover" source={{uri: book.images[0].imageURL}} alt="Book Cover" />
                </AspectRatio> */}
                <Column padding={8}>
                    <Column alignItems='center'>
                    <Text color='white' textAlign='center' fontSize={30} fontWeight='bold' lineHeight={32}>{book.bookTitle}</Text>
                    <Text color='white' fontWeight='light' fontSize={20}>{book.authors?.map((item)=> {return(item.name + " " + item.surname)})}</Text>
                    <Row alignItems='center' marginY={2}>
                        <FontAwesome name="star" size={20} color='gold'/>
                        <Text color='white' marginLeft={1} fontSize={18}>{book.score}</Text>
                    </Row>
                    <Pressable style={{borderRadius: 8, backgroundColor: COLORS.accent, paddingHorizontal: 22, paddingVertical: 12, marginTop: 5}}><Text fontSize={18} color='white' fontWeight='bold'>Dodaj do koszyka</Text></Pressable>
                    </Column>
                    <Column alignItems='flex-start'>
                    <Text color='white' textAlign='center' fontWeight={500} fontSize={18}>O książce</Text>
                    <Text color='white' textAlign='center' fontWeight={500} fontSize={18}>Opis</Text>
                    <Text textAlign='center' fontSize={14} color={COLORS.light}>{book.description}</Text>
                    </Column>
                </Column>

            </Column>
        </ScrollView>
    )
}