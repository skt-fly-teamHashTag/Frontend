import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import IconHorizontalScrollView from '../components/ScrollView/IconHorizontalScrollView';
import InputBottom from '../components/Bottom/InputBottom';

const Home = () => {
  return (
    <View style={styles.main}>
      <Image source={require("../assets/mainGif.gif")} style={styles.mainGif} />
      <IconHorizontalScrollView />
      <InputBottom />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%', 
    height: '100%',
    backgroundColor: '#FFFBFD'
  },
  mainGif: {
    width: '100%',
    height: 500,
    marginTop: '5%'
  },
});

export default Home;