import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView } from "react-native";
import { getSimilarBooks } from "../api/BooksAPI";
import { Column, Row, Text, View } from "native-base";
import { COLORS } from "../styles/constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

export default function BooksCarousel ({id}){
    const navigation = useNavigation()
    const [books, setBooks] = useState([])
    useEffect(() => {
        getSimilarBooks(id, setBooks)
    },[])
    return (
        <ScrollView horizontal style={{flexGrow: 0, marginTop: 10}} showsHorizontalScrollIndicator={false}>
          {books?.map((item, index) => {
            return (
            <Pressable key={index} onPress={() => navigation.push('Product',{bookID: item.id})}>
              <Column padding={4} paddingBottom={2} rounded="xl" marginRight={5} borderWidth={2} borderColor={COLORS.border}>
                <Image source={{ uri: item.imageURL }} width={180} height={240} style={{borderRadius: 8}} />
                <Text width={180} fontSize={12} color="white" fontWeight={300} marginTop={1}>{item.authors?.map((item) => {return(item.name + " " + item.surname)})}</Text>
                <Text width={180} color="white" fontWeight={600}>{item.title}</Text>
                <Row justifyContent='space-between' alignItems='center' width={180} marginTop={2}>
                <Text color="white">{item.formName === 1 ? 'Książka' : 'Ebook'}</Text>
                    <Row alignItems='center' marginY={1}>
                        <FontAwesome name="star" size={20} color='gold'/>
                        <Text color='white' marginLeft={1} fontSize={18}>{item.score != null ? (item.score % 1 === 0 ? item.score : item.score.toFixed(1)) : null}</Text>
                    </Row>
                </Row>
              </Column>
            </Pressable>
            );
          })}
        </ScrollView>
    )
}