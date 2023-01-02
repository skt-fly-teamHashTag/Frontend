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
import { Provider } from "react-redux";
import store from "./store";

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};

export default App;

