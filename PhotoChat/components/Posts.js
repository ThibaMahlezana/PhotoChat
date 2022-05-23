import react from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function Posts(){
    return(
        <View style={styles.container}>
            <View style={styles.post}>
                <Text>Post</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height:'80%',
    },
    post: {},
    postHeader: {},
});