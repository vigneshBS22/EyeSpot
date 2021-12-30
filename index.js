/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import React from 'react';

const Apps = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return <App />;
};

AppRegistry.registerComponent(appName, () => Apps);
