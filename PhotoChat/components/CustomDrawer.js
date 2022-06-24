import React, { useContext, useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
  import theme from '../core/theme';
  import { AuthContext } from '../navigation/AuthProvider';
  import { db } from '../core/firebase';
  import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
  import Icon from 'react-native-vector-icons/Ionicons';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawer = props => {
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    const getUser = async() => {
        const currentUser = await db
        .collection('users')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
          if( documentSnapshot.exists ) {
            setUserData(documentSnapshot.data());
          }
        })
    }

    useEffect(() => {
        getUser();
    }, []);
    
  return (
    <View style={{flex: 1}}>
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{backgroundColor: theme.PRIMARY_COLOR}}
        >
        <View style={styles.container}>
            <Image 
                style={styles.image} 
                source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
            />
            <Text style={styles.username}>{userData && userData.username}</Text>
            <Text style={styles.bio}>
                <Icon name="ios-clipboard-outline" color='white' size={20} /> 
                {userData && userData.bio}
            </Text>
            <Text style={styles.bio}>
                <MaterialCommunityIcons
                    name="map-marker-outline"
                    color='white'
                    size={25}
                />
                {userData && userData.location}
            </Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
            <DrawerItemList {...props} />
        </View>
        </DrawerContentScrollView>
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
            <Ionicons name="exit-outline" color={'#fff'} size={25} />
            <Text style={styles.text}>Sign out</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    username: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Nunito_700Bold',
    },
    bio: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 20,
        marginBottom: 20
    },
    button: {
        backgroundColor: theme.SECONDARY_COLOR,
        marginHorizontal: 20,
        padding: 10,
        marginBottom: 50,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        marginHorizontal: 20,
        textTransform: 'uppercase'
    }
});

export default CustomDrawer