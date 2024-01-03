import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { getCategoryElements } from "../../api/CategoryElementsAPI";
import { AspectRatio, Column, Image, Row, Text } from "native-base";
import { COLORS, screenHeight } from "../../styles/constants";

export default function CategoriesScreen ({navigation}) {
    const [elements, setElements] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getCategoryElements(setElements, setLoading)
    },[])
    return(
        loading ? 
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: screenHeight, backgroundColor: 'white'}}>
            <ActivityIndicator size='medium' color={COLORS.accent} />
        </View> 
        :
        <ScrollView>
            <Column bg='white'>
                <Row justifyContent='space-between' flexWrap='wrap'>
                {elements?.map((item,index) => {
                    return(
                        <Pressable key={index} style={{padding: 5, width: '50%'}} onPress={() => {navigation.navigate('Category', {categoryID: item.categoryID, title: item.categoryName})}}>
                            <Column rounded='lg' bg='white' padding={3} borderWidth={2} borderColor='gray.200' alignItems='center' justifyContent='center'>
                                <AspectRatio ratio={1/1} width='100%'>
                                    <Image source={{uri: item.logo}} rounded='lg' alt='Category Image' />
                                </AspectRatio>
                                <Text fontWeight='bold' fontSize={20} marginTop={2} color='gray.700'>{item.categoryName}</Text>
                            </Column>
                        </Pressable>
                    )
                })}
                </Row>
            </Column>
        </ScrollView>
    )
}