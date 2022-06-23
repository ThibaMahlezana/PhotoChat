import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const AddStatus = ({route, navigation}) => {
  return (
    <View>
        <Header route={route} navigation={navigation}/>
      <Text>AddStatus</Text>
    </View>
  )
}

export default AddStatus

const styles = StyleSheet.create({})