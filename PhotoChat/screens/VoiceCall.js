import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '../core/theme'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";

const VoiceCall = ({ route, navigation }) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Calling ...</Text>
      <View style={styles.userInfoSec}>
        <Image 
          source={{uri: route.params && route.params.userImg}} 
          style={styles.image} 
        />
        <Text style={styles.username}>
          {route.params && route.params.username}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Icon name="phone" size={50} color='white' />
      </TouchableOpacity>
    </View>
  )
}

export default VoiceCall

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoSec: {
    marginTop: 20,
    marginBottom: '35%',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
  },
  statusText: {
    fontSize: 20,
    fontFamily: 'Nunito_400Regular',
    color: 'white',
  },
  username: {
    fontSize: 25,
    color: 'white',
    marginTop: 10,
    fontFamily: 'Nunito_700Bold',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  }
})