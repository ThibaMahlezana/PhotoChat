import react from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function Posts(){
    return(
        <View style={styles.container}>
            <Text>Posts</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height:'80%',
    }
});