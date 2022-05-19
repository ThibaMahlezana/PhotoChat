import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import theme from '../core/theme';

export default function Login(){
    return(
      <View style={styles.container}>
          <Text style={styles.header}>sign in</Text>
          <Text>PhotoChat</Text>
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
    fontSize: 50,
    fontFamily: 'Nunito',
    color: theme.PRIMARY_COLOR,
    textTransform: 'uppercase',
  }
});