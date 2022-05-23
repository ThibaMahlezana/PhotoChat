import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import theme from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const camIcon = <Icon name="camera" size={25} color="#FFF" />
const backIcon = <Icon name="chevron-left" size={25} color="#FFF" />

export default function TopBar() {
    const navigation = useNavigation(); 
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={()=> navigation.goBack()}>
                <Text>{' '}</Text>
            </TouchableOpacity>
            <View style={styles.title}>
                {/* <Text style={styles.ownerName}>Moses Reeds</Text> */}
                <Text style={styles.appName}>PhotoChat</Text>
            </View>
            <TouchableOpacity style={styles.cam}>
                <Text>{camIcon}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.PRIMARY_COLOR,
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row',
    },
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cam: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ownerName: {
        color: '#FFF',
    },
    appName: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: '600',
    },
});