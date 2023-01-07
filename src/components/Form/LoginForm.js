import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../slices/userSlice';
import { StyleSheet, View, Alert } from 'react-native';
import LoginInput from '../Input/LoginInput';
import SubmitButton from '../Button/SubmitButton';

const LoginForm = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onPress = async() => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', user);
      if (response.data === "로그인 성공") {
        console.log("POST >>", user);
        navigation.navigate("Home");
      } 
    } catch(error) {
      console.log("ERROR>>", error)
    }
  };
  
  return (
    <View style={styles.loginForm}>
      <LoginInput 
        title='닉네임'
        onChangeText={(text) => dispatch(setUser({...user, nickName: text}))} />
      <LoginInput 
        title='전화번호'
        onChangeText={(text) => dispatch(setUser({...user, phoneNumber: text}))} />
      <SubmitButton 
        title='로그인'
        onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  loginForm: {
    width: '80%',
    backgroundColor: '#F4F6F9',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 20,
      },
    }),
  }
});

export default LoginForm;