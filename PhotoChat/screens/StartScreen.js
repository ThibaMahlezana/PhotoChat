import React from "react";
import { StyleSheet, Text, Button, Pressable } from "react-native";
import Background from "../components/Background";
import theme from '../core/theme';

export default function StartScreen({ navigation }){
    return(
        <Background>
            <Text style={styles.header}>Moses Reeds</Text>
            <Text style={styles.subheader}>PhotoChat</Text>
            <Pressable style={styles.button} onPress={()=> navigation.navigate('LoginScreen')}>
                <Text style={styles.text}>Sign in</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={()=> navigation.navigate('RegisterWithScreen')}>
                <Text style={styles.text}>Sign up</Text>
            </Pressable>
        </Background>
    );
}

const styles = StyleSheet.create({
    header : {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFF',
        textTransform: 'uppercase',
        fontFamily: 'Nunito',
        margin: 10
    },
    subheader: {
        margin: 10,
        color: '#FFF',
        fontSize: 30,
        fontFamily: 'Nunito'
    },
    text : {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textTransform: 'uppercase'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#841584',
        width: '80%',
        marginBottom: 10
    }
});