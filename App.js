import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/store';

import MainStack from './src/navigators/MainStack';

// Importar o STACK
// - Preload - 'decide se vai pra usuário ou pra cadastro'
// - StarterStack
// - AppTab

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainStack />
    </PersistGate>
  </Provider>
)