import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { getBookDetails } from "../../api/BooksAPI";
import PageLoader from "../../components/loaders/PageLoader";
import { AspectRatio, Center, Column, Image, Row, Text } from "native-base";
import { COLORS, screenHeight, screenWidth } from "../../styles/constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Pressable } from "react-native";
import { convertDateUser } from "../../utils/dateConverter";
import { getReviewsByAmount } from "../../api/ReviewsAPI";


export default function ProductScreen ({route}) {
    const bookID = route.params.bookID
    const [book, setBook] = useState({})
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getBookDetails(bookID, setBook, setLoading)
        getReviewsByAmount(bookID,setReviews,4)
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
                <Column padding={5}>
                    <Column alignItems='center'>
                    <Text color='white' textAlign='center' fontSize={30} fontWeight='bold' lineHeight={32}>{book.bookTitle}</Text>
                    <Text color='white' fontWeight='light' fontSize={20}>{book.authors?.map((item)=> {return(item.name + " " + item.surname)})}</Text>
                    <Row alignItems='center' marginY={2}>
                        <FontAwesome name="star" size={20} color='gold'/>
                        <Text color='white' marginLeft={1} fontSize={18}>{book.score}</Text>
                    </Row>
                    <Text color='white' fontSize={30} fontWeight='bold'>{book.price?.toFixed(2)}zł</Text>
                    <Pressable style={{borderRadius: 8, backgroundColor: COLORS.accent, paddingHorizontal: 22, paddingVertical: 12, marginTop: 5}}><Text fontSize={18} color='white' fontWeight='bold'>Dodaj do koszyka</Text></Pressable>
                    </Column>
                    <Column alignItems='flex-start'>
                    <Text marginTop={5} color='white' textAlign='center' fontWeight={500} fontSize={18}>O książce</Text>
                    <Row flexWrap='wrap' alignItems='flex-start'>
                        {book.formId === 1 ?
                        <>
                        <Text width='50%' marginTop={1} fontSize={14} fontWeight={500} color={COLORS.light}>Wydanie:</Text>
                        <Text textAlign='right' width='50%' marginTop={1} fontSize={14} color={COLORS.light}>{book.editionName}</Text>
                        </>
                        :
                        <>
                        <Text width='50%' marginTop={1} fontSize={14} fontWeight={500} color={COLORS.light}>Format pliku:</Text>
                        <Text textAlign='right' width='50%' marginTop={1} fontSize={14} color={COLORS.light}>{book.fileFormatName}</Text>
                        </>
                        }
                        <Text width='50%' marginTop={1} fontSize={14} fontWeight={500} color={COLORS.light}>Wydawnictwo:</Text>
                        <Text textAlign='right' width='50%' marginTop={1} fontSize={14} color={COLORS.light}>{book.publisherName}</Text>

                        <Text width='50%' marginTop={1} fontSize={14} fontWeight={500} color={COLORS.light}>Translator:</Text>
                        <Text textAlign='right' width='50%' marginTop={1} fontSize={14} color={COLORS.light}>{book.translatorName}</Text>

                        <Text width='50%' marginTop={1} fontSize={14} fontWeight={500} color={COLORS.light}>Data wydania:</Text>
                        <Text textAlign='right' width='50%' marginTop={1} fontSize={14} color={COLORS.light}>{book.releaseDate && convertDateUser(book.releaseDate)}</Text>

                        <Text width='50%' marginTop={1} fontSize={14} fontWeight={500} color={COLORS.light}>Liczba stron:</Text>
                        <Text textAlign='right' width='50%' marginTop={1} fontSize={14} color={COLORS.light}>{book.pages}</Text>

                        <Text width='50%' marginTop={1} fontSize={14} fontWeight={500} color={COLORS.light}>Język:</Text>
                        <Text textAlign='right' width='50%' marginTop={1} fontSize={14} color={COLORS.light}>{book.language}</Text>

                        <Text width='50%' marginTop={1} fontSize={14} fontWeight={500} color={COLORS.light}>Język oryginału:</Text>
                        <Text textAlign='right' width='50%' marginTop={1} fontSize={14} color={COLORS.light}>{book.originalLanguage}</Text>

                        <Text width='50%' marginTop={1} fontSize={14} fontWeight={500} color={COLORS.light}>ISBN:</Text>
                        <Text textAlign='right' width='50%' marginTop={1} fontSize={14} color={COLORS.light}>{book.isbn}</Text>

                        <Text width='50%' marginTop={1} fontSize={14} fontWeight={500} color={COLORS.light}>Autor:</Text>
                        <Text textAlign='right' width='50%' marginTop={1} fontSize={14} color={COLORS.light}>{book.authors?.map((item)=> {return(item.name + " " + item.surname)})}</Text>

                    </Row>
                    <Text marginTop={5} color='white' textAlign='center' fontWeight={500} fontSize={18}>Kategorie</Text>
                    <Row flexWrap='wrap' marginTop={1}>{book.categories?.map((item,index) => {
                        return(
                            <Row key={index} paddingX={5} paddingY={2} marginRight={2} alignItems='center' justifyContent='center' rounded='lg' bg={COLORS.accent}>
                            <Text color='white' fontWeight={500}>{item.name}</Text>
                            </Row>
                        )
                    })}</Row>

                    <Text marginTop={5} color='white' textAlign='center' fontWeight={500} fontSize={18}>Opis</Text>
                    <Text marginTop={1} fontSize={14} color={COLORS.light}>{book.description}</Text>

                    <Text marginTop={5} color='white' textAlign='center' fontWeight={500} fontSize={18}>Ocena</Text>
                    <View width='100%'>
                    <Text marginTop={1} fontSize={14} color={COLORS.light}>{book.score}</Text>

                    </View>
                    <Text marginTop={5} color='white' textAlign='center' fontWeight={500} fontSize={18}>Ostatnie recenzje</Text>
                    <Column width='100%' alignItems='center' justifyContent='center'>
                            <Image source={{uri: book.images[0].imageURL}} width={50} height={50} alt="Empty reviews"/>
                            <Text color='white'>Nie dodano jeszcze żadnych recenzji</Text>
                        </Column>
                    {/* {
                        reviews.length > 0 ? 
                        <View>

                        </View>
                        :
                        <Column width='100%' alignItems='center' justifyContent='center' height='auto'>
                            <Image src={{uri: 'https://iili.io/JT0PtrN.png'}} style={{width: 100, height: 100}} />
                            <Text color='white'>Nie dodano jeszcze żadnych recenzji</Text>
                        </Column>
                    } */}

                    </Column>
                </Column>

            </Column>
        </ScrollView>
    )
}