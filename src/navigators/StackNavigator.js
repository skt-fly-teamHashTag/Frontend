import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/Main';
import GenerateVideo from '../screens/GenerateVideo';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen 
        name="Main" 
        component={Main} 
        options={{
          headerShown: false,
          headerShadowVisible: false
        }}/>
      <Stack.Screen 
        name="GenerateVideo" 
        component={GenerateVideo} 
        options={{
          headerShown: false,
          headerShadowVisible: false
        }}/>
    </Stack.Navigator>
  );
}

export { StackNavigator };