import axios from "axios";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { URL } from '../api';
import { RNS3 } from 'react-native-aws3';
import { aws } from "../Keys";
import { useDispatch, useSelector } from "react-redux";
import SummaryText from "../components/Text/SummaryText";
import { setSummary } from "../slices/summarySlice";
import { setFeedData } from "../slices/feedSlice";

const Main = ({ navigation }) => {
  const dispatch = useDispatch();
  const summarizing = useSelector((state) => state.summary.summary);
  const data = useSelector((state) => state.feed.data);
  const user = useSelector((state) => state.user);

  const showCameraRoll = async() => {
    const pickVideo = await launchImageLibrary({ mediaType: 'video' });
    if (pickVideo.didCancel) {
      console.log('User cancelled video picker');
    } else if (pickVideo.errorCode) {
      console.log('ImagePicker Error: ', pickVideo.errorCode);
    } else if (pickVideo) {
      const videoData = {
        name: pickVideo.assets[0].fileName,
        type: pickVideo.assets[0].type,
        uri: pickVideo.assets[0].uri
      };

      const options = {
        keyPrefix: 'videos/',
        bucket: 'test-videodot-bucket',
        region: 'ap-northeast-2',
        accessKey: aws.accessKey,
        secretKey: aws.secretKey,
        successActionStatus: 201,
      }
      
      if (summarizing) {
        Alert.alert(
          "비디오 요약 실패",
          "지금은 다른 비디오를 요약중입니다.",
          [{text: "확인"}]
        );
        dispatch(setSummary({summary: false}));
      } else {
        navigation.navigate('Loading');
        const responseS3 = await RNS3.put(videoData, options);
        const postData = {
          userId: user.userId,
          videoPath: responseS3.body.postResponse.location
        }
        // [axios.post] location 정보를 백엔드에 전달하는 코드
        const responsePOST = await axios.post(URL.postVideo, postData);
      }
    }
  };

  const onPressMyFeed = () => {
    axios.get(URL.getMyFeeds + user.userId)
    .then(response => navigation.navigate('MyFeed', response.data.body.data))
    .catch(error => console.log(error));
  };

  const onPressFeedHome = () => {
    axios.get(URL.getAllFeeds)
    .then(response => {
      dispatch(setFeedData({...response.data.body}))
      navigation.navigate('FeedHome', response.data.body)
    })
    .catch(error => console.log(error));
  };

  return(
    <>
      { summarizing && <SummaryText /> }
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
          <TouchableOpacity style={styles.feedButton} onPress={onPressMyFeed}>
            <Text style={styles.feedText}>My 피드</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedButton} onPress={onPressFeedHome}>
            <Text style={styles.feedText}>피드 구경하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
    color: '#111'
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