import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import theme from '../core/theme';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";

const ChatsHeader = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
        <View style={styles.userInfo}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color={'white'} />
            </TouchableOpacity>
            <Image
                style={styles.image}
                source={{uri: route.params && route.params.userImg}}
            />
            <Text style={styles.username}>
                { route.params && route.params.username }
            </Text>
        </View>
        <View style={styles.tools}>
            <TouchableOpacity 
                // onPress={()=> navigation.navigate('Voice Call')}
                onPress={
                    () => navigation.navigate('Voice Call', 
                        { username: route.params && route.params.username, 
                          userImg: route.params && route.params.userImg 
                    })
                }
            >
                <FontAwesome 
                    name="phone" 
                    size={25} 
                    style={styles.icon} 
                    color={'white'} 
                />
            </TouchableOpacity>
            <TouchableOpacity 
                // onPress={()=> navigation.navigate('Video Call')}
                onPress={
                    () => navigation.navigate('Video Call', 
                        { username: route.params && route.params.username, 
                          userImg: route.params && route.params.userImg 
                    })
                }
            >
                <Icon 
                    name="videocam" 
                    size={25} 
                    style={styles.icon} 
                    color={'white'} 
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="information-circle-sharp" 
                    size={25} 
                    style={styles.icon} 
                    color={'white'} 
                />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ChatsHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '98%',
        justifyContent: 'space-between',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginLeft: 18,
        marginRight: 10,
    },
    username: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Nunito_700Bold',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tools: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 8,
    }
})