import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Stories from './Stories';
import Posts from '../components/Posts';
import Header from '../components/Header';

const Feeds = ({ route, navigation }) => {
    return(
        <View style={styles.container}>
            <Header route={route} navigation={navigation} />
            <Stories navigation={navigation} />
            <Posts navigation={navigation} />
        </View>
    );
}

export default Feeds;

const styles = StyleSheet.create({
    container: {},
});