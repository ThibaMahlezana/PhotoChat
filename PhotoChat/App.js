import React from 'react';
import {View, Text} from 'react-native'
import { AuthProvider } from './navigation/AuthProvider';
import Routes from './navigation/Routes'
import store from './redux/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </Provider>
  )
}

export default App;
