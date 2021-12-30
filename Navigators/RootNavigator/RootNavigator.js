import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {NativeBaseProvider, useToast} from 'native-base';

import {
  selectAuth,
  loginAsync,
  updateError,
  updateUser,
} from '../../features/authSlice';
import WelcomeScreen from '../../screens/WelcomeScreen/WelcomeScreen';
import {LoginTabScreen} from '../LoginNavigator/LoginNavigators';
import {HomeTabScreen} from '../AuthNavigator/AuthNavigator';
import {useColor} from '../../Context/ColorContext';

import {MyDarkTheme, MyTheme, ScreenName} from './constants';
import {COLOR_MODE} from '../../constants';
import {HomeStack, AuthStack} from '../../constants';
import PasswordScreen from '../../screens/PasswordResetScreens/PasswordScreen';
import linking from '../../linking';
import EmailScreen from '../../screens/PasswordResetScreens/EmailScreen';

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const {login, click, error, error_msg} = useSelector(selectAuth);
  const {
    state: {color},
  } = useColor();

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      dispatch(loginAsync(user));
      if (user.displayName === null) {
        dispatch(updateUser(user.email));
      }
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (error === true) {
      toast.show({
        title: 'Login failed',
        status: 'error',
        description: error_msg === '' ? 'Please login again' : error_msg,
        duration: 3000,
        placement: 'top',
      });
      dispatch(updateError());
    }
  }, [error]);

  const toast = useToast();
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer
        linking={linking}
        theme={color === COLOR_MODE.LIGHT ? MyTheme : MyDarkTheme}>
        {!login ? (
          <AuthStack.Navigator>
            <AuthStack.Screen
              name={ScreenName.WELCOME_SCREEN}
              options={{headerShown: false}}
              component={WelcomeScreen}
            />
            <AuthStack.Screen
              name={ScreenName.LOGIN_SCREEN}
              options={{headerShown: false}}
              component={LoginTabScreen}
            />
            <AuthStack.Screen
              name={ScreenName.PASSWORD_SCREEN}
              component={PasswordScreen}
            />
            <AuthStack.Screen
              name={ScreenName.EMAIL_SCREEN}
              component={EmailScreen}
            />
          </AuthStack.Navigator>
        ) : (
          <HomeStack.Navigator>
            <HomeStack.Screen
              name={ScreenName.HOME_SCREEN}
              options={{headerShown: false}}
              component={HomeTabScreen}
            />
            <HomeStack.Screen
              name={ScreenName.PASSWORD_RESET_SCREEN}
              component={PasswordScreen}
            />
          </HomeStack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
