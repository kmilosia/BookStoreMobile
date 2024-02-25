import { useEffect, useState } from "react"
import PageLoader from "../../components/loaders/PageLoader"
import { Image, Pressable, ScrollView } from "react-native"
import { Text, Column, Row, View } from "native-base"
import { getNews, getNewsByAmount } from "../../api/NewsAPI"
import { LinearGradient } from "expo-linear-gradient"
import { COLORS } from "../../styles/constants"

export default function NewsScreen ({navigation}){
    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState([])
    const [firstNews, setFirstNews] = useState({})
    const [loadAll, setLoadAll] = useState(false)
    const [allNews, setAllNews] = useState([])
    useEffect(() => {
        getNewsByAmount(5,setNews, setLoading)
    },[])
    useEffect(() => {
        const item = news.length > 0 ? news[0] : null;
        setFirstNews(item)
      },[news])
      useEffect(() => {
        if(loadAll){
            getNews(setAllNews)
        }
      },[loadAll])
    return(
        loading ? <PageLoader /> :
        <ScrollView>
            <Column width='100%' bg={COLORS.primary} padding={2}>
                {Object.keys(firstNews).length > 0 &&
                <Pressable onPress={() => navigation.navigate('NewsDetails', {id: firstNews.id})}>
                 <View position='relative' width='100%' height={300} style={{borderRadius: 8}}>
                    <Image style={{position: 'absolute', zIndex: 10,borderRadius: 8, width: '100%' }} height={300} source={{uri: firstNews.imageURL}} alt={firstNews.imageTitle}/>
                    <LinearGradient style={{position: 'absolute', zIndex: 20, width: '100%', height: 300,borderRadius: 8 }} colors={['#ffffff00', '#000']}/>
                    <Row zIndex={30} justifyContent='flex-start' alignItems='flex-end' width='100%' height={300} padding={4}>
                        <Text color='white' fontSize={22} fontWeight={500}>{firstNews.topic}</Text>
                    </Row>
                </View>
                </Pressable>
                }
                <Text color={COLORS.light} fontWeight={600} fontSize={18} marginTop={4} marginBottom={2} marginLeft={2}>Najnowsze wiadomości</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{flexGrow: 1, flex: 1, paddingHorizontal: 5}}>
                {news?.slice(1).map((item,index) => {
                    return (
                        <Pressable key={index} onPress={() => navigation.navigate('NewsDetails', {id: item.id})}>
                        <View width={300} marginRight={5} height={200} position='relative' style={{borderRadius: 8}}>
                            <Image style={{position: 'absolute', zIndex: 10, borderRadius: 8 }} width={300} height={200} source={{uri: item.imageURL}} alt={item.imageTitle}/>
                            <LinearGradient style={{position: 'absolute', zIndex: 20, width: 300, height: 200, borderRadius: 8 }} colors={['#ffffff00', '#000']}/>
                            <Row zIndex={30} justifyContent='flex-start' alignItems='flex-end' width={300} height={200} padding={4}>
                                <Text color='white' fontSize={14} fontWeight={500} >{item.topic}</Text>
                            </Row>
                        </View>
                        </Pressable>
                    )
                })}
                </ScrollView>
                <Text color={COLORS.light} fontWeight={600} fontSize={18} marginTop={4} marginBottom={2} marginLeft={2}>Wszystkie wiadomości</Text>
                <Column width='100%' paddingX={2}>
                {news?.map((item,index) => {
                    return (
                        <Pressable key={index} onPress={() => navigation.navigate('NewsDetails', {id: item.id})}>
                        <View width='100%' marginBottom={4} height={200} position='relative' style={{borderRadius: 8}}>
                            <Image style={{position: 'absolute', zIndex: 10, borderRadius: 8,width: '100%' }} height={200} source={{uri: item.imageURL}} alt={item.imageTitle}/>
                            <LinearGradient style={{position: 'absolute', zIndex: 20, width: '100%', height: 200, borderRadius: 8 }} colors={['#ffffff00', '#000']}/>
                            <Row zIndex={30} justifyContent='flex-start' alignItems='flex-end' width='100%' height={200} padding={4}>
                                <Text color='white' fontSize={16} fontWeight={500} >{item.topic}</Text>
                            </Row>
                        </View>
                        </Pressable>
                    )
                })}
                {!loadAll &&
                <Pressable onPress={() => {setLoadAll(true)}} style={{marginBottom: 5}}>
                    <Text textAlign='center' color={COLORS.accent}>Załaduj wszystkie wiadomości...</Text>
                </Pressable>
                }
                 {allNews.length > 0 && allNews.slice(5).map((item,index) => {
                    return (
                        <Pressable key={index} onPress={() => navigation.navigate('NewsDetails', {id: item.id})}>
                        <View width='100%' marginBottom={4} height={200} position='relative' style={{borderRadius: 8}}>
                            <Image style={{position: 'absolute', zIndex: 10, borderRadius: 8, width: '100%' }} height={200} source={{uri: item.imageURL}} alt={item.imageTitle}/>
                            <LinearGradient style={{position: 'absolute', zIndex: 20, width: '100%', height: 200, borderRadius: 8 }} colors={['#ffffff00', '#000']}/>
                            <Row zIndex={30} justifyContent='flex-start' alignItems='flex-end' width='100%' height={200} padding={4}>
                                <Text color='white' fontSize={16} fontWeight={500} >{item.topic}</Text>
                            </Row>
                        </View>
                        </Pressable>
                    )
                })}
                </Column>
            </Column>
        </ScrollView>
    )
}