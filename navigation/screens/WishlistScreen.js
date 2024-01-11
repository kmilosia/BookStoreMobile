import React, {useEffect, useState} from 'react';
import { View, ScrollView, Image } from 'react-native';
import { COLORS } from '../../styles/constants';
import { Box, Column, Row, Text } from 'native-base';
import { Pressable } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { deleteWishlistItem, getWishlist, getWishlistGuid } from '../../api/WishlistAPI';
import PageLoader from '../../components/loaders/PageLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WishlistScreen({ navigation }) {
    const [guid, setGuid] = useState(null)
    const [loading, setLoading] = useState(true)
    const [wishlist, setWishlist] = useState({})
    // const token = async () => {
    //     const token = await AsyncStorage.getItem
    // }
    const moveAllToCart = () => {
        
    }
    const updateWishlistAfterDelete = (id) => {
        setWishlist((prev) => {
        const updatedItems = prev.items.filter((item) => item.id !== id)
        return {
            ...prev,
            items: updatedItems,
          }
        })
      }
    const addToWishlist = (item) => {
        const cartItem = {
            title: item.bookTitle,
            authors: item.authors,
            formID: item.formId,
            imageURL: item.imageURL,
            price: item.priceBrutto,
            id: item.id,
        }
    }
    const deleteFromWishlist = (id) => {
        deleteWishlistItem(id)
        updateWishlistAfterDelete(id)
    }

    useEffect(() => {
        getWishlistGuid(setGuid)
    },[])
    useEffect(() => {
        if(guid){
            getWishlist(guid,setWishlist, setLoading)
        }
    },[guid])
    return (
        loading ?
        <PageLoader />
        :
        <>
        {wishlist.items.length > 0 ?
        <ScrollView>
            <Column bg={COLORS.primary} width='100%' height='100%' padding={3}>
                <Pressable style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.accent, borderRadius: 8, padding: 12}}>
                    <Text fontWeight={500} marginRight={1} fontSize={16} color='white'>Przenieś wszystko do koszyka</Text>
                    <IonIcons color='white' name='cart' size={18} />
                </Pressable>
                {wishlist.items.map((item,index) => {
                    return (
                        <Row key={index} marginY={3} rounded='lg' borderWidth={2} borderColor={COLORS.border} padding={3}>
                            <Image source={{uri: item.imageURL}} width={120} height={180} style={{borderRadius: 8}} />
                            <Column marginLeft={5} flexGrow={1} flex={1}>
                                <Text fontWeight={600} fontSize={16} lineHeight={18} color='white'>{item.bookTitle}</Text>
                                <Text fontWeight={300} color='white'>Author</Text>
                                <Text fontWeight={500} fontSize={12} color='white'>{item.formId === 1 ? 'Ksiażka' : 'Ebook'}</Text>
                                <Text marginTop='auto' fontWeight={600} fontSize={20} color='white'>{item.priceBrutto.toFixed(2)}zł</Text>
                            </Column>
                            <Column justifyContent='space-between' alignItems='flex-end'>
                                <Pressable onPress={() => deleteFromWishlist(item.id)}>
                                    <IonIcons name='close' color='white' size={22} />
                                </Pressable>
                                <Pressable style={{backgroundColor: COLORS.accent, borderRadius: 20, padding: 12}}>
                                    <IonIcons name='cart' color='white' size={18} />
                                </Pressable>
                            </Column>
                        </Row>
                    )
                })}
            </Column>
        </ScrollView>
        :
        <View>
        <Column padding={5} width='100%' height='100%' bg={COLORS.primary} alignItems='center' justifyContent='center'>
            <Image source={{uri: 'https://iili.io/J7bpBxs.png'}} width={200} height={200} alt='Pusta lista życzeń' />
            <Text textAlign='center' marginTop={2} color='white' fontSize={30} fontWeight={500}>Twoja lista jest pusta</Text>
            <Text textAlign='center' marginTop={2} color='white' fontSize={16} fontWeight={300}>Dodaj ulubione książki do swojej listy życzeń i zapełnij ją ulubionymi tytułami.</Text>
        </Column>
        </View>
        }
        </>
    );
}
