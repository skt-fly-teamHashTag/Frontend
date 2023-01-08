import React from "react";
import {StyleSheet, View, Text } from 'react-native';

const MenuBottomTextBox = () => {
  return (
    <View style={styles.bottom}>
      <Text style={styles.bottomText}>공지사항</Text>
      <Text style={{color: 'lightgray'}}>  |  </Text>
      <Text style={styles.bottomText}>이벤트</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 200,
  },
  bottomText: {
    color: 'gray'
  }
});

export default MenuBottomTextBox;