import { useEffect, useState } from "react";
import { ScrollView, View,StyleSheet } from "react-native";
import { getBookDetails } from "../../api/BooksAPI";
import PageLoader from "../../components/loaders/PageLoader";
import { AspectRatio, Box, Center, Column, Image, Row, Text } from "native-base";
import { COLORS, screenHeight } from "../../styles/constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Pressable } from "react-native";
import { convertDateUser } from "../../utils/dateConverter";
import { getReviewsByAmount } from "../../api/ReviewsAPI";
import { LinearGradient } from "expo-linear-gradient";
import BooksCarousel from "../../components/BooksCarousel";
import ProductScore from "../../components/ProductScore";
import { addWishlistItem } from "../../api/WishlistAPI";
import { useMessageStore } from "../../store/messageStore";
import { addToCart } from "../../utils/cart";

export default function ProductScreen ({route,navigation}) {
    const setMessage = useMessageStore((state) => state.setMessage)
    const bookID = route.params.bookID
    const [book, setBook] = useState({})
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getBookDetails(bookID, setBook, setLoading)
        getReviewsByAmount(bookID,setReviews,4)
        console.log(bookID);
    },[])
    const styles = StyleSheet.create({
        section: {
            marginVertical: 15,
            alignItems: 'flex-start',
        },
        sectionHeader: {
            color: 'white',
            textAlign: 'center',
            fontWeight: 500,
            fontSize: 20,
        },
        sectionSmallHeader: {
            width: '50%',
            marginTop: 3,
            fontWeight: 500,
            color: COLORS.light
        },
        sectionSmallText: {
            textAlign: 'right',
            width: '50%',
            marginTop: 3,
            color: COLORS.light
        }

    })
    const handleAddWishlist = () => {
        if(!book.isWishlisted){
            addWishlistItem(book.id)
            setBook({...book, isWishlisted: true})
            setMessage({value: 'Produkt dodano do listy życzeń!', type: 'success', bool: true})
        }else{
            setMessage({value: 'Produkt znajduję się juz na liście życzeń', type: 'error', bool: true})
        }
    }
    const handleAddToCart = () => {
        const cartItem = {
            title: book.bookTitle,
            authors: book.authors,
            formID: book.formId,
            imageURL: book.images[0].imageURL,
            price: book.price,
            isWishlisted: book.isWishlisted,
            id: book.id,
        }
        addToCart(cartItem)
        setMessage({value: 'Produkt dodano do koszyka!', type: 'success', bool: true})
    }
    return (
        loading ? <PageLoader /> :
        <>
        <Row position='absolute' justifyContent='space-between' width='100%' top={12} paddingX={5} zIndex={100}>
            <Pressable onPress={() => navigation.goBack()}><IonIcons style={{fontSize: 24, color: 'white'}} name="arrow-back" /></Pressable>
            <Pressable onPress={() => handleAddWishlist()}><IonIcons style={{fontSize: 24, color: 'white'}} name={book.isWishlisted ? 'heart': "heart-outline"} /></Pressable>
        </Row>
        <ScrollView>
            
            <Column bg={COLORS.primary} alignItems='center' minHeight={screenHeight + 40}>
                <View style={{position: 'relative', width: '100%', height: 600}}>
                    <Image style={{position: 'absolute', zIndex: 10 }} blurRadius={30} width='100%' height={600} resizeMode="cover" source={{uri: book.images[0].imageURL}} alt="Book Cover" />
                    <LinearGradient style={{position: 'absolute', zIndex: 20, width: '100%', height: 600, resizeMode: 'cover' }} colors={['#ffffff00', '#181826']}/>
                    <Center width='100%' height='100%'>
                        <Image style={{position: 'absolute', zIndex: 30}} width='70%' height={450} resizeMode="cover" rounded='lg' source={{uri: book.images[0].imageURL}} alt="Book Cover" />
                    </Center>
                </View>
                <Column paddingX={5}>
                    <Column alignItems='center'>
                    <Text color='white' textAlign='center' fontSize={30} fontWeight='bold' lineHeight={32}>{book.bookTitle}</Text>
                    <Text color='white' fontWeight='light' fontSize={20}>{book.authors?.map((item)=> {return(item.name + " " + item.surname)})}</Text>
                    <Row alignItems='center' marginY={1}>
                        <FontAwesome name="star" size={20} color='gold'/>
                        <Text color='white' marginLeft={1} fontSize={18}>{book.score}</Text>
                    </Row>
                    <Text color='white' fontSize={30} fontWeight='bold'>{book.price?.toFixed(2)}zł</Text>
                    <Row marginTop={3} justifyContent='space-between' width='100%' maxWidth='100%' alignItems='center' marginBottom={10}>
                        <Pressable onPress={() => handleAddToCart()} style={{borderRadius: 30,fontSize: 16, backgroundColor: COLORS.accent, paddingHorizontal: 22, paddingVertical: 12, width: book.formID === 2 ? '49%' : '100%'}}><Text textAlign='center' color='white' fontWeight='bold'>Dodaj do koszyka</Text></Pressable>
                        {book.formId === 2 && <Pressable onPress={() => navigation.navigate('Rent', {bookID: bookID})} style={{borderRadius: 30,fontSize: 16, backgroundColor: COLORS.primary, paddingHorizontal: 22, paddingVertical: 12, borderWidth: 2,width: '49%', borderColor: COLORS.accent}}><Text color={COLORS.accent} textAlign='center' fontWeight='bold'>Wypożycz</Text></Pressable>}
                    </Row>
                </Column>
                {book.images.length > 0 &&
                <Column style={styles.section}>
                    <Text style={styles.sectionHeader}>Zdjęcia</Text>
                    <ScrollView horizontal style={{flexGrow: 0, marginTop: 10}} showsHorizontalScrollIndicator={false}>
                        {book.images.map((item, index) => {
                            return(
                                <Image key={index} source={{uri: item.imageURL}} alt="Okładka" style={{marginRight: 20, borderRadius: 8}} width={200} height={300} />
                            )
                        })}
                    </ScrollView>
                </Column>
                }
                    <Column style={styles.section}>
                        <Text style={styles.sectionHeader}>O produkcie</Text>
                        <Row flexWrap='wrap' alignItems='flex-start' paddingY={1}>
                            <Text style={styles.sectionSmallHeader}>{book.formId === 1 ? 'Wydanie:' : 'Format pliku:'}</Text>
                            <Text style={styles.sectionSmallText}>{book.formId === 1 ? book.editionName : book.fileFormatName}</Text>                     
                            <Text style={styles.sectionSmallHeader}>Wydawnictwo:</Text>
                            <Text style={styles.sectionSmallText}>{book.publisherName}</Text>
                            <Text style={styles.sectionSmallHeader}>Translator:</Text>
                            <Text style={styles.sectionSmallText}>{book.translatorName}</Text>
                            <Text style={styles.sectionSmallHeader}>Data wydania:</Text>
                            <Text style={styles.sectionSmallText}>{book.releaseDate && convertDateUser(book.releaseDate)}</Text>
                            <Text style={styles.sectionSmallHeader}>Liczba stron:</Text>
                            <Text style={styles.sectionSmallText}>{book.pages}</Text>
                            <Text style={styles.sectionSmallHeader}>Język:</Text>
                            <Text style={styles.sectionSmallText}>{book.language}</Text>
                            <Text style={styles.sectionSmallHeader}>Język oryginału:</Text>
                            <Text style={styles.sectionSmallText}>{book.originalLanguage}</Text>
                            <Text style={styles.sectionSmallHeader}>ISBN:</Text>
                            <Text style={styles.sectionSmallText}>{book.isbn}</Text>
                            <Text style={styles.sectionSmallHeader}>Autor:</Text>
                            <Text style={styles.sectionSmallText}>{book.authors?.map((item)=> {return(item.name + " " + item.surname)})}</Text>
                        </Row>
                    </Column>
                    <Column style={styles.section}>
                    <Text style={styles.sectionHeader}>Kategorie</Text>
                        <Row flexWrap='wrap' marginTop={2}>{book.categories?.map((item,index) => {
                            return(
                                <Row key={index} paddingX={5} paddingY={2} marginRight={2} alignItems='center' justifyContent='center' rounded='full' bg={COLORS.accent}>
                                    <Text color='white' fontWeight={500}>{item.name}</Text>
                                </Row>
                            )
                        })}
                        </Row>
                    </Column>
                    <Column style={styles.section}>
                        <Text style={styles.sectionHeader}>Opis</Text>
                        <Text marginTop={1} color={COLORS.light}>{book.description}</Text>
                    </Column>
                    <Column style={styles.section}>
                        <Text style={styles.sectionHeader}>Ocena</Text>
                        <ProductScore score={book.score} scoreValues={book.scoreValues}/>
                    </Column>
                    <Column style={styles.section}>
                        <Row alignItems='baseline' justifyContent='space-between' width='100%' maxWidth='100%'>
                        <Text style={styles.sectionHeader}>Ostatnie recenzje</Text>
                        <Pressable onPress={() => navigation.navigate('Reviews', {bookID: bookID})}>
                        <Text style={{fontWeight: 300, fontSize: 12, color: 'white'}}>Zobacz wszystkie</Text>
                        </Pressable>
                        </Row>
                        {reviews.length > 0 ?
                        <Row width='100%' justifyContent='space-between' flexWrap='wrap' marginTop={3}>
                            {reviews.map((item,index) => {
                                return(
                                    <Column key={index} width='100%' rounded='lg' bg={COLORS.secondary} padding={5}>
                                        <Row justifyContent='space-between' alignItems='center'>
                                            <Text color='white' fontWeight={600} fontSize={16}>{item.customerName}</Text>
                                            <Row alignItems='center'>
                                                <FontAwesome name='star' size={18} color='gold' />
                                                <Text color='white' marginLeft={1}>{item.scoreValue}</Text>
                                            </Row>
                                        </Row>
                                        <Text color={COLORS.light} marginY={2}>{item.content}</Text>
                                        <Box borderWidth={0.5} marginY={2} borderColor={COLORS.border}/>
                                        <Text color={COLORS.light} fontWeight={300} fontSize={12}>{item.creationDate && convertDateUser(item.creationDate)}</Text>
                                    </Column>
                                )
                            })}
                        </Row>
                        :
                        <Column width='100%' alignItems='center' justifyContent='center' paddingX={10} paddingTop={5}>
                            <Image source={{uri: 'https://iili.io/JT0PtrN.png'}} width={100} height={100} marginY={3} alt="Empty reviews"/>
                            <Text textAlign='center' color={COLORS.light} fontSize={18} fontWeight={500}>Nie dodano jeszcze żadnych recenzji</Text>
                        </Column>
                        }
                    </Column>
                    <Column style={styles.section}>
                        <Text style={styles.sectionHeader}>Podobne produkty</Text>
                        {book.categories?.length > 0 &&
                           <BooksCarousel id={book.categories[0]?.id} />
                        }
                    </Column>
                    </Column>
                </Column>
        </ScrollView>
        </>
    )
}