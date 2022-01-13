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
} from '../../store/authSlice';
import WelcomeScreen from '../../screens/WelcomeScreen/WelcomeScreen';
import {LoginTabScreen} from '../LoginNavigator/LoginNavigators';
import {HomeTabScreen} from '../AuthNavigator/AuthNavigator';
import {useColor} from '../../Context/ColorContext';

import {MyDarkTheme, MyTheme, ScreenName, Title, TOAST} from './constants';
import {COLOR_MODE} from '../../constants';
import {HomeStack, AuthStack} from '../../constants';
import PasswordScreen from '../../screens/PasswordResetScreens/PasswordScreen';
import linking from '../../linking';
import EmailScreen from '../../screens/PasswordResetScreens/EmailScreen';
import {Appearance, useColorScheme} from 'react-native';

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const {login, error, error_msg} = useSelector(selectAuth);
  const {
    state: {color},
    dispatch: colorDispatch,
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
    if (error) {
      toast.show({
        title: TOAST.TITLE,
        status: TOAST.STATUS,
        description: error_msg === '' ? TOAST.ERROR : error_msg,
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

  let scheme = useColorScheme();

  Appearance.addChangeListener(res => {
    scheme = res.colorScheme;
  });

  useEffect(() => {
    colorDispatch({type: 'SET_COLOR', payload: scheme});
  }, [scheme]);

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
