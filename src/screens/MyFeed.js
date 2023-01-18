import React from "react";
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const MyFeed = ({ navigation }) => {
  const videoUri = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  const loadingUri = "/Users/in-yeong/iykim/videoDot/src/assets/videoLoadingGif.gif";

  return (
    <View style={styles.container}>
      <Image source={require('../assets/userPhoto.png')} style={styles.userImage} />
      <Text style={styles.userName}>해시태그닷</Text>
      <ScrollView style={styles.feedScroll} bounces={false}>
        <View style={styles.userVideoBox}>
          <Image source={require('../assets/gallery.jpeg')} style={styles.userThumbNail} />
          <Image source={require('../assets/gallery.jpeg')} style={styles.userThumbNail} />
          <Image source={require('../assets/gallery.jpeg')} style={styles.userThumbNail} />
          <Image source={require('../assets/gallery.jpeg')} style={styles.userThumbNail} />
          <Image source={require('../assets/gallery.jpeg')} style={styles.userThumbNail} />
          <Image source={require('../assets/gallery.jpeg')} style={styles.userThumbNail} />
          <Image source={require('../assets/gallery.jpeg')} style={styles.userThumbNail} />
          <Image source={require('../assets/gallery.jpeg')} style={styles.userThumbNail} />
        </View>
      </ScrollView>
      <View style={styles.feedBox}>
        <TouchableOpacity style={styles.feedButton} onPress={()=>navigation.navigate('Main')}>
          <Text style={styles.feedText}>비디오 홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feedButton} onPress={()=>navigation.navigate('FeedHome')}>
          <Text style={styles.feedText}>피드 구경하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBFD',
    height: '100%',
    alignItems: 'center'
  },
  userImage: {
    width: 80,
    height: 70,
    margin: 20,
    marginBottom: 0
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 15
  },
  feedScroll: {
    height: '80%',
    width: '100%',
  },
  userVideoBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userThumbNail: {
    width: '33%',
    height: wp('30%'),
    backgroundColor: '#F4F6F9',
    margin: 0.5
  },
  feedBox: {
    position: 'absolute',
    bottom: 100,
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

export default MyFeed;