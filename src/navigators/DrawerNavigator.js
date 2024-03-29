import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from "../screens/Login";
import Home from "../screens/Home";
import Menu from '../screens/Menu';
import Main from "../screens/Main";
import LeftIconButton from "../components/Header/LeftIconButton";
import RightTwoIcon from "../components/Header/RightTwoImage";
import MenuHeader from "../components/Header/MenuHeader";
import { StackNavigator } from "./StackNavigator";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  const loginHeader = () => ({
    headerShown: false,
    headerShadowVisible: false,
  });

  const homeHeader = ({ navigation }) => ({
    title: '',
    headerLeft: () => (
      <LeftIconButton 
        source={require("../assets/menu.png")}
        onPress={() => navigation.openDrawer()} />
    ),
    headerRight: () => (
      <RightTwoIcon
        leftSource={require("../assets/more.png")}
        rightSource={require("../assets/notice.png")} />
    ),
    headerStyle: {backgroundColor: '#FFFBFD'},
    headerShadowVisible: false,
  });
  
  return (
    <Drawer.Navigator 
      initialRouteName='Login'
      drawerPosition='left'
      drawerContent={(props) => <Menu {...props} />}
      screenOptions={{
        drawerStyle: {width: '100%'},
        swipeEnabled: false
      }}>
      <Drawer.Screen 
        name='Login'
        component={Login} 
        options={loginHeader}/>
      <Drawer.Screen 
        name='Home'
        component={Home}
        options={homeHeader} />
      <Drawer.Screen 
        name='MainStack'
        component={StackNavigator}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator ;