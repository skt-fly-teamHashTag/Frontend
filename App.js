/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import Login from './screens/Login';
import Home from './screens/Home';
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{
              headerShown: false,
            }}/>
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={{
              headerShown: false,
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

