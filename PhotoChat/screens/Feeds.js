import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import Stories from './Stories';
import Posts from '../components/Posts';


export default function Feeds({ navigation }){
    return(
        <View style={styles.container}>
            <Stories/>
            <Posts navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});