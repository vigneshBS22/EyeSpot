import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

export const WelcomeStack = createNativeStackNavigator();
export const RegisterStack = createNativeStackNavigator();
export const HomeStack = createNativeStackNavigator();
export const LoginTab = createBottomTabNavigator();
export const HomeTab = createBottomTabNavigator();
// export const HomeDrawer = createDrawerNavigator();
