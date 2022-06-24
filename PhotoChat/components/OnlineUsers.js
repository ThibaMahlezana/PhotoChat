import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import theme from '../core/theme';
import Octicons from 'react-native-vector-icons/Octicons';

const OnlineUser = () => {
  return (
    <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.container}
        >
          <TouchableOpacity style={styles.user}>
            <Image  style={styles.image} source={require('../assets/images/500.jpg')} />
            <Octicons name='dot-fill' style={styles.dot} color={'green'}/>
            <Text style={styles.username}>User Name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.user}>
            <Image  style={styles.image} source={require('../assets/images/500.jpg')} />
            <Octicons name='dot-fill' style={styles.dot} color={'green'}/>
            <Text style={styles.username}>User Name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.user}>
            <Image  style={styles.image} source={require('../assets/images/500.jpg')} />
            <Octicons name='dot-fill' style={styles.dot} color={'green'}/>
            <Text style={styles.username}>User Name</Text>
          </TouchableOpacity>
    </ScrollView>
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