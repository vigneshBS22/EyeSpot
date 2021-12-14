import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  // HomeDrawer,
  HomeStack,
  HomeTab,
  LoginTab,
  RegisterStack,
  WelcomeStack,
} from './constants';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginStackScreen = ({setLogin}) => {
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen
        name="LoginScreen"
        options={{
          headerShown: false,
        }}>
        {props => <LoginTabScreen {...props} setLogin={setLogin} />}
      </RegisterStack.Screen>
      <RegisterStack.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}>
        {props => <ProfileScreen {...props} setLogin={setLogin} />}
      </RegisterStack.Screen>
    </RegisterStack.Navigator>
  );
};

const LoginTabScreen = ({setLogin}) => {
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
        {props => <LoginScreen {...props} setLogin={setLogin} />}
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
      <HomeTab.Screen name="Settings" component={HomeScreen} />
    </HomeTab.Navigator>
  );
};

// GoogleSignin.configure({
//   webClientId:
//     '808934789184-5b2tv6gqiop60ltiovld6go3aape04kp.apps.googleusercontent.com',
// });

export default function App() {
  const [login, setLogin] = useState(false);

  return (
    <NavigationContainer>
      {login === false ? (
        <WelcomeStack.Navigator>
          <WelcomeStack.Screen
            name="WelcomeScreen"
            options={{headerShown: false}}
            component={WelcomeScreen}
          />
          <WelcomeStack.Screen name="Login" options={{headerShown: false}}>
            {props => <LoginStackScreen {...props} setLogin={setLogin} />}
          </WelcomeStack.Screen>
        </WelcomeStack.Navigator>
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
