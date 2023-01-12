import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/Main';
import FeedHome from '../screens/FeedHome';
import GenerateVideo from '../screens/GenerateVideo';
import LeftIconButton from "../components/Header/LeftIconButton";
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  const mainHeader = ({ navigation }) => ({
    title: 'A. Video',
    headerLeft: () => (
      <LeftIconButton 
        source={require("../assets/menu.png")}
        onPress={() => navigation.openDrawer()}
        style={{marginLeft: 5}} />
    ),
    headerStyle: {backgroundColor: '#FFFBFD'},
    headerShadowVisible: false,
  });

  const videoHeader = ({ navigation }) => ({
    title: 'A. Video',
    headerLeft: () => (<></>),
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Icon  name='close' type='ant-design' size={24} style={{ marginRight: 5,  }} />
      </TouchableOpacity>
    ),
    headerStyle: {backgroundColor: '#FFFBFD'},
    headerShadowVisible: false,
  });
  
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen 
        name="Main" 
        component={Main} 
        options={mainHeader}/>
      <Stack.Screen 
        name="GenerateVideo" 
        component={GenerateVideo} 
        options={videoHeader}/>
      <Stack.Screen 
        name="FeedHome" 
        component={FeedHome} 
        options={videoHeader}/>
    </Stack.Navigator>
  );
}

export { StackNavigator };