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
import Menu from './screens/Menu';
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true}></StatusBar>
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
            options={({ navigation }) => ({
              title: '',
              headerLeft: () => (
                <TouchableOpacity onPress={()=> navigation.navigate("Menu")}>
                  <Image 
                  style={styles.menuIcon}
                  source={require("./images/menu.png")} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <>
                  <Image 
                  style={styles.menuIcon}
                  source={require("./images/more.png")} />
                  <Image 
                  style={styles.menuIcon}
                  source={require("./images/notice.png")} />
                </>
              ),
              headerStyle: {backgroundColor: '#FFFBFD'},
              headerShadowVisible: false,
            })}/>
            <Stack.Screen 
            name="Menu" 
            component={Menu} 
            options={{
              headerShown: false,
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    width: 24,
    height: 24,
    margin: 5
  }
});

export default App;

