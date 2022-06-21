import { StyleSheet, Text, View, Animated, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Status = ({ route, navigation }) => {
    const {name} = route.params;
    useEffect(() => {
        let timer = setTimeout(() => {
          navigation.goBack();
        }, 5000);
    
        Animated.timing(progress, {
          toValue: 5,
          duration: 5000,
          useNativeDriver: false,
        }).start();
        return () => clearTimeout(timer);
      }, []);
    
      const [progress, setProgress] = useState(new Animated.Value(0));
    
      const progressAnimation = progress.interpolate({
        inputRange: [0, 5],
        outputRange: ['0%', '100%'],
      });

  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: progressAnimation,
          }}>
        </Animated.View>
      </View>
        <View style={styles.header}>
            <View style={styles.profilePicWrap}>
                <Image
                    source={{uri:'https://www.fakepersongenerator.com/Face/female/female20161024840638031.jpg'}}
                    style={styles.profilePic}
                />
            </View>
            <View style={styles.nameSection}>
                <Text style={styles.nameText}> { name } </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionic name="close" size={25} color={'white'} style={{opacity: 0.6}}
                />
                </TouchableOpacity>
            </View>
        </View>
        <Image
            source={{uri:'https://www.fakepersongenerator.com/Face/female/female20161024840638031.jpg'}}
            style={styles.imageArea}
        />
        <View style={styles.replyArea}>
            <TextInput
                placeholder="send message"
                placeholderTextColor="white"
                style={styles.text}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="navigation" size={30} color={'white'} />
            </TouchableOpacity>
      </View>
    </View>
  )
}

export default Status

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        height: 3,
        width: '95%',
        borderWidth: 1,
        backgroundColor: 'gray',
        position: 'absolute',
        top: 18,
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 12,
        left: 0,
        width: '90%',
    },
    profilePicWrap: {
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePic: {
        borderRadius: 100,
        backgroundColor: 'orange',
        resizeMode: 'cover',
        width: '92%',
        height: '92%',
    },
    nameSection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    nameText: {
        color: 'white', 
        fontSize: 15, 
        paddingLeft: 10
    },
    imageArea: {
        position: 'absolute', 
        width: '100%', 
        height: 400
    },
    replyArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
        width: '100%',
    },
    text: {
        borderColor: 'white',
        borderRadius: 25,
        width: '85%',
        height: 50,
        paddingLeft: 20,
        borderWidth: 1,
        fontSize: 15,
        color: 'white',
    },
})