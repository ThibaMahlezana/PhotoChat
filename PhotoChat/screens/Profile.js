import React, { useContext, useState, useEffect } from 'react';
import {View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import theme from '../core/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import MaIcon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../navigation/AuthProvider';
import { db } from '../core/firebase';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';

import ImagesList from '../components/ImagesList';
import VideosList from '../components/VideosList';
import PostsList from '../components/PostsList';
 
const renderScene = SceneMap({
    first: ImagesList,
    second: VideosList,
    third: PostsList,
});


const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: theme.SECONDARY_COLOR }}
      renderIcon={props => getTabBarIcon(props)}
    />
);

const getTabBarIcon = (props) => {
    const {route} = props;
    if(route.key == 'first'){
        return <Icon name='md-images' size={20} color={'white'}/>
    }
    else if(route.key == 'second'){
        return <MaIcon name='video-collection' size={20} color={'white'}/>
    }
    else{
        return <Icon name='md-newspaper' size={20} color={'white'}/>
    }
}

export default function Profile({ navigation, route }){
    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first' },
        { key: 'second'},
        { key: 'third'},
    ]);

    const getUser = async() => {
        await db.collection('users')
        .doc( route.params ? route.params.userId : user.uid)
        .get()
        .then((documentSnapshot) => {
            if( documentSnapshot.exists ) {
                setUserData(documentSnapshot.data());
            }
        });
    }

    useEffect(() => {
        console.log(userData);
        getUser();
        navigation.addListener("focus", () => {
            setLoading(!loading)
        });
    }, [navigation, loading]);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                    style={styles.image} 
                    source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
                />
                <Text style={styles.name}>
                    {userData && userData.username}
                </Text>
                <Text style={styles.bio}>{userData && userData.bio}</Text>
                <View style={styles.buttons}>
                    {route.params ? (
                        <>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Follow</Text>
                        </TouchableOpacity>
                        </>
                    ) : (
                        <>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => {
                                navigation.navigate('EditProfile');
                              }}
                            >
                            <Text style={styles.text}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Logout</Text>
                        </TouchableOpacity>
                        </>
                    )}
                    
                </View>
                <View style={styles.line}/>
                <View style={styles.stats}>
                    <View style={styles.statItem}>
                        <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 12, color: '#808080'}}>Posts</Text>
                        <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 20, color: theme.SECONDARY_COLOR}}>487</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 12, color: '#808080'}}>Followers</Text>
                        <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 20, color: theme.SECONDARY_COLOR}}>23</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 12, color: '#808080'}}>Followings</Text>
                        <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 20, color: theme.SECONDARY_COLOR}}>314</Text>
                    </View>
                </View>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    name: {
        fontSize: 20,
        color: theme.SECONDARY_COLOR,
        marginVertical: 8,
        fontFamily: 'Nunito_700Bold',
    },
    bio: {
        color: '#808080',
        marginBottom: 5,
        fontFamily: 'Nunito_400Regular',
    },
    buttons: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    button: {
        backgroundColor: theme.SECONDARY_COLOR,
        marginRight: 10,
        padding: 5,
        borderRadius: 10,
    },
    text: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Nunito_400Regular',
    },
    line: {
        borderBottomColor: theme.LIGHTGREY,
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        marginVertical: 10,
        marginHorizontal: 16,
    },
    stats: {
        flexDirection: 'row',
    },
    statItem: {
        alignItems: 'center',
        marginHorizontal: 15,
    }
});