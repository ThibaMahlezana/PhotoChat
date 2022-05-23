
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
import Home from './screens/Feeds';
import Search from './screens/Search';

const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name="RestorePasswordScreen" component={RestorePasswordScreen} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterWithScreen" component={RegisterWithScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
