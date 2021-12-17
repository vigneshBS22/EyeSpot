import React, {useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {setUser, selectAuth} from '../features/authSlice';
import firestore from '@react-native-firebase/firestore';

import {HomeStack, AuthStack} from '../constants';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';

import {LoginStackScreen} from './LoginNavigators';
import {HomeTabScreen} from './AuthNavigator';
import {useColor} from '../Context/ColorContext';
import auth from '@react-native-firebase/auth';

import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#818cf8',
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#818cf8',
  },
};

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const {name} = useSelector(selectAuth);
  const {
    state: {color},
  } = useColor();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    if (user) {
      const docRef = firestore().collection('Users').doc(user.uid);
      const doc = await docRef.get();
      let details = doc.data();
      dispatch(setUser(details));
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer theme={color === 'light' ? MyTheme : MyDarkTheme}>
      {name === '' ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="WelcomeScreen"
            options={{headerShown: false}}
            component={WelcomeScreen}
          />
          <AuthStack.Screen name="Login" options={{headerShown: false}}>
            {props => <LoginStackScreen {...props} />}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      ) : (
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="HomeScreen"
            options={{headerShown: false}}
            component={HomeTabScreen}
          />
        </HomeStack.Navigator>
      )}
    </NavigationContainer>
  );
};
