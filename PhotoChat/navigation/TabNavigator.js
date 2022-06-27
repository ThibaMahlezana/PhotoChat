import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../core/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import ChatsHeader from '../components/ChatsHeader'

import Feeds from '../screens/Feeds'
import Search from '../screens/Search'
import AddPost from '../screens/AddPost'
import Profile from '../screens/Profile'
import EditProfile from '../screens/EditProfile'
import ChatsList from '../screens/ChatsList'
import Chats from '../screens/Chats'
import CustomHeader from "../components/CustomHeader"
import Comments from '../screens/Comments'
import Status from '../screens/Status'
import AddStatus from '../screens/AddStatus'
import VoiceCall from '../screens/VoiceCall'
import VideoCall from '../screens/VideoCall'
import Camera from '../screens/Camera'
import Save from '../screens/Save'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const HomeStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={Feeds}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='Comments'
                component={Comments}
            />
            <Stack.Screen 
                name='Status'
                component={Status}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='Add Status'
                component={AddStatus}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='Camera'
                component={Camera}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='Save'
                component={Save}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

const ChatsStack = ({navigation}) => {
    return(
        <ChatStack.Navigator>
            <ChatStack.Screen 
                name="ChatsList" 
                component={ChatsList}
                options={{headerShown: false, headerBackTitleVisible: false}}
            />
            <ChatStack.Screen 
                name="ChatsDetails"
                component={Chats}
                options={({route, navigation}) => ({
                    headerTitle: () => <ChatsHeader route={route} navigation={navigation} />,
                    //title: route.params.username,
                    headerBackVisible: false,
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: theme.PRIMARY_COLOR,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Nunito_700Bold',
                    },
                  })}
            />
            <ChatStack.Screen 
                name="Video Call" 
                component={VideoCall}
                options={{headerShown: false}}
            />
            <ChatStack.Screen 
                name="Voice Call" 
                component={VoiceCall}
                options={{headerShown: false}}
            />
        </ChatStack.Navigator>
    );
}

const ProfilesStack = () => {
    return(
        <ProfileStack.Navigator>
            <ProfileStack.Screen 
                name='Profile' 
                component={Profile}
                options={{headerShown: false}}
            />
            <ProfileStack.Screen 
                name='EditProfile'
                component={EditProfile}
                options={{headerShown: false}}
            />
        </ProfileStack.Navigator>
    );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            headerTitle: { headerTitle: (props) => <CustomHeader {...props} /> }
,           headerTintColor: '#fff',
            headerStyle: {backgroundColor: theme.PRIMARY_COLOR},
            tabBarStyle: {backgroundColor: theme.PRIMARY_COLOR},
            tabBarInactiveTintColor: '#fff',
            tabBarActiveTintColor: theme.SECONDARY_COLOR,
            tabBarActiveBackgroundColor: '#fff',
            tabBarItemStyle: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomEndRadius: 30,
                borderBottomStartRadius: 30,
            }
            
        }}>
        <Tab.Screen 
            name='Feeds' 
            component={HomeStack}
            options={({route}) => ({
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="home-outline" color={color} size={size} />
                ),
            })}
        />
        <Tab.Screen 
            name='Search' 
            component={Search}
            options={({route}) => ({
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="search" color={color} size={size} />
                ),
            })}
        />
        <Tab.Screen 
            name='Add Post' 
            component={AddPost}
            options={({route}) => ({
                tabBarIcon: ({color, size}) => (
                    <Feather name="plus-circle" color={color} size={size} />
                ),
            })}
        />
        <Tab.Screen 
            name='Profile' 
            component={ProfilesStack}
            options={({route}) => ({
                tabBarIcon: ({color, size}) => (
                    <Feather name="user" color={color} size={size} />
                ),
            })}
        />
        <Tab.Screen 
            name='Chats' 
            component={ChatsStack}
            options={({route, navigation}) => ({
                tabBarBadge: 3,
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="chatbubble-outline" size={22} color={color} />
                ),
               //headerTitle: (props) => <CustomHeader {...props} />

            })}
        />
    </Tab.Navigator>
  )
}

export default TabNavigator