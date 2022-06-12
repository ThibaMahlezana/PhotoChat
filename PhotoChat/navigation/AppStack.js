import react from "react";
import {View, Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import Home from "../screens/Feeds";
import Settings from "../screens/Settings";
import Notifications from "../screens/Notifications";
import TabNavigator from "./TabNavigator";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return(
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{headerShown: false}}
            >
            <Drawer.Screen
                name="Home"
                component={TabNavigator}
                options={{
                    drawerIcon: ({color}) => (
                      <Ionicons name="home-outline" size={22} color={color} />
                    ),
                  }}
            />
            <Drawer.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    drawerIcon: ({color}) => (
                      <Feather name="bell" size={22} color={color} />
                    ),
                  }}
            />
            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    drawerIcon: ({color}) => (
                      <Ionicons name="settings-outline" size={22} color={color} />
                    ),
                  }}
            />
        </Drawer.Navigator>
    );
}

export default AppStack;