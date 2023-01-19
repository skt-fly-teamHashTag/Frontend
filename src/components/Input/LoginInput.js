import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const LoginInput = ({ title, onChangeText }) => {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.textTitle}>{title}</Text>
      <TextInput 
        style={styles.textInput} 
        onChangeText={onChangeText}
        autoCapitalize='none'
        keyboardType='default' />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    width: '100%'
  },
  textTitle: {
    fontSize: 14,
  },
  textInput: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff'
  },
});

export default LoginInput;