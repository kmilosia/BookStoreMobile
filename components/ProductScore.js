import { Column, Row, Text, View } from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/constants";
import StarsRow from "./StarsRow";

export default function ProductScore ({score,scoreValues}){
    const quantity = scoreValues['1'] + scoreValues['2'] + scoreValues['3'] + scoreValues['4'] + scoreValues['5']
    return(
        <Column width='100%' alignItems='center' justifyContent='center' padding={0}>
            <Row alignItems='center'>
                <Text fontSize={40} color='white' marginRight={2}>{score}</Text>
                <FontAwesome name='star' size={40} color='gold' />
            </Row>
            <Text fontSize={16} color='white' marginRight={2}>Średnia ocen z {quantity} recenzji</Text>
            <Column justifyContent='center' alignItems='center' width='100%' marginY={5}>
                <Row alignItems='center' marginY={1}>
                    <StarsRow value={5} />
                    <View width={200} bg={COLORS.secondary} rounded='full' height={4}>
                        {scoreValues['5'] !== 0 && <View width={`${(scoreValues['5'] / quantity * 100)}%`} bg={COLORS.accent} height={4} rounded='full'/>}
                    </View>
                </Row>
                <Row alignItems='center' marginY={1}>
                    <StarsRow value={4} />
                    <View width={200} bg={COLORS.secondary} rounded='full' height={4}>
                        {scoreValues['4'] !== 0 && <View width={`${(scoreValues['4'] / quantity * 100)}%`} bg={COLORS.accent} height={4} rounded='full'/>}
                    </View>
                </Row>
                <Row alignItems='center' marginY={1}>
                    <StarsRow value={3} />
                    <View width={200} bg={COLORS.secondary} rounded='full' height={4}>
                        {scoreValues['3'] !== 0 && <View width={`${(scoreValues['3'] / quantity * 100)}%`} bg={COLORS.accent} height={4} rounded='full'/>}
                    </View>
                </Row>
                <Row alignItems='center' marginY={1}>
                    <StarsRow value={2} />
                    <View width={200} bg={COLORS.secondary} rounded='full' height={4}>
                        {scoreValues['2'] !== 0 && <View width={`${(scoreValues[2] / quantity * 100)}%`} bg={COLORS.accent} height={4} rounded='full'/>}
                    </View>
                </Row>
                <Row alignItems='center' marginY={1}>
                    <StarsRow value={1} />
                    <View width={200} bg={COLORS.secondary} rounded='full' height={4}>
                        {scoreValues['1'] !== 0 && <View width={`${(scoreValues['1'] / quantity * 100)}%`} bg={COLORS.accent} height={4} rounded='full'/>}
                    </View>
                </Row>
            </Column>
        </Column>
    )
}