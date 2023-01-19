import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/Main';
import FeedHome from '../screens/FeedHome';
import FeedDetail from '../screens/FeedDetail';
import GenerateVideo from '../screens/GenerateVideo';
import Search from '../screens/Search';
import SearchResult from '../screens/SearchResult';
import MyFeed from '../screens/MyFeed';
import LeftIconButton from "../components/Header/LeftIconButton";
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { useDispatch } from "react-redux";
import { setSearch } from '../slices/searchSlice';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

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

  const onPressClose = (navigation) => {
    dispatch(setSearch({inputText: ''}));
    navigation.navigate('Main');
  };

  const videoHeader = ({ navigation }) => ({
    title: 'A. Video',
    headerLeft: () => (<></>),
    headerRight: () => (
      <TouchableOpacity onPress={() => onPressClose(navigation)}>
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
      <Stack.Screen 
        name="FeedDetail" 
        component={FeedDetail} 
        options={videoHeader}/>
      <Stack.Screen 
        name="Search" 
        component={Search} 
        options={videoHeader}/>
      <Stack.Screen 
        name="SearchResult" 
        component={SearchResult} 
        options={videoHeader}/>
      <Stack.Screen 
        name="MyFeed" 
        component={MyFeed} 
        options={videoHeader}/>
    </Stack.Navigator>
  );
}

export { StackNavigator };