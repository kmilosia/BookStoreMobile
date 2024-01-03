import { ActivityIndicator, Pressable, Text } from "react-native";
import { styles } from "../../styles/constants";

export default function SubmitButton ({loading, handle,text}) {
    return (
        <Pressable onPress={handle} style={styles.primaryButton}>
            {loading ? <ActivityIndicator size='small' color='white' /> :
            <Text style={styles.primaryButtonText}>{text}</Text>}
        </Pressable>
    )
}