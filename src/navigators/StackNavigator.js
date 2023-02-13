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
import VideoFullscreen from "../screens/VideoFullscreen";
import Loading from "../screens/Loading";
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from '../slices/searchSlice';
import axios from 'axios';
import { URL } from '../api';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  const mainHeader = ({ navigation }) => ({
    title: 'A. Video',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <LeftIconButton 
        source={require("../assets/menu.png")}
        onPress={() => navigation.openDrawer()}
        style={{marginLeft: 5}} />
    ),
    headerStyle: {backgroundColor: '#FFFBFD'},
    headerShadowVisible: false,
  });

  const onPressVideoClose = (navigation) => {
    dispatch(setSearch({inputText: ''}));
    navigation.navigate('Main');
    axios.put(URL.putUserId, {userId});
  };

  const videoHeader = ({ navigation }) => ({
    title: 'A. Video',
    headerTitleAlign: 'center',
    headerLeft: () => (<></>),
    headerRight: () => (
      <TouchableOpacity onPress={() => onPressVideoClose(navigation)}>
        <Icon  name='close' type='ant-design' size={24} style={{ marginRight: 5 }} />
      </TouchableOpacity>
    ),
    headerStyle: {backgroundColor: '#FFFBFD'},
    headerShadowVisible: false,
  });

  const onPressClose = (navigation) => {
    dispatch(setSearch({inputText: ''}));
    navigation.navigate('Main');
  };

  const defaultHeader = ({ navigation }) => ({
    title: 'A. Video',
    headerTitleAlign: 'center',
    headerLeft: () => (<></>),
    headerRight: () => (
      <TouchableOpacity onPress={() => onPressClose(navigation)}>
        <Icon  name='close' type='ant-design' size={24} style={{ marginRight: 5 }} />
      </TouchableOpacity>
    ),
    headerStyle: {backgroundColor: '#FFFBFD'},
    headerShadowVisible: false,
  });

  const fullscreenHeader = () => ({
    headerShown: false,
    headerShadowVisible: false,
  })
  
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
        options={defaultHeader}/>
      <Stack.Screen 
        name="FeedDetail" 
        component={FeedDetail} 
        options={defaultHeader}/>
      <Stack.Screen 
        name="Search" 
        component={Search} 
        options={defaultHeader}/>
      <Stack.Screen 
        name="SearchResult" 
        component={SearchResult} 
        options={defaultHeader}/>
      <Stack.Screen 
        name="MyFeed" 
        component={MyFeed} 
        options={defaultHeader}/>
      <Stack.Screen 
        name='VideoFullscreen'
        component={VideoFullscreen}
        options={fullscreenHeader} />
      <Stack.Screen 
        name='Loading'
        component={Loading}
        options={fullscreenHeader} />
    </Stack.Navigator>
  );
}

export { StackNavigator };