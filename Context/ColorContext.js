import React, {createContext, useContext, useReducer} from 'react';
export const ColorContext = createContext();
export function useColor() {
  return useContext(ColorContext);
}

export function ColorProvider({children}) {
  const lightTheme = {
    bg: 'white',
    text: 'black',
    button: 'muted.700',
  };

  const darkTheme = {
    bg: 'black',
    text: 'white',
    button: 'muted.200',
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
    color: 'light',
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
