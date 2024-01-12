import { Row } from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/constants";


export default function StarsRow ({value}){
    return(
        <Row alignItems='center' marginRight={2}>
            <FontAwesome name='star' size={18} color={value >= 5 ? 'gold' : COLORS.secondary} />
            <FontAwesome name='star' size={18} color={value >= 4 ? 'gold' : COLORS.secondary} />
            <FontAwesome name='star' size={18} color={value >= 3 ? 'gold' : COLORS.secondary} />
            <FontAwesome name='star' size={18} color={value >= 2 ? 'gold' : COLORS.secondary} />
            <FontAwesome name='star' size={18} color={value >= 1 ? 'gold' : COLORS.secondary} />
        </Row>
    )
}