import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from "../screens/Login";
import Home from "../screens/Home";
import Menu from '../screens/Menu';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View
} from 'react-native';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator 
      initialRouteName="Login"
      drawerPosition='left'
      drawerContent={(props) => <Menu {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '100%',
        },
      }}>
      <Drawer.Screen 
        name="Login" 
        component={Login} 
        options={{
          headerShown: false,
        }}/>
      <Drawer.Screen 
        name="Home" 
        component={Home}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image 
                style={styles.leftIcon}
                source={require("../images/menu.png")} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.rightMenu}>
              <Image 
                style={styles.rightIcon}
                source={require("../images/more.png")} />
              <Image 
                style={styles.rightIcon}
                source={require("../images/notice.png")} />
            </View>
          ),
          headerStyle: {backgroundColor: '#FFFBFD'},
          headerShadowVisible: false,
        })} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  rightMenu: {
    flexDirection: 'row',
  },
  leftIcon: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  rightIcon: {
    width: 24,
    height: 24,
    marginRight: 15
  }
});

export default DrawerNavigator ;