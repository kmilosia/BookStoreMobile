import { Column, Row, Text } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, View,Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS } from "../styles/constants";
import { getCategories } from "../api/DictionaryAPI";
import { getAllBooks, getBooksByCategory } from "../api/BooksAPI";
import ProductElement from "./ProductElement";

export default function HomeProducts ({navigation}) {
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(null)
      useEffect(() => {
        getAllBooks(setBooks, setLoading)
        getCategories(setCategories)
      },[])
      useEffect(() => {
        if(!selectedCategory){
            getAllBooks(setBooks, setLoading)
        }else{
            getBooksByCategory(selectedCategory,setBooks, setLoading)
        }
      },[selectedCategory])
    const styles = StyleSheet.create({
        button: {
            borderRadius: 8,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'gray',
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginRight: 5,
        },
        buttonText: {
        }
    })
    return (
        <View>
            <Row justifyContent='space-between' alignItems='center' marginTop={3}>
                <Text color='white' fontSize={20} fontWeight='semibold'>Kategorie</Text>
                <Pressable onPress={() => navigation.navigate("Categories")}><Text color='purple.400' fontWeight='semibold'>Zobacz wszystko</Text></Pressable>
            </Row>
            <ScrollView horizontal marginTop={5} marginBottom={5}>
                <Row>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <Pressable onPress={() => {setSelectedCategory(null); setLoading(true)}} style={[styles.button,{backgroundColor: selectedCategory === null ? COLORS.accent : COLORS.secondary, borderColor: selectedCategory === null ? COLORS.accent : COLORS.triary }]} >
                        <Text style={[styles.buttonText,{color: 'white' }]}>Wszystkie</Text>
                    </Pressable>
                </View>
                {categories?.slice(0,10).map((item,index) => {
                    return(
                        <View key={index} style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Pressable onPress={() => {setSelectedCategory(item.id); setLoading(true)}} style={[styles.button,{backgroundColor: selectedCategory === item.id ? COLORS.accent : COLORS.secondary, borderColor: selectedCategory === item.id ? COLORS.accent : COLORS.triary }]}>
                                <Text style={[styles.buttonText,{color: 'white' }]}>{item.name}</Text>
                            </Pressable>
                        </View>
                    )
                })}
                </Row>
            </ScrollView>
            {loading ?
                <View style={{ marginTop: 20 }}>
                    <ActivityIndicator size='medium' color={COLORS.accent} />
                </View>
                :
                <Column>
                <Row justifyContent='space-between' flexWrap='wrap'>
                {books?.map((item,index) => {
                    return (
                        <ProductElement item={item} key={index} />                    
                    )
                })}
                </Row>
                </Column>
            }
        </View>
    )
}