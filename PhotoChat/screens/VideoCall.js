import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '../core/theme'
import Icon from 'react-native-vector-icons/FontAwesome';

const VideoCall = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Calling ...</Text>
      <View style={styles.videoSec}>
        <View style={styles.clientVideoSec}>
          <Image 
            style={styles.clientImg} 
            source={{uri: route.params && route.params.userImg}} 
          />
          <Text style={styles.username}>
            { route.params && route.params.username }
          </Text>
        </View>
        {/* <Image style={{width: 50, height: 50}} source={require('../assets/images/500.jpg')} /> */}
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

export default VideoCall

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoSec: {
    backgroundColor: 'white',
    width: '96%',
    height: '70%',
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 15,
  },
  clientVideoSec:{
    position: 'absolute',
    zIndex: 1,
    right: 10,
    top: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    color: '#808080',
    marginTop: 10,
    fontFamily: 'Nunito_700Bold',
  },
  clientImg: {
    width: 130,
    height: 150,
    borderRadius: 20,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    fontFamily: 'Nunito_400Regular',
    color: 'white',
  },
})