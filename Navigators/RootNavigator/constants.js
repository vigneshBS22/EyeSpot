import {DefaultTheme, DarkTheme} from '@react-navigation/native';

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#818cf8',
  },
};

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#818cf8',
  },
};

export const ScreenName = {
  WELCOME_SCREEN: 'WelcomeScreen',
  LOGIN_SCREEN: 'LoginScreen',
  HOME_SCREEN: 'HomeScreen',
  PASSWORD_SCREEN: 'Password',
  PASSWORD_RESET_SCREEN: 'Password Reset',
  EMAIL_SCREEN: 'Email',
};
