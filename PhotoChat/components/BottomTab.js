import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

//import { useNavigation } from '@react-navigation/native';


const homeIcon = <Icon name="home" size={25} color={theme.SECONDARY_COLOR} />
const searchIcon = <Icon name="search" size={25} color="#FFF" />
const addIcon = <Icon name="plus" size={35} color="#FFF" />
const userIcon = <Icon name="user" size={25} color="#FFF" />
const notiIcon = <Icon name="bell" size={25} color="#FFF" />

export default function ButtomTab({navigation}){
    //const navigation = useNavigation(); 
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                <Text>{homeIcon}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                <Text>{searchIcon}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addIcon} onPress={()=> navigation.navigate('AddPost')}>
                <Text>{addIcon}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                <Text>{userIcon}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Notifications')}>
                <Text>{notiIcon}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.PRIMARY_COLOR,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addIcon: {
        backgroundColor: theme.SECONDARY_COLOR,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
});