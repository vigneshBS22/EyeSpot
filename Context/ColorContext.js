import React, {createContext, useContext, useReducer} from 'react';
import {useColorScheme} from 'react-native';

export const ColorContext = createContext();
export function useColor() {
  return useContext(ColorContext);
}

export function ColorProvider({children}) {
  const scheme = useColorScheme();

  const lightTheme = {
    bg: 'white',
    text: 'black',
    button: 'muted.700',
    inputbg: 'white',
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
  };

  const darkTheme = {
    bg: 'black',
    text: 'white',
    button: 'muted.200',
    inputbg: '#404040',
    shadow: {},
  };

  function reducerFunc(state, action) {
    switch (action.type) {
      case 'TOGGLE_COLOR':
        return {
          ...state,
          color: state.color === 'light' ? 'dark' : 'light',
          theme: state.color === 'light' ? darkTheme : lightTheme,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducerFunc, {
    color: scheme,
    theme: lightTheme,
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
