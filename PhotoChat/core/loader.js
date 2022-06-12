import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import theme from './theme'

const Loader = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/loader.gif')} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height:80,
        width: 80,
    }
})