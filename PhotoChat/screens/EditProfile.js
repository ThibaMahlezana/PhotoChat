import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform, 
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image } 
from 'react-native'
import React, {useEffect, useContext, useState, useRef} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalStyles } from '../styles/GlobalStyles';
import theme from '../core/theme';
import { AuthContext } from '../navigation/AuthProvider';
import { db } from '../core/firebase';

const EditProfile = () => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const scrollComponent = useRef(null);

  const getUser = async() => {
    const currentUser = await db
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      scrollComponent.current.scrollToEnd();
    })
  })

  useEffect(() => {
    getUser();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
        <ScrollView ref={scrollComponent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.header}>
            <Image 
              style={styles.image} 
              source={require('../assets/images/500.jpg')} 
            />
          </TouchableOpacity>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={theme.SECONDARY_COLOR} size={20} />
            <TextInput
                placeholder="Username"
                placeholderTextColor="#666666"
                style={[GlobalStyles.input, {width: '90%', marginLeft: 12}]}
                autoCorrect={false}
                value={userData ? userData.username : ''}
                onChangeText={(txt) => setUserData({...userData, fname: txt})}
            />
          </View>
          <View style={styles.action}>
            <Ionicons name="ios-clipboard-outline" color={theme.SECONDARY_COLOR} size={20} />
            <TextInput 
                multiline
                numberOfLines={3}
                placeholder="About Me"
                placeholderTextColor="#666666"
                style={[GlobalStyles.input, {width: '90%', marginLeft: 12}]}
                autoCorrect={false}
                value={userData ? userData.bio: ''}
                onChangeText={(txt) => setUserData({...userData, fname: txt})}
            />
          </View>
          <View style={styles.action}>
            <Feather name="phone" color={theme.SECONDARY_COLOR} size={20} />
            <TextInput 
                placeholder="Phone"
                placeholderTextColor="#666666"
                style={[GlobalStyles.input, {width: '90%', marginLeft: 12}]}
                autoCorrect={false}
                value={userData ? userData.phone : ''}
                onChangeText={(txt) => setUserData({...userData, fname: txt})}
            />
          </View>
          <View style={styles.action}>
            <MaterialCommunityIcons
                name="map-marker-outline"
                color={theme.SECONDARY_COLOR}
                size={25}
            />
            <TextInput 
                placeholder="Location"
                placeholderTextColor="#666666"
                style={[GlobalStyles.input, {width: '90%', marginLeft: 12}]}
                autoCorrect={false}
                value={userData ? userData.location : ''}
                onChangeText={(txt) => setUserData({...userData, fname: txt})}
            />
          </View>
          <TouchableOpacity style={GlobalStyles.button}>
            <Text style={GlobalStyles.text}>Update</Text>
          </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})