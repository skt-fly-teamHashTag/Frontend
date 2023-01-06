import React, { useState, useEffect } from 'react';
import {
  StyleSheet, 
  TextInput, 
  View,
  ImageBackground,
  Text,
  TouchableOpacity
} from 'react-native';

import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../slices/userSlice';
import DrawerNavigator from '../DrawerNavigator';

const CustomButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={props.onPress}>
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const LoginModal = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onPress = async() => {
    try { // 로그인 정보 POST
      const response = await axios.post('http://172.23.255.72:8080/api/v1/auth/login', user);
      if (response.data === "로그인 성공") {
        console.log("POST >>", user);
        navigation.navigate("Home");
      }
    } catch(error) {
      console.log("ERROR>>", error.data)
    }
  };

  return (
    <View style={styles.loginModal}>
      <Text style={styles.textTitle}>닉네임</Text>
      <TextInput 
        style={styles.textInput}
        onChangeText={(text) => dispatch(setUser({...user, nickName: text}))}></TextInput>
      <Text style={styles.textTitle}>전화번호</Text>
      <TextInput 
        onChangeText={(text) => dispatch(setUser({...user, phoneNumber: text}))}
        style={styles.textInput}></TextInput>
      <CustomButton title='로그인' onPress={onPress}></CustomButton>
    </View>
  );
};

const Login = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require("../images/splash.webp")} 
      style={styles.bgImage}>
      <LoginModal navigation={navigation}></LoginModal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: '100%', 
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  loginModal: {
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
  },
  textTitle: {
    alignSelf: 'flex-start',
    margin: 5,
    fontSize: 16
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 5,
    marginBottom: 10,
    padding: 10
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: "#384BF5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Login;