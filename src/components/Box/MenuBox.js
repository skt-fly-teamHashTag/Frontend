import React from "react";
import { StyleSheet, View } from 'react-native';
import { Icon } from '@rneui/themed';
import MenuDetailBox from '../Box/MenuDetailBox';

const MenuBox = ({ navigation }) => {
  return (
    <View style={styles.menuBox}>
      <MenuDetailBox title='편하닷' navigation={navigation} />
      <View style={styles.line}></View>
      <MenuDetailBox title='궁금하닷' />
      <View style={styles.line}></View>
      <MenuDetailBox title='재미있닷' />
    </View>
  );
};

const styles = StyleSheet.create({
  menuBox: {
    width: '100%',
    paddingTop: 15,
  },
  line: {
    marginTop: 20,
    marginBottom: 20,
    borderTopWidth: 1 ,
    borderColor: 'lightgray'
  },
});

export default MenuBox;