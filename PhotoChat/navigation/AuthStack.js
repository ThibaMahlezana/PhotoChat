import react from "react";
import {View, Text} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Start from "../screens/StartScreen";
import Login from "../screens/LoginScreen";
import RegisterWith from "../screens/RegisterWithScreen";
import Register from "../screens/RegisterScreen";
import RestorePassword from "../screens/RestorePasswordScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="StartScreen"
                component={Start}/>
            <Stack.Screen 
                name="Login"
                component={Login}/>
            <Stack.Screen 
                name="RegisterWith"
                component={RegisterWith}/>
            <Stack.Screen 
                name="Register"
                component={Register}/>
            <Stack.Screen 
                name="RestorePassword"
                component={RestorePassword}/>
        </Stack.Navigator>
    );
}

export default AuthStack;