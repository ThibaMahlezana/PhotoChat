import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from '../components/TopBar';
import BottomTab from '../components/BottomTab';

const backIcon = <Icon name="chevron-left" size={25} color="#FFF" />;

export default function Notifications(){
    return(
        <View style={styles.container}>
            <TopBar backIcon={backIcon}/>
            <Text>Notifications Content</Text>
            <BottomTab/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});