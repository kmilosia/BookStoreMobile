import { Column, Row, Text, View } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView } from "react-native";
import { getNewsByAmount } from "../api/NewsAPI";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeNews ({navigation}) {
    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState([])
    useEffect(() => {
        getNewsByAmount(5, setNews, setLoading)
    },[])
    return (
        <Column>
            <Row justifyContent='space-between' alignItems='flex-end' marginTop={3} marginBottom={2} paddingX={2}>
                <Text color='white' fontSize={18} fontWeight='semibold'>Najnowsze wiadomości</Text>
                <Pressable onPress={() => navigation.navigate("News")}><Text color='gray.400' fontSize={12} fontWeight={300}>Zobacz wszystko</Text></Pressable>
            </Row>
            {loading ? <ActivityIndicator size='small' color='white' /> :
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ flex: 0, paddingHorizontal: 5}}>
                {news?.map((item,index) => {
                    return (
                        <Pressable key={index} onPress={() => navigation.navigate('NewsDetails', {id: item.id})}>
                        <View width={300} marginRight={5} height={200} position='relative' style={{borderRadius: 8}}>
                            <Image style={{position: 'absolute', zIndex: 10, borderRadius: 8 }} width={300} height={200} source={{uri: item.imageURL}} alt={item.imageTitle}/>
                            <LinearGradient style={{position: 'absolute', zIndex: 20, width: 300, height: 200, borderRadius: 8 }} colors={['#ffffff00', '#000']}/>
                            <Row zIndex={30} justifyContent='flex-start' alignItems='flex-end' width={300} height={200} padding={4}>
                                <Text color='white' fontSize={16} fontWeight={500} >{item.topic}</Text>
                            </Row>
                        </View>
                        </Pressable>
                    )
                })}
                </ScrollView>}
        </Column>
    )
}