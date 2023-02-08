import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { URL } from "../api";
import axios from "axios";

const Loading = ({ navigation, route }) => {
  const postData = route.params;
  
  const onPressHome = () => {
    navigation.navigate('Main');
  }

  const onPressFeed = () => {
    axios.get(URL.getAllFeeds)
    .then(response => navigation.navigate('FeedHome', response.data.body))
    .catch(error => console.log(error));
  }

  return (
    <View style={styles.loadingBox}>
      <Text style={styles.headerTitle}>A. Video</Text>
      <Text style={styles.loadingTitle}>{`내가 나타날 때까지 \n 잠시만 기다려줘!`}</Text>
      <Image source={require('../assets/loadingGif.gif')} style={styles.loadingGif} />
      <Text style={styles.loadingText}>비디오 요약중</Text>
      <View style={styles.feedBox}>
        <TouchableOpacity style={styles.feedButton} onPress={onPressHome}>
          <Text style={styles.feedText}>비디오 홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feedButton} onPress={onPressFeed}>
          <Text style={styles.feedText}>피드 구경하기</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
    color: '#111'
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 50,
    color: '#111'
  },
  loadingGif: {
    width: 150,
    height: 250,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 70,
    color: '#111'
  },
  feedBox: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  feedButton: {
    height: 40,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#384BF5',
    borderWidth: 1,
    borderRadius: 50,
    margin: 10,
  }, 
  feedText: {
    color: '#384BF5',
    fontWeight: 'bold'
  }
});

export default Loading;