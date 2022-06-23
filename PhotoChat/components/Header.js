import React, { useState } from 'react'
import { StyleSheet, Text, StatusBar, View, TouchableOpacity } from 'react-native'
import theme from '../core/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";

export default function Header({route, navigation}) {
  let routeName = route.name;
  let iconName = 'chevron-back';
  
  if(route.name == 'Home') {
    routeName = 'Feeds';
    iconName = 'menu-outline';
  }
  if(route.name == 'Search') {
    iconName = 'menu-outline';
  }
  if(route.name == 'Add Post') {
    iconName = 'menu-outline';
  }
  if(route.name == 'Profile') {
    iconName = 'menu-outline';
  }
  if(route.name == 'ChatsList'){
    routeName = 'Chats';
    iconName = 'menu-outline';
  }
  if(route.name == 'EditProfile'){
    routeName ='Edit Profile';
  }

  const LeftIcon = () => {
    return(
      <TouchableOpacity 
          onPress={
            () => route.name == 'Home' || 
            route.name == 'Search' || 
            route.name == 'Add Post' ||
            route.name == 'Profile' ||
            route.name == 'ChatsList' ? 
              navigation.toggleDrawer() : navigation.goBack()
          }
        >
        <Ionicons name={iconName} size={30} color={'white'}/>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.header}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR}/>
      <LeftIcon iconName={iconName} />
      <Text style={styles.title}> { routeName } </Text>
      <TouchableOpacity>
        <FontAwesome name='camera' size={22} color={'white'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:  'space-between',
    height: 50,
    backgroundColor: theme.PRIMARY_COLOR,
    paddingEnd: 18,
    paddingStart: 18,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Nunito_700Bold',
  },
})