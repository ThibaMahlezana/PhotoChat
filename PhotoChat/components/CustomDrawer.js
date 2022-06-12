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
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { AuthContext } from '../navigation/AuthProvider';
  import { db } from '../core/firebase';

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
            <Text style={styles.username}>username</Text>
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
        color: theme.SECONDARY_COLOR,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 20,
        marginBottom: 20
    },
    button: {
        backgroundColor: theme.PRIMARY_COLOR,
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