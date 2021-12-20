import React from 'react';
import RegisterScreen from '../../screens/RegisterScreen/RegisterScreen';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {LoginTab, RegisterStack} from '../../constants';
import {ScreenName} from './constants';

const LoginTabScreen = () => {
  return (
    <LoginTab.Navigator>
      <LoginTab.Screen
        name={ScreenName.LOGIN_SCREEN}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="login" color={color} size={size} />
          ),
        }}>
        {props => <LoginScreen {...props} />}
      </LoginTab.Screen>
      <LoginTab.Screen
        name={ScreenName.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{
          headerShown: false,
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
        name={ScreenName.LOGIN_TAB_SCREEN}
        options={{
          headerShown: false,
        }}
        component={LoginTabScreen}
      />
      <RegisterStack.Screen
        name={ScreenName.PROFILE_SCREEN}
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
      />
    </RegisterStack.Navigator>
  );
};
