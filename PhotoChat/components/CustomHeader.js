import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react'

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{width: '33%'}}>
        <Icon name='menu-fold' size={20} color={'white'}/>
      </TouchableOpacity>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Chats</Text>
      </View>
      <TouchableOpacity style={{width: '33%', alignItems: 'flex-end'}}>
        <FontAwesome name='camera' size={20} color={'white'}/>
      </TouchableOpacity>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleWrap: {
      width: '33%',
      alignItems: 'center',
    },
    title: {
      color: 'white',
      fontSize: 25,
    },
})