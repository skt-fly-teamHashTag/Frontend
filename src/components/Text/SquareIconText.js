import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from '@rneui/themed';

const SquareIconText = ({ iconName, iconType, iconColor, text }) => {
  return (
    <View style={styles.contentBtn}>
      <Icon 
        name={iconName}  
        color={iconColor} 
        type={iconType} 
        size={24} />
      <Text style = {styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentBtn: {
    backgroundColor: '#F4F6F9',
    width: 110,
    height: 70,
    borderRadius: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#111'
  }
});

export default SquareIconText;