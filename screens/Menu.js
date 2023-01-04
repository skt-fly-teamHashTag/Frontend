import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const Menu = (props) => {
  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Text>메뉴 화면</Text>
      </TouchableOpacity>
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