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
            borderRadius: 50,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'gray',
            paddingVertical: 6,
            paddingHorizontal: 20,
            marginRight: 5,
        },
        buttonText: {
            fontWeight: 500,
            color: 'white'
        }
    })
    return (
        <View>
            <Row justifyContent='space-between' alignItems='flex-end' marginTop={5} paddingX={2}>
                <Text color='white' fontSize={18} fontWeight='semibold'>Kategorie</Text>
                <Pressable onPress={() => navigation.navigate("Categories")}><Text color='gray.400' fontSize={12} fontWeight={300}>Zobacz wszystko</Text></Pressable>
            </Row>
            <ScrollView horizontal marginTop={8} marginBottom={8} style={{paddingHorizontal: 5}}>
                <Row>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <Pressable onPress={() => {setSelectedCategory(null); setLoading(true)}} style={[styles.button,{backgroundColor: selectedCategory === null ? COLORS.accent : COLORS.secondary, borderColor: selectedCategory === null ? COLORS.accent : COLORS.border }]} >
                        <Text style={styles.buttonText}>Wszystkie</Text>
                    </Pressable>
                </View>
                {categories?.slice(0,10).map((item,index) => {
                    return(
                        <View key={index} style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Pressable onPress={() => {setSelectedCategory(item.id); setLoading(true)}} style={[styles.button,{backgroundColor: selectedCategory === item.id ? COLORS.accent : COLORS.secondary, borderColor: selectedCategory === item.id ? COLORS.accent : COLORS.border }]}>
                                <Text style={styles.buttonText}>{item.name}</Text>
                            </Pressable>
                        </View>
                    )
                })}
                </Row>
            </ScrollView>
            {loading ?
                <View style={{ marginTop: 50 }}>
                    <ActivityIndicator size='medium' color={COLORS.accent} />
                </View>
                :
                <Column>
                <Row justifyContent='space-between' flexWrap='wrap'>
                {books?.slice(0,6).map((item,index) => {
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