import React from 'react';
import {
  StyleSheet, 
  TextInput, 
  View,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native';

const Home = () => {
  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <Text>메인화면입니다 :)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%', 
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Home;