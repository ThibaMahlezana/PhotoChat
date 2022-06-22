import React from 'react'
import { StyleSheet, Text, StatusBar, View, TouchableOpacity } from 'react-native'
import theme from '../core/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";

export default function Header({route, navigation}) {
  let routeName = '';
  if(route.name == 'ChatsList'){
    routeName = 'Chats';
  }
  else if(route.name == 'EditProfile'){
    routeName = 'Edit Profile';
  }
  else {
    routeName = route.name;
  }

  return (
    <View style={styles.header}>
      <StatusBar backgroundColor={theme.PRIMARY_COLOR}/>
      <TouchableOpacity>
        <Ionicons name="chevron-back" size={30} color={'white'}/>
      </TouchableOpacity>
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
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Nunito_700Bold',
  },
})