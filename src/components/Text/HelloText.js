import React from "react";
import { StyleSheet, Text } from 'react-native';
import { Icon } from '@rneui/themed';

const HelloText = ({ userName }) => {
  return (
    <Text style={styles.hello}>안녕하세요!
      <Text style={styles.name}> {userName}님 </Text>
      <Icon name='pencil' type='evilicon' size={16} color='lightgray' style={styles.edit}></Icon>
    </Text>
  );
};

const styles = StyleSheet.create({
  hello: {
    width: '100%',
    margin: 10,
    color: '#111'
  },
  name: {
    fontWeight: 'bold',
    color: '#111'
  },
  edit: {
    marginTop: 5,
    color: '#111'
  }
});

export default HelloText;