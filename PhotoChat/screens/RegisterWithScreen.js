import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import theme from '../core/theme';

export default function RegisterWith({ navigation }){
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register</Text>
            <Text style={styles.subheader}>Register your account here.</Text>
            <View style={styles.input_area}>
                <Pressable style={styles.button} onPress={()=> navigation.navigate('RegisterScreen')}>
                    <Text style={styles.text}>Sign up with Email</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Sign up with Google</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Sign up with Facebook</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        fontFamily: 'Nunito',
        color: theme.PRIMARY_COLOR,
        textTransform: 'uppercase',
        fontWeight: '800'
    },
    subheader: {
        margin: 10,
        color: '#606060',
        fontFamily: 'Nunito'
    },
    input_area : {
        width: '80%'
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
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textTransform: 'uppercase'
    },
});