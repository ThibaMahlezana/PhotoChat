import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import theme from '../core/theme';
import Octicons from 'react-native-vector-icons/Octicons';

const OnlineUser = ({ item, navigation }) => {
  return (
    <TouchableOpacity 
      style={styles.user}
      onPress={
        () => navigation.navigate('ChatsDetails', 
            { username: item.username, userImg: '../assets/images/500.jpg' })
        }
      >
      <Image  style={styles.image} source={require('../assets/images/500.jpg')} />
      <Octicons name='dot-fill' style={styles.dot} color={'green'}/>
      <Text style={styles.username}>
        {item.username}
      </Text>
    </TouchableOpacity>
  )
}

export default OnlineUser

const styles = StyleSheet.create({
    container: {
        padding:  5,
        // maxHeight: 80,
        maxHeight: 80,
    },
    user: {
      marginHorizontal: 6,
    },
    image: {
      width:55,
      height: 55,
      borderRadius: 100,
    },
    username: {
      fontSize: 12,
      fontFamily: 'Nunito_400Regular',
      color: theme.SECONDARY_COLOR,
      textAlign: 'center',
    },
    dot: {
      fontSize: 20,
      backgroundColor: 'white',
      paddingHorizontal: 5,
      borderRadius: 100,
      position: 'absolute',
      bottom: 10,
      right: 8,
    },
})