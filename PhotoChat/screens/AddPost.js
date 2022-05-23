import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from '../components/TopBar';
import BottomTab from '../components/BottomTab';

const backIcon = <Icon name="chevron-left" size={25} color="#FFF" />;

export default function AddPost(){
    return(
        <View style={styles.container}>
            <TopBar backIcon={backIcon}/>
            <Text>AddPost Content</Text>
            <BottomTab/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});