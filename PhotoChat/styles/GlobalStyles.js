import { StyleSheet } from 'react-native';
import theme from '../core/theme';
import { 
    Nunito_400Regular,
    Nunito_700Bold
} from '@expo-google-fonts/nunito';

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        fontFamily: 'Nunito_700Bold',
        color: theme.PRIMARY_COLOR,
        textTransform: 'uppercase',
    },
    input: {
        height: 50,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: theme.PRIMARY_COLOR,
        fontFamily: 'Nunito_400Regular',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: theme.PRIMARY_COLOR,
        marginTop: 12,
        height: 50
    },
    text : {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'Nunito_700Bold',
        letterSpacing: 0.25,
        color: 'white',
        textTransform: 'uppercase'
    },
    input_area : {
        width: '80%'
    },
    description: {
        marginTop: 12,
        color: theme.TEXT_COLOR,
        fontFamily: 'Nunito_400Regular',
    },
    errorText: {
        color: 'crimson',
        textAlign: 'center',
        fontFamily: 'Nunito_400Regular'
    },
    avatarWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarText: {
        color: theme.SECONDARY_COLOR,
        marginTop: 5,
        fontFamily: 'Nunito_400Regular',
    }
});

export {Nunito_400Regular, Nunito_700Bold, GlobalStyles}