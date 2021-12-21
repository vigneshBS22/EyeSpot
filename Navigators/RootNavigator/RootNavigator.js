import React, {useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {setUser, selectAuth, loginAsync} from '../../features/authSlice';

import {HomeStack, AuthStack} from '../../constants';
import WelcomeScreen from '../../screens/WelcomeScreen/WelcomeScreen';

import {LoginTabScreen} from '../LoginNavigator/LoginNavigators';
import {HomeTabScreen} from '../AuthNavigator/AuthNavigator';
import {useColor} from '../../Context/ColorContext';
import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {MyDarkTheme, MyTheme, ScreenName} from './constants';
import {COLOR_MODE} from '../../constants';

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const {name} = useSelector(selectAuth);
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

  return (
    <NavigationContainer
      theme={color === COLOR_MODE.LIGHT ? MyTheme : MyDarkTheme}>
      {name === '' ? (
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
  );
};
