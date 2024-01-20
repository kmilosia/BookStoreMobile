import { Box, Column,Row,Text } from "native-base";
import { Image, ScrollView } from "react-native";
import { COLORS } from "../../styles/constants";
import { useEffect, useState } from "react";
import { getReviews } from "../../api/ReviewsAPI";
import PageLoader from "../../components/loaders/PageLoader";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { convertDateUser } from "../../utils/dateConverter";

export default function ReviewsScreen ({route}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const bookID = route.params.bookID
    useEffect(() => {
        getReviews(bookID, setData, setLoading)
    },[])
    return(
        loading ? <PageLoader /> :
        <ScrollView>
            <Column bg={COLORS.primary} width='100%' minHeight='100%' padding={3}>
            {data.length > 0 ?
                        <Row width='100%' justifyContent='space-between' flexWrap='wrap' marginTop={3}>
                            {data.map((item,index) => {
                                return(
                                    <Column key={index} width='100%' marginBottom={3} rounded='lg' bg={COLORS.secondary} padding={5}>
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
        </ScrollView>
    )
}