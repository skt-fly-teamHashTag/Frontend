import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const Main = () => {
  return(
    <View style={styles.main}>
      <View style={styles.noticeBox}>
        <Text style={styles.noticeText}>
          {`편집하고 싶은 \n영상을 앨범에서 \n선택해줘!`}</Text>
        <Image source={require('../assets/videoGif.gif')} style={styles.noticeGif} />
      </View>
      <TouchableOpacity style={styles.gallery}>
        <Image source={require('../assets/gallery.jpeg')} style={styles.galleryImage} />
        <Text style={styles.galleryText}>앨범에서 선택하기</Text>
      </TouchableOpacity>
      <View style={styles.feedBox}>
        <TouchableOpacity style={styles.feedButton}>
          <Text style={styles.feedText}>My 피드</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feedButton}>
          <Text style={styles.feedText}>피드 구경하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FEFBFD',
    width: '100%',
    height: '100%'
  },
  noticeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noticeText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  noticeGif: {
    width: 160,
    height: 220,
  },
  gallery: {
    alignItems: 'center',
    margin: 50
  },
  galleryImage: {
    width: 200,
    height: 200
  },
  galleryText: {
    color: '#0F1735',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10
  },
  feedBox: {
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

export default Main;