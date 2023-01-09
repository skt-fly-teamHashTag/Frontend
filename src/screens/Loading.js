import React from "react";
import { StyleSheet, Text, Image, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loadingBox}>
      <Text style={styles.headerTitle}>A. Video</Text>
      <Text style={styles.loadingTitle}>{`내가 나타날 때까지 \n 잠시만 기다려줘!`}</Text>
      <Image source={require('../assets/loadingGif.gif')} style={styles.loadingGif} />
      <Text style={styles.loadingText}>비디오 요약중</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingBox: {
    backgroundColor: '#FFFBFD',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 70
  },
  loadingGif: {
    width: 150,
    height: 250,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 70
  }
});

export default Loading;