import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Feeds(){
    return(
        <View style={styles.container}>
            <Text>Feeds here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});