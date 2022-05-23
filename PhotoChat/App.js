
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RestorePasswordScreen from './screens/RestorePasswordScreen';
import RegisterWithScreen from './screens/RegisterWithScreen';

// Signed in Screens
import Home from './screens/Feeds';
import Search from './screens/Search';
import Profile from './screens/Profile';
import AddPost from './screens/AddPost';
import Notifications from './screens/Notifications';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notifications">
        <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name="RestorePasswordScreen" component={RestorePasswordScreen} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterWithScreen" component={RegisterWithScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="AddPost" component={AddPost} options={{headerShown: false}}/>
        <Stack.Screen name="Notifications" component={Notifications} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
