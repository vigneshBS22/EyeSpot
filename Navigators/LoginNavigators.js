import React from 'react';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {LoginTab, RegisterStack} from '../constants';

const LoginTabScreen = () => {
  return (
    <LoginTab.Navigator>
      <LoginTab.Screen
        name="Login"
        options={{
          headerShown: false,
          tabBarLabel: 'Login',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="login" color={color} size={size} />
          ),
        }}>
        {props => <LoginScreen {...props} />}
      </LoginTab.Screen>
      <LoginTab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Register',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="adduser" color={color} size={size} />
          ),
        }}
      />
    </LoginTab.Navigator>
  );
};

export const LoginStackScreen = () => {
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen
        name="LoginScreen"
        options={{
          headerShown: false,
        }}>
        {props => <LoginTabScreen {...props} />}
      </RegisterStack.Screen>
      <RegisterStack.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}>
        {props => <ProfileScreen {...props} />}
      </RegisterStack.Screen>
    </RegisterStack.Navigator>
  );
};
