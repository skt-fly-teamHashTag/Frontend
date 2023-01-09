import axios from "axios";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';

const Main = ({ navigation }) => {
  const showCameraRoll = async() => {
    const videoData = {
      name: '',
      type: '',
      uri: ''
    };

    const pickVideo = await launchImageLibrary({ mediaType: 'image' });
    if (pickVideo.didCancel) {
      console.log('User cancelled video picker');
    } else if (pickVideo.errorCode) {
      console.log('ImagePicker Error: ', pickVideo.errorCode);
    } else if (pickVideo) {
      videoData.name = pickVideo.assets[0].fileName;
      videoData.type = pickVideo.assets[0].type;
      videoData.uri = Platform.OS === 'android'? pickVideo.assets[0].uri: pickVideo.assets[0].uri.replace('file://','');

      const formData = new FormData();
      formData.append('video', videoData);

      const header = {
        'Context-Type': 'multipart/form-data',
      };

      const response = await axios.post('http://localhost:8080/api/v1/auth/video', formData, {headers: header});
      console.log(response);
      navigation.navigate('Loading');
    }

    
  };

  return(
    <View style={styles.main}>
      <View style={styles.noticeBox}>
        <Text style={styles.noticeText}>
          {`편집하고 싶은 \n영상을 앨범에서 \n선택해줘!`}</Text>
        <Image source={require('../assets/videoGif.gif')} style={styles.noticeGif} />
      </View>
      <TouchableOpacity style={styles.gallery} onPress={showCameraRoll}>
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