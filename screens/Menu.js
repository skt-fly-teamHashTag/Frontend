import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const Menu = () => {
  return (
    <View style={styles.menu}>
      <Text>메뉴 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Menu;