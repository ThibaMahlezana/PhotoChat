import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';

export default function RestorePassword(){
    const [loaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
    });
      
    if (!loaded) {
        return null;
    }
    return(
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.header}>Restore Password</Text>
            <View style={GlobalStyles.input_area}>
                <Text style={GlobalStyles.description}>
                    You will recieve email with password reset link.
                </Text>
                <TextInput style={GlobalStyles.input} placeholder="Email"/>
                <Pressable style={GlobalStyles.button}>
                    <Text style={GlobalStyles.text}>Send Instructions</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // header: {
    //     fontSize: 30,
    //     fontFamily: 'Nunito_700Bold',
    //     color: theme.PRIMARY_COLOR,
    //     textTransform: 'uppercase',
    // },
    // input_area : {
    //     width: '80%'
    // },
    // input: {
    //     height: 50,
    //     marginVertical: 12,
    //     borderWidth: 1,
    //     padding: 10,
    //     borderRadius: 10,
    //     borderColor: theme.PRIMARY_COLOR,
    //     fontFamily: 'Nunito_400Regular'
    // },
    // text : {
    //     fontSize: 16,
    //     lineHeight: 21,
    //     letterSpacing: 0.25,
    //     color: 'white',
    //     textTransform: 'uppercase',
    //     fontFamily: 'Nunito_700Bold',
    //   },
    //   description: {
    //     marginTop: 12,
    //     color: '#606060',
    //     fontFamily: 'Nunito_400Regular',
    //   },
    //   button: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingVertical: 12,
    //     paddingHorizontal: 32,
    //     borderRadius: 10,
    //     elevation: 3,
    //     backgroundColor: theme.PRIMARY_COLOR,
    //     marginTop: 12,
    //     height: 50
    //   }
});