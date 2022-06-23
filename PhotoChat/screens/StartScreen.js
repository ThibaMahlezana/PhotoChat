import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from '../core/theme';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import { 
    Nunito_400Regular,
    Nunito_700Bold
} from '@expo-google-fonts/nunito';

export default function StartScreen({ navigation }){
    const [loaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
    });
      
    if (!loaded) {
        return null;
    }
    return(
        <View style={styles.background}>
            {/* <Text style={styles.header}>Moses Reeds</Text> */}
            <Text style={styles.subheader}>PhotoChat</Text>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Login')}>
                <Text style={styles.text}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('RegisterWith')}>
                <Text style={styles.text}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: theme.PRIMARY_COLOR,
        flex: 1,
        padding: 10,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header : {
        fontSize: 30,
        fontWeight: '600',
        color: '#FFF',
        textTransform: 'uppercase',
        fontFamily: 'Nunito_400Regular',
        marginBottom: 10
    },
    subheader: {
        marginBottom: 10,
        color: '#FFF',
        fontSize: 45,
        fontFamily: 'Nunito_700Bold',
    },
    text : {
        fontSize: 18,
        lineHeight: 21,
        fontFamily: 'Nunito_700Bold',
        color: '#FFF',
        textTransform: 'uppercase',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        backgroundColor: theme.SECONDARY_COLOR,
        width: '90%',
        height: 50,
        marginBottom: 10
    }
});