/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigators/DrawerNavigator';
import { StatusBar } from 'react-native';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={'transparent'} 
        translucent={true} />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

