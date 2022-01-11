import React from 'react';

import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {RootNavigator} from './src/Navigators/RootNavigator/RootNavigator';
import {ColorProvider} from './src/Context/ColorContext';

export default function App() {
  return (
    <Provider store={store}>
      <ColorProvider>
        <NativeBaseProvider>
          <RootNavigator />
        </NativeBaseProvider>
      </ColorProvider>
    </Provider>
  );
}
