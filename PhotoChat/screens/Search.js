import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import theme from '../core/theme';
import BottomTab from '../components/BottomTab';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { db } from '../core/firebase';
// import { QuerySnapshot } from 'firebase/firestore';

const SearchIcon = <Icon name="search" size={25} color={theme.SECONDARY_COLOR} />;
const UserIcon = <IoniIcon name="user" size={25} color={theme.SECONDARY_COLOR} />;


export default function Search({navigation}){
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const list = [];
            await db.collection('users')
            .get()
            .then((QuerySnapshot) => {
                QuerySnapshot.forEach((doc) => {
                    const {
                        username,
                        location,
                        userImg,
                    } = doc.data();
                    list.push({
                        id: doc.id,
                        username: username,
                        location: location,
                        userImg: userImg,
                    });
                });
            })
            setUsers(list);
            if (loading) {
                setLoading(false);
            }
        }
        catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    const queryUsersByUsername = (username) => {
        db.collection('users')
        .where('username', '>=', username)
        //.limit(0)
        .get()
        .then((QuerySnapshot) => {
            let users = QuerySnapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return [id, ...data]
            })
        })
    };

    const UserCard = ({navigation, item}) => (
        <View style={styles.userContainer}>
            <Image 
                style={styles.image} 
                source={{uri: item.userImg}} />
            <View style={{marginHorizontal: 10, width: '35%'}}>
                <TouchableOpacity 
                    onPress={() => {
                        console.log(item.id);
                        navigation.navigate('Profile',
                        {   screen: 'Profile',
                            params: { userId: item.id },}
                        );
                    }}
                    >
                    <Text style={styles.username}>{item.username}</Text>
                </TouchableOpacity>
                <Text style={styles.location}>{item.location}</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Follow</Text>
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        fetchUsers();
    }, []);

    const ListHeader = () => {
        return null;
    };    

    return(
        <View style={styles.container}>
            <View style={styles.search}>
                {/* <Text style={styles.header}>Search</Text> */}
                <View style={styles.searchArea}>
                    <Text>{SearchIcon}</Text>
                    <TextInput 
                        style={styles.text} 
                        placeholder='search users'
                        //onChangeText={(search) => {queryUsersByUsername(search).then(setUsers)}}
                    />
                </View>
                { loading ?
                    (<ActivityIndicator size="large" color={theme.SECONDARY_COLOR} />)
                    :
                (<FlatList 
                    data={users} 
                    renderItem = {({item}) => (
                        <UserCard navigation={navigation} item={item} />
                    )}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={ListHeader}
                    ListFooterComponent={ListHeader}
                    showsVerticalScrollIndicator={false} 
                />)
                }
                
                {/* <View style={styles.userContainer}>
                    <Image style={styles.image} source={require('../assets/images/500.jpg')} />
                    <View style={{marginHorizontal: 10, width: '35%'}}>
                        <Text style={styles.username}>Anna Doe</Text>
                        <Text style={styles.location}>Johannesburg, ZA</Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Follow</Text>
                    </TouchableOpacity>
                </View> */}
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
    userContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems:'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,
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
        fontFamily: 'Nunito_700Bold',
    },
    text: {
        fontSize: 15,
        color: theme.SECONDARY_COLOR,
        fontFamily: 'Nunito_400Regular',
        marginLeft: 10,
    },
    searchResults: {
        flexDirection: 'row',
        marginTop: 10,
    },
    image: {
        height: 60,
        width: 60,
        marginRight: 10,
        borderRadius: 50,
    },
    location: {
        fontSize: 12,
        color: '#808080',
        fontFamily: 'Nunito_400Regular',
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 100,
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.SECONDARY_COLOR,
    }
});