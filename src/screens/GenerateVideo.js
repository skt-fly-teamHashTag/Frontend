import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Dimensions, NativeModules } from "react-native";
import Video from "react-native-video";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from '../slices/videoSlice';
import RNFS from 'react-native-fs';
import axios from "axios";
import { postURL, URL } from '../api';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from 'react-native-toast-message';
import ProgressBar from 'react-native-progress/Bar';

const width = Dimensions.get('window').width;

const GenerateVideo = ({ navigation }) => {
  const [rate, setRate] = useState(0);
  const { nickName } = useSelector((state) => state.user);
  const { title } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const toastConfig = {
    saveToast: ({ text1, props }) => (
      <View style={styles.toastBox}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    )
  };

  const showToast = () => {
    Toast.show({
      type: "saveToast",
      text1: "앨범에 저장되었습니다.",
      position: "bottom",
      visibilityTime: 3000
    })
  }

  // axios.get으로 모델로부터 받아올 데이터
  const videoUri = "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";
  const loadingUri = "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif";
  const hashTags = '#V #목적없이떠나는여행 #꼬막비빔밥';
  const splitURL = videoUri.split('/');
  const videoName = splitURL[splitURL.length - 1];

  // 비디오 다운로드 경로
  const RNFetchBlob = NativeModules.RNFetchBlob;
  const path = RNFetchBlob.DownloadDir;
  const LOCAL_PATH_TO_VIDEO = Platform.OS === 'ios' ? `${RNFS.DocumentDirectoryPath}/${videoName}` : `${path}/${videoName}`;

  const save = () => {
    CameraRoll.save(LOCAL_PATH_TO_VIDEO, videoName);
    showToast();
  }

  const onPressSave = () => {
    RNFS.downloadFile({
      fromUrl: videoUri, 
      toFile: LOCAL_PATH_TO_VIDEO,
      begin: (res) => {},
      progress: (res) => setRate((res.bytesWritten/res.contentLength))
    }).promise.then(res => save()
    ).catch(error => console.log(error));
  };

  const onPressUpload = async() => {
    if (title.trim() === '') {
      Alert.alert(
        "업로드 실패",
        "제목을 입력해주세요.",
        [{text: "확인"}]
      ) 
    } else {
      const uploadData = {
        name: 'uploadData',
        title: title,
        tags: hashTags,
        uri: videoUri,
      };

      const formData = new FormData();
      formData.append('video', uploadData);

      const header = {
        'Context-Type': 'multipart/form-data',
      };

      try { 
        const response = await axios.post(postURL + '/api/v1/auth/video', formData, {headers: header});
        axios.get(URL.getAllFeeds)
        .then(response => navigation.navigate('FeedHome', response.data.body))
        .catch(error => console.log(error));
      } catch (error) {
        console.log(error)
        if (error.name === 'AxiosError') {
          Alert.alert(
            "네트워크 오류",
            "인터넷 연결을 확인해주세요.",
            [{text: "확인"}]
          );
        }
      }
    }
  };

  const Progress = () => {
    return (
      <View style={styles.progressBox}>
        <ProgressBar
          progress={rate}
          width={width * 0.7}
          height={10}
          color='#384BF5'/> 
        <Text style={styles.progressRate}>{Math.round(rate * 100)}%</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.finishText}>{nickName}님의 특별한 Vlog를 완성했어요!</Text>
      <Video
        source={{ uri: videoUri }}
        paused={true}
        style={styles.video}
        controls={true}
        audioOnly={false} // true로 주면 비디오 로딩되어도 poster 안사라짐
        poster={loadingUri} // 썸네일이 아니라 비디오 로딩 화면
        posterResizeMode={"center"} 
      />
      <Text style={styles.tags}>{hashTags}</Text>
      <TextInput 
        style={styles.inputTitle} 
        placeholder="제목을 입력해주세요." 
        placeholderTextColor='#C8CACD'
        onChangeText={(text) => dispatch(setTitle({title: text}))}>
      </TextInput>
      <TouchableOpacity style={styles.inputButton} onPress={onPressUpload}>
        <Text style={styles.whiteText}>내 피드에 업로드</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.inputButton} onPress={onPressSave}>
        <Text style={styles.whiteText}>내 기기에 저장하기</Text>
      </TouchableOpacity>
      { rate !== 0 && Progress() }
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBFD',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  finishText: {
    marginVertical: 40,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111'
  },
  video: {
    width: width * 0.85,
    height: width * 0.5,
    backgroundColor: '#F1F4F9',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#F1F4F9'
  },
  tags: {
    color: '#0222FE',
    fontWeight: 'bold',
    padding: 10,
    width: width * 0.85,
  },
  inputTitle: {
    width: width * 0.85,
    backgroundColor: '#F1F4F9',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#384BF5',
    padding: 15,
    margin: 15,
    fontSize: 16
  },
  inputButton: {
    width: width * 0.85,
    color: 'white',
    backgroundColor: '#384BF5',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#384BF5',
    padding: 16,
    marginTop: 20,
    alignItems: 'center'
  },
  whiteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  toastBox: { 
    height: 45, 
    width: '85%', 
    backgroundColor: '#384BF5',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9
  },
  toastText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  },
  progressBox: {
    flexDirection: 'row',
    width: width * 0.85,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20
  },
  progressRate: {
    color: '#384BF5',
    marginLeft: 5
  }
});

export default GenerateVideo;