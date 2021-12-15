import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export const AuthStack = createNativeStackNavigator();
export const RegisterStack = createNativeStackNavigator();
export const HomeStack = createNativeStackNavigator();
export const LoginTab = createBottomTabNavigator();
export const HomeTab = createBottomTabNavigator();
