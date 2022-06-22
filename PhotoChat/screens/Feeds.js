import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import Stories from './Stories';
import Posts from '../components/Posts';
import Header from '../components/Header';

export default function Feeds({ route, navigation }){
    return(
        <View style={styles.container}>
            <Header route={route} navigation={navigation} />
            <Stories navigation={navigation} />
            <Posts navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});