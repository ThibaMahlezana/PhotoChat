import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../core/theme';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';
import Entypo from 'react-native-vector-icons/Entypo';

const plusIcon = <Entypo 
    name="circle-with-plus"
    style={{
    fontSize: 20,
    color: theme.SECONDARY_COLOR,
    backgroundColor: 'white',
    borderRadius: 100,
    position: 'absolute',
    bottom: -0,
    right: 8,
    }} 
/>

const addIcon = <Icon style={{marginHorizontal: 10}} name="plus" size={35} color={theme.SECONDARY_COLOR} />

export default function Stories({ navigation }){
    return(
        <View style={styles.container}>
            <ScrollView 
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                <TouchableOpacity 
                    style={styles.status} 
                    onPress={() => navigation.navigate('Add Status', {
                        name: 'Your Story',
                        // image: data.image,
                      })}>
                    <View style={styles.yourStory}>
                        <Image 
                            style={styles.image} 
                            source={{uri:'https://www.fakepersongenerator.com/Face/female/female20161024840638031.jpg'}}
                        />
                        { plusIcon }
                    </View>
                    <Text style={styles.text}>Your Status</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.status}
                    onPress={() => navigation.navigate('Status', {
                        name: 'Reeds',
                        // image: data.image,
                    })}>
                    <View style={styles.story}>
                        <Image 
                            style={styles.image} 
                            source={{uri:'https://www.fakepersongenerator.com/Face/female/female20161024840638031.jpg'}}
                        />
                    </View>
                    <Text style={styles.text}>Reeds</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.status}>
                    <View style={styles.story}>
                        <Image 
                            style={styles.image} 
                            source={{uri:'https://www.fakepersongenerator.com/Face/male/male1085887896209.jpg'}}
                        />
                    </View>
                    <Text style={styles.text}>Sulu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.status}>
                    <View style={styles.story}>
                        <Image 
                            style={styles.image} 
                            source={{uri: 'https://www.fakepersongenerator.com/Face/male/male20161083873400055.jpg'}}
                        />
                    </View>
                    <Text style={styles.text}>Mike</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.status}>
                    <View style={styles.story}>
                        <Image 
                            style={styles.image} 
                            source={{uri: 'https://www.fakepersongenerator.com/Face/male/male1084174735534.jpg'}}
                        />
                    </View>
                    <Text style={styles.text}>John</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.status}>
                    <View style={styles.story}>
                        <Image 
                            style={styles.image} 
                            source={{uri:'https://www.fakepersongenerator.com/Face/male/male20151083730617309.jpg'}}
                        />
                    </View>
                    <Text style={styles.text}>Matt Yu</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    yourStory: {
        // position: 'absolute',
        // bottom: 15,
        // right: 10,
        // zIndex: 1,
        width: 68,
        height: 68,
        backgroundColor: 'white',
        borderWidth: 1.8,
        borderRadius: 100,
        borderColor: '#c13584',
        justifyContent: 'center',
        alignItems: 'center',
    },
    story: {
        width: 68,
        height: 68,
        backgroundColor: 'white',
        borderWidth: 1.8,
        borderRadius: 100,
        borderColor: '#c13584',
        justifyContent: 'center',
        alignItems: 'center',
    },
    status: {
        paddingHorizontal: 5,
        position: 'relative',
    },
    image: {
        resizeMode: 'cover',
        width: '92%',
        height: '92%',
        borderRadius: 100,
        backgroundColor: 'orange',
    },
    text: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 12,
        color: theme.SECONDARY_COLOR,
        textAlign: 'center',
    }
});