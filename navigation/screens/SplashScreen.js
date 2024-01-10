import { View } from "native-base";
import { COLORS, screenHeight } from "../../styles/constants";
import PageLoader from "../../components/loaders/PageLoader";

export default function SplashScreen (){
    return(
        <View display='flex' justifyContent='center' alignItems='center' height={screenHeight + 40} bg={COLORS.primary} width='100%'>
            <PageLoader />
        </View>
    )
}