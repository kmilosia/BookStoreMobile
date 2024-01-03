import { ActivityIndicator, View } from "react-native";
import { COLORS, screenHeight } from "../../styles/constants";

export default function PageLoader () {
    return (
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: screenHeight, backgroundColor: 'white'}}>
            <ActivityIndicator size='medium' color={COLORS.accent} />
        </View> 
    )
}