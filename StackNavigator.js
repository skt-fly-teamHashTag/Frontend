import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import DrawerNavigator from './DrawerNavigator';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={DrawerNavigator} 
        options={{
          headerShown: false,
        }}/>
    </Stack.Navigator>
  );
}

export { StackNavigator };