import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const IconTextButton = ({ iconName, iconType, iconColor, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.detailMenu} onPress={onPress}>
      <Icon 
        name={iconName} 
        type={iconType}
        color={iconColor} size={20}></Icon>
      <Text style={styles.menuText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  detailMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
    marginTop: 20,
    width: '40%',
  },
  menuText: {
    marginLeft: 10,
    color: '#111'
  },
});

export default IconTextButton;