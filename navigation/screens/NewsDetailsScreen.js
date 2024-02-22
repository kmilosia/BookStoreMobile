import { useEffect, useState } from "react"
import PageLoader from "../../components/loaders/PageLoader"
import { Image, ScrollView } from "react-native"
import { Text, Column, Row } from "native-base"
import { getNewsDetails } from "../../api/NewsAPI"
import { COLORS } from "../../styles/constants"
import { convertDateUser } from "../../utils/dateConverter"

export default function NewsDetailsScreen ({route}){
    const id = route.params.id
    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState({})
    useEffect(() => {
        getNewsDetails(id,setNews, setLoading)
    },[])
    return(
        loading ? <PageLoader /> :
        <ScrollView>
            <Column width='100%' bg={COLORS.primary}>
                {Object.keys(news).length > 0 &&
                <>
                <Image style={{width: '100%', objectFit: 'cover'}} height={200} source={{uri: news.imageURL}} alt={news.imageTitle}/>
                <Column padding={3}>
                    <Row width='100%' maxWidth='100%' justifyContent='space-between' alignItems='center' marginBottom={3}>
                        <Text color={COLORS.accent} fontWeight={500}>{news.authorName}</Text>
                        <Text color={COLORS.light} fontSize={12} fontWeight={300}>{news.creationDate && convertDateUser(news.creationDate)}</Text>
                    </Row>
                    <Text color='white' fontWeight={500} fontSize={20}>{news.topic}</Text>
                    <Text color={COLORS.light} marginTop={3}>{news.content}</Text>
                </Column>
                </>
                }
            </Column>
        </ScrollView>
    )
}