import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Box, NativeBaseProvider, useToast} from 'native-base';

import {selectAuth, loginAsync, updateError} from '../../features/authSlice';
import WelcomeScreen from '../../screens/WelcomeScreen/WelcomeScreen';
import {LoginTabScreen} from '../LoginNavigator/LoginNavigators';
import {HomeTabScreen} from '../AuthNavigator/AuthNavigator';
import {useColor} from '../../Context/ColorContext';

import {MyDarkTheme, MyTheme, ScreenName} from './constants';
import {COLOR_MODE} from '../../constants';
import {HomeStack, AuthStack} from '../../constants';

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const {login, name, error, error_msg} = useSelector(selectAuth);
  const {
    state: {color},
  } = useColor();

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      dispatch(loginAsync(user));
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

  useEffect(() => {
    if (name !== null) {
      toast.show({
        title:
          login === true ? 'Logged in successfully' : 'Logged out successfully',
        status: 'success',
        duration: 2000,
        placement: 'top',
      });
    }
  }, [login]);

  const toast = useToast();

  return (
    <NativeBaseProvider>
      <NavigationContainer
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
          </AuthStack.Navigator>
        ) : (
          <HomeStack.Navigator>
            <HomeStack.Screen
              name={ScreenName.HOME_SCREEN}
              options={{headerShown: false}}
              component={HomeTabScreen}
            />
          </HomeStack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
