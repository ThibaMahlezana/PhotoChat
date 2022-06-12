import React from 'react';
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../core/theme';
import BottomTab from '../components/BottomTab';

const SearchIcon = <Icon name="search" size={25} color={theme.PRIMARY_COLOR} />;

export default function Search(){
    return(
        <View style={styles.container}>
            <View style={styles.search}>
                <Text style={styles.header}>Search</Text>
                <View style={styles.searchArea}>
                    <Text>{SearchIcon}</Text>
                    <TextInput style={styles.text} placeholder='search users'/>
                </View>
                <ScrollView>
                    <TouchableOpacity style={styles.searchContainer}>
                        <Text style={styles.username}>Anele Sibiya</Text>
                        <View style={styles.searchResults}>
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchContainer}>
                        <Text style={styles.username}>Anele Sibiya</Text>
                        <View style={styles.searchResults}>
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchContainer}>
                        <Text style={styles.username}>Anele Sibiya</Text>
                        <View style={styles.searchResults}>
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchContainer}>
                        <Text style={styles.username}>Anele Sibiya</Text>
                        <View style={styles.searchResults}>
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                            <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.btnText}>View more</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {/* <BottomTab/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search: {
        padding: 10,
    },
    header: {
        fontSize: 25,
        color: '#606060',
        fontWeight: 'bold',
    },
    searchContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    searchArea: {
        flexDirection: 'row',
        backgroundColor: '#D3D3D3',
        borderRadius: 8,
        padding: 8,
        marginTop: 5,
        marginBottom: 5,
    },
    username: {
        fontSize: 17,
        color: '#606060',
    },
    text: {
        marginLeft: 20,
        fontSize: 15,
        color: '#606060',
    },
    searchResults: {
        flexDirection: 'row',
        marginTop: 10,
    },
    image: {
        height: 70,
        width: 70,
        marginRight: 10,
        borderRadius: 10,
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 100,
        alignItems: 'center',
        backgroundColor: theme.PRIMARY_COLOR,
        padding: 5,
        borderRadius: 10,
    },
    btnText: {
        color: '#FFF',
    },
});