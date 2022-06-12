import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RestorePasswordScreen from '../screens/RestorePasswordScreen';
import RegisterWithScreen from '../screens/RegisterWithScreen';

const screens = {
    Home: {
        screen: StartScreen
    },
    Login: {
        screen: LoginScreen
    },
    Register: {
        screen: RegisterScreen
    },
    RestorePassword: {
        screen: RestorePasswordScreen,
    },
    RegisterWith: {
        screen: RegisterWithScreen
    }
}

const HomeStack = createNativeStackNavigator(screens);
export default NavigationContainer(HomeStack);