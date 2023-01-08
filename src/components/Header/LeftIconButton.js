import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

const LeftIconButton = ({ source, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.leftIcon} source={source} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftIcon: {
    width: 24,
    height: 24,
    marginLeft: 15,
  }
});

export default LeftIconButton;