import { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { getBooksByCategory } from "../../api/BooksAPI"
import PageLoader from '../../components/loaders/PageLoader'
import ProductElement from '../../components/ProductElement'
import { Column, Row } from "native-base"
import { COLORS } from "../../styles/constants"

export default function CategoryBookListScreen ({navigation, route}) {
    const categoryID = route.params.categoryID
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getBooksByCategory(categoryID,setBooks, setLoading)
    },[])

    return (
        loading ? <PageLoader /> :
        <ScrollView>
            <Column bg={COLORS.primary} paddingY={2} paddingX={1}>
                <Row justifyContent='space-between' flexWrap='wrap'>
                {books?.map((item,index) => {
                    return (
                        <ProductElement item={item} key={index}/>
                    )
                })}
                </Row>
            </Column>
        </ScrollView>
    )
}
