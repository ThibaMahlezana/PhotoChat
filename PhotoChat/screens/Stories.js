import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../core/theme';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';

const addIcon = <Icon style={{marginHorizontal: 10}} name="plus" size={35} color={theme.SECONDARY_COLOR} />

export default function Stories(){
    return(
        <View style={styles.container}>
            <ScrollView 
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                <TouchableOpacity>
                    <View style={styles.story}>
                        <View style={styles.icon}>{addIcon}</View>
                        <Text style={styles.text}>Add Status</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.story}>
                        <View style={styles.icon}>
                            <Image 
                            style={styles.image} 
                            source={{uri:'https://www.fakepersongenerator.com/Face/female/female20161024840638031.jpg'}}/>
                        </View>
                        <Text style={styles.text}>Reeds</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.story}>
                        <View style={styles.icon}>
                            <Image 
                            style={styles.image} 
                            source={{uri:'https://www.fakepersongenerator.com/Face/male/male1085887896209.jpg'}}/>
                        </View>
                        <Text style={styles.text}>Sulu</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.story}>
                        <View style={styles.icon}>
                            <Image 
                                style={styles.image} 
                                source={{uri: 'https://www.fakepersongenerator.com/Face/male/male20161083873400055.jpg'}}/>
                        </View>
                        <Text style={styles.text}>Mike</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.story}>
                        
                        <Image 
                            style={styles.image} 
                            source={{uri: 'https://www.fakepersongenerator.com/Face/male/male1084174735534.jpg'}}/>
                        <Text style={styles.text}>John</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.story}>
                        <View style={styles.icon}>
                            <Image 
                                style={styles.image} 
                                source={{uri:'https://www.fakepersongenerator.com/Face/male/male20151083730617309.jpg'}}/>
                        </View>
                        <Text style={styles.text}>Matt Yu</Text>
                    </View>
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
    story: {
        width: 70,
        alignItems: 'center',
    },
    icon: {
        width: 55,
        height: 55,
        borderRadius: 50,
        borderColor: '#d25865',
        borderWidth: 3,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#FFF',
        borderWidth: 3,
    },
    text: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 12,
        color: theme.SECONDARY_COLOR,
    }
});