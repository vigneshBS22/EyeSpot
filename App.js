import React from 'react';

import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {RootNavigator} from './Navigators/RootNavigator';
import {ColorProvider} from './Context/ColorContext';

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
