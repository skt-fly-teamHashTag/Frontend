import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import LoginForm from '../components/Form/LoginForm';
import BG_IMAGE from '../assets/splash.webp'

const Login = ({ navigation }) => {
  return (
    <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
      <LoginForm navigation={navigation} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: '100%', 
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Login;