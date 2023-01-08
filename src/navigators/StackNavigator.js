import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/Main';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen 
        name="Main" 
        component={Main} 
        options={{
          headerShadowVisible: false
        }}/>
    </Stack.Navigator>
  );
}

export { StackNavigator };