import { Dimensions, StyleSheet } from "react-native";

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const COLORS = {
    primary: '#181826',
    secondary: '#212134',
    triary: '#6F6F8E',
    border: '#2E2E3B',
    accent: '#c084fc',
    secondaryAccent: '#a855f7',
    light: '#e3e3e3',
    borderColor: '#eee',
    red: '#ef4444'
}

export const styles = StyleSheet.create({
    primaryButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: COLORS.accent,
        borderWidth: 2,
        borderColor: COLORS.accent,
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        marginVertical: 5,
    },
    secondaryButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: COLORS.accent,
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        marginVertical: 5,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.accent,
    },
    errorText: {
        fontSize: 14,
        fontWeight: 300,
        color: COLORS.red,
        alignSelf: 'flex-start',
        marginBottom: 5,
        textAlign: 'center',
    },
    inputStyle: {
        marginVertical: 10,
        color: 'white',
        borderWidth: 2,
        borderColor: COLORS.triary,
        backgroundColor: COLORS.secondary,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    inputLabel: {
        color: 'white',
        fontWeight: 500,
        fontSize: 16
    },
    roundButton:{
        backgroundColor: COLORS.accent,
        marginTop: 10,
        padding: 12,
        borderRadius: 40,
        width: '90%'
    },
    roundButtonText:{
        color: 'white',
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 16
    }
})
