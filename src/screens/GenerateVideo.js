import React, {useEffect} from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Video from "react-native-video";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from '../slices/videoSlice';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import axios from "axios";

const GenerateVideo = ({ navigation }) => {
  const { nickName } = useSelector((state) => state.user);
  const { title } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  // axios.get으로 모델로부터 받아올 데이터
  const videoUri = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  const loadingUri = "/Users/in-yeong/iykim/videoDot/src/assets/videoLoadingGif.gif";
  const hashTags = '#V #목적없이떠나는여행 #꼬막비빔밥';

  // 비디오 다운로드 경로
  const path = RNFetchBlob.fs.dirs.DownloadDir;
  const LOCAL_PATH_TO_VIDEO = Platform.OS === 'ios' ? `${RNFS.DocumentDirectoryPath}/videoDot.mp4` : `${path}/videoDot.mp4`;

  const onPressSave = async() => {
    // 내 기기에 저장하기 react-native-fs 이용: Error 발생
    RNFS.downloadFile({
      fromUrl: videoUri,
      toFile: LOCAL_PATH_TO_VIDEO,
    }).then((res)=>{
      console.log('success!!!,', res);
    }).catch((err)=>{
      console.error(err.message)
    })
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
        const response = await axios.post('http://localhost:8080/api/v1/auth/video', formData, {headers: header});
        navigation.navigate('FeedHome');
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

  return (
    <View style={styles.container}>
      <Text style={styles.finishText}>{nickName}님의 특별한 Vlog를 완성했어요!</Text>
      <Video
        source={{ uri: videoUri }}
        paused={true}
        style={styles.video}
        controls={true}
        resizeMode={"cover"}
        audioOnly={false} // true로 주면 비디오 로딩되어도 poster 안사라짐
        poster={loadingUri} // 썸네일이 아니라 비디오 로딩 화면
        posterResizeMode={"center"} 
      />
      <Text style={styles.tags}>{hashTags}</Text>
      <TextInput 
        style={styles.inputTitle} 
        placeholder="제목을 입력해주세요." 
        onChangeText={(text) => dispatch(setTitle({title: text}))}></TextInput>
      <TouchableOpacity style={styles.inputButton} onPress={onPressSave}>
        <Text style={styles.whiteText}>내 기기에 저장하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.inputButton} onPress={onPressUpload}>
        <Text style={styles.whiteText}>내 피드에 업로드</Text>
      </TouchableOpacity>
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
    margin: 40,
    fontSize: 18,
    fontWeight: 'bold'
  },
  video: {
    width: 300,
    height: 200,
    backgroundColor: '#F1F4F9',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#F1F4F9'
  },
  tags: {
    color: '#0222FE',
    fontWeight: 'bold',
    padding: 10,
    width: 300
  },
  inputTitle: {
    width: 300,
    backgroundColor: '#F1F4F9',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#384BF5',
    padding: 15,
    margin: 15,
    fontSize: 16
  },
  inputButton: {
    width: 300,
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
  }
});

export default GenerateVideo;