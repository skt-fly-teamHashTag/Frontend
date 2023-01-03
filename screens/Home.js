import React from 'react';
import {
  StyleSheet, 
  View,
  Text,
  Image,
} from 'react-native';

const Home = () => {
  return (
    <View style={styles.main}>
      <Image 
        source={require("../images/mainGif.gif")}
        style={styles.mainGif} />
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
  contents: {
    width: '100%',
    height: 60,
    backgroundColor: '#F4F6F9'
  }
});

export default Home;