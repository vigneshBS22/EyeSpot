import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import {NativeBaseProvider, extendTheme, themeTools} from 'native-base';

import {
  // HomeDrawer,
  HomeStack,
  HomeTab,
  LoginTab,
  RegisterStack,
  AuthStack,
} from './constants';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SettingScreen from './screens/SettingsScreen/SettingScreen';
import {useColor, ColorProvider} from './Context/ColorContext';

const LoginStackScreen = () => {
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

const LoginTabScreen = () => {
  return (
    <LoginTab.Navigator>
      <LoginTab.Screen
        name="Login"
        options={{
          headerShown: false,
          tabBarLabel: 'Login',
          tabBarIcon: ({color, size}) => (
            <Icon name="login" color={color} size={size} />
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
            <Icon name="adduser" color={color} size={size} />
          ),
        }}
      />
    </LoginTab.Navigator>
  );
};

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <HomeTab.Screen name="Anime" component={HomeScreen} />
      <HomeTab.Screen name="Games" component={HomeScreen} />
      <HomeTab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <Icon name="setting" color={color} size={size} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState();

  const theme = extendTheme({
    components: {
      Heading: {
        baseStyle: props => {
          return {
            color: themeTools.mode('red.300', 'blue.300')(props),
          };
        },
      },
    },
  });

  function RootNavigator() {
    const {
      state: {color},
    } = useColor();
    return (
      <NavigationContainer theme={color === 'light' ? DefaultTheme : DarkTheme}>
        {user === null ? (
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
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <ColorProvider>
      <NativeBaseProvider theme={theme}>
        <RootNavigator />
      </NativeBaseProvider>
    </ColorProvider>
  );
}
