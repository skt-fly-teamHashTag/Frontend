import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserId } from '../../slices/userSlice';
import { StyleSheet, KeyboardAvoidingView, Alert, View } from 'react-native';
import LoginInput from '../Input/LoginInput';
import SubmitButton from '../Button/SubmitButton';
import { URL } from '../../api';

const LoginForm = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const fillAll = () => {
    return user.nickName !== "" && user.phoneNumber !== "";
  };

  const showFailAlert = () => {
    Alert.alert(
      "로그인 실패",
      "로그인 정보를 다시 확인해주세요.",
      [{text: "확인"}]
    );
  };

  const showNetworkAlert = () => {
    Alert.alert(
      "로그인 실패",
      "네트워크를 확인해주세요.",
      [{text: "확인"}]
    );
  };

  const onPress = async() => {
    try {
      const response = await axios.post(URL.postLogin, user);
      if (fillAll() && response.data.statusCode === 201) {
        dispatch(setUserId(response.data.body.user.id));
        navigation.navigate("Home");
      } else {
        showFailAlert();
      }
    } catch(error) {
      console.log("ERROR>>", error);
      showNetworkAlert();
    }
  };
  
  return (
    <KeyboardAvoidingView behavior="padding" style={{width: '100%', alignItems: 'center'}}>
      <View style={styles.loginForm}>
        <LoginInput 
          title='닉네임'
          keyboardType='default'
          onChangeText={(text) => dispatch(setUser({...user, nickName: text}))} />
        <LoginInput 
          title='전화번호'
          keyboardType='numeric'
          onChangeText={(text) => dispatch(setUser({...user, phoneNumber: text}))} />
        <SubmitButton 
          title='로그인'
          onPress={onPress} />
      </View>
    </KeyboardAvoidingView>
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