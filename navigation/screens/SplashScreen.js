import { Image, View } from "native-base";
import { COLORS, screenHeight } from "../../styles/constants";

export default function SplashScreen (){
    return(
        <View display='flex' justifyContent='center' alignItems='center' height={screenHeight + 40} bg={COLORS.primary} width='100%'>
            <Image source={{uri: 'https://iili.io/J7ieKQI.gif'}} width={200} height={200} alt="Loader gif witch"/>
        </View>
    )
}