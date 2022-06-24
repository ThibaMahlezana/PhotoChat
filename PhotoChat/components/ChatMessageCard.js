import { StyleSheet, Text, TouchableOpacity, View, Image,  ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import theme from '../core/theme'
import moment from 'moment'
import { db } from '../core/firebase'

const ChatMessageCard = ({ item, navigation }) => {
    const [userData, setUserData] = useState([]);

    const getUserInfo = async () => {
        try{
            const list = [];
            const userId = item.userId;
            await db.collection('users')
            .doc(userId)
            .get()
            .then((querySnapshot) => {
                const { username, userImg } = querySnapshot.data();
                list.push({
                    username: username,
                    userImg: userImg,
                });
                setUserData(list);
            })
        }
        catch(e){
            console.log(e);
        }
    }
    
    useEffect(() => {
        getUserInfo();
    }, [])
    
    return (
    <View>
        <TouchableOpacity 
                style={styles.card}
                onPress={
                    () => navigation.navigate('ChatsDetails', 
                        { username: userData[0].username, userImg: userData[0].userImg })
                }
            >
            <View style={styles.userInfo}>
                <View style={styles.userImgWrapper}>
                    <Image 
                        style={styles.userImg} 
                        source={{ uri: userData[0] && userData[0].userImg }}/>
                </View>
                <View style={styles.textSection}>
                    <View style={styles.userInfoText}>
                        <Text style={styles.userName}>
                            { userData[0] && userData[0].username }
                        </Text>
                        <Text style={styles.postTime}>
                            { moment(item.time.toDate()).fromNow() }
                        </Text>
                    </View>
                    <Text style={styles.messageText}>{item.text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default ChatMessageCard

const styles = StyleSheet.create({
    card: {
        width: '100%',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userImgWrapper: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    textSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15,
        paddingLeft: 0,
        marginLeft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderColor: '#cccccc',
    },
    userInfoText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        width: '90%',
    },
    userName: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 18,
        color: theme.SECONDARY_COLOR,
    },
    postTime: {
        fontFamily: 'Nunito_400Regular',
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    messageText: {
        fontFamily: 'Nunito_400Regular',
        fontSize: 14,
        color: '#808080',
    }
})