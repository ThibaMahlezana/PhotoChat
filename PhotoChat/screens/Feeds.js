import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import TopBar from '../components/TopBar';
import Posts from '../components/Posts';
import BottomTab from '../components/BottomTab';
import Icon from 'react-native-vector-icons/FontAwesome';

//const backIcon = <Icon name="chevron-left" size={25} color="#FFF" />;

export default function Feeds(){
    return(
        <View style={styles.container}>
            <SafeAreaView>
                <TopBar/>
                <Posts/>
                <BottomTab />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});