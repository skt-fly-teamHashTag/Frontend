import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const LeftIconButton = ({ leftSource, rightSource }) => {
  return (
    <View style={styles.rightMenu}>
      <Image 
        style={styles.rightIcon}
        source={leftSource} />
      <Image 
        style={styles.rightIcon}
        source={rightSource} />
    </View>
  );
};

const styles = StyleSheet.create({
  rightMenu: {
    flexDirection: 'row',
  },
  rightIcon: {
    width: 24,
    height: 24,
    marginRight: 15
  }
});

export default LeftIconButton;