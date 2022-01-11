import React, {createContext, useContext, useReducer} from 'react';
import {useColorScheme} from 'react-native';
import {COLOR_MODE} from '../constants';

export const ColorContext = createContext();
export function useColor() {
  return useContext(ColorContext);
}

export function ColorProvider({children}) {
  let scheme = useColorScheme();
  const lightTheme = {
    bg: 'white',
    text: 'black',
    primary: 'indigo.400',
    button: '#404040',
    inputbg: 'white',
    homeScreenbg: 'white',
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
    infoCardbg: 'indigo.100',
    itemDiscussionBg: '#f2f2f2',
  };

  const darkTheme = {
    homeScreenbg: 'black',
    bg: '#262626',
    text: 'white',
    button: '#e5e5e5',
    inputbg: '#404040',
    shadow: {},
    infoCardbg: 'indigo.400',
    primary: 'indigo.400',
    itemDiscussionBg: 'black',
  };

  function reducerFunc(state, action) {
    switch (action.type) {
      case 'TOGGLE_COLOR':
        return {
          ...state,
          color:
            state.color === COLOR_MODE.LIGHT
              ? COLOR_MODE.DARK
              : COLOR_MODE.LIGHT,
          theme: state.color === COLOR_MODE.LIGHT ? darkTheme : lightTheme,
        };
      case 'SET_COLOR':
        return {
          ...state,
          color: action.payload,
          theme: action.payload === COLOR_MODE.LIGHT ? lightTheme : darkTheme,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducerFunc, {
    color: scheme,
    theme: scheme === COLOR_MODE.LIGHT ? lightTheme : darkTheme,
  });

  return (
    <ColorContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </ColorContext.Provider>
  );
}
