import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const SubmitButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: "#384BF5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default SubmitButton;