import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import theme from '../core/theme';

export default function Login(){
    return(
      <View style={styles.container}>
          <Text style={styles.header}>sign in</Text>
          <View style={styles.input_area}>
            <TextInput style={styles.input} placeholder="Email"/>
            <TextInput style={styles.input} placeholder="Password"/>
            <Pressable style={styles.button}>
                <Text style={styles.text}>Sign in</Text>
            </Pressable>
            <Text style={styles.description}>Don't have an accout? sign up.</Text>
            <Text style={styles.description}>forgot password? restore password.</Text>
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
  input_area : {
    width: '80%'
  },
  input: {
    height: 50,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: theme.PRIMARY_COLOR
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
  description: {
    marginTop: 12,
    color: '#606060',
  }
});