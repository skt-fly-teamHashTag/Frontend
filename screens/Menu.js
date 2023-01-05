import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Icon } from '@rneui/themed';

const Menu = (props) => {
  return (
    <View style={styles.menu}>
      <View style={styles.headerRight}>
        <Icon name="setting" size={24} style={styles.headerIcon} type='ant-design' />
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Icon name="close" size={24} style={styles.headerIcon} type='ant-design' />
        </TouchableOpacity>
      </View>
      <Text>메뉴 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    position: 'absolute',
    right: 0,
    top: 40,
    flexDirection: 'row'
  },
  headerIcon:{
    marginRight: 20
  },
  menu: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Menu;