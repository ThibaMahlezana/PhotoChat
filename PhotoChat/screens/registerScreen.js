import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import theme from '../core/theme';

export default function Register(){
    return(
      <View style={styles.container}>
          <Text>Register</Text>
          <Text>PhotoChat</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  }
});