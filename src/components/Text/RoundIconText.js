import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from '@rneui/themed';

const RoundIconText = ({ iconName, iconType, iconColor, text }) => {
  return (
    <View style={styles.contentBtn}>
      <Icon 
        name={iconName}  
        color={iconColor} 
        type={iconType} 
        style={styles.iconStyle} size={24} />
      <Text style = {styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentBtn: {
    height: 50,
    backgroundColor: '#F4F6F9',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E9EAF3',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    margin: 5
  },
  iconStyle: {
    marginRight: 10,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 16
  },
});

export default RoundIconText;