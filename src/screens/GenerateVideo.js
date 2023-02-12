import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  NativeModules,
  Image
} from 'react-native';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {setTitle} from '../slices/videoSlice';
import RNFS from 'react-native-fs';
import axios from 'axios';
import {URL} from '../api';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from 'react-native-toast-message';
import ProgressBar from 'react-native-progress/Bar';
import VideoPlayer from 'react-native-video-controls';

const width = Dimensions.get('window').width;

const GenerateVideo = ({navigation, route}) => {
  // 비디오 요약 완료된 정보로 화면 띄우기
  const item = JSON.parse(route.params);
  const [rate, setRate] = useState(0);
  const {userId, nickName} = useSelector(state => state.user);
  const {title} = useSelector(state => state.video);
  const dispatch = useDispatch();
  const [paused, setPaused] = useState(false);
  const [isThumbNail, setIsThumbNail] = useState(true);

  const toastConfig = {
    saveToast: ({text1, props}) => (
      <View style={styles.toastBox}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
  };

  const showToast = () => {
    Toast.show({
      type: 'saveToast',
      text1: '앨범에 저장되었습니다.',
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  // 비디오 다운로드 경로
  const RNFetchBlob = NativeModules.RNFetchBlob;
  const path = RNFetchBlob.DownloadDir;
  const LOCAL_PATH_TO_VIDEO =
    Platform.OS === 'ios'
      ? `${RNFS.DocumentDirectoryPath}/videoDot`
      : `${path}/$videoDot`;

  const save = () => {
    CameraRoll.save(LOCAL_PATH_TO_VIDEO, 'videoDot');
    showToast();
  };

  const onPressSave = () => {
    RNFS.downloadFile({
      fromUrl: videoUri,
      toFile: LOCAL_PATH_TO_VIDEO,
      begin: res => {},
      progress: res => setRate(res.bytesWritten / res.contentLength),
    })
      .promise.then(res => save())
      .catch(error => console.log(error));
  };

  const onPressUpload = async () => {
    if (title.trim() === '') {
      Alert.alert('업로드 실패', '제목을 입력해주세요.', [{text: '확인'}]);
    } else {
      const uploadData = {userId, title};
      await axios
        .post(URL.postVideoTitle, uploadData)
        .then(response => navigation.navigate('FeedHome', response.data.body))
        .catch(error => {
          console.log(error);
          if (error.name === 'AxiosError') {
            Alert.alert('네트워크 오류', '인터넷 연결을 확인해주세요.', [
              {text: '확인'},
            ]);
          }
        });
    }
  };

  const onPressFullscreen = () => {
    setPaused(!paused);
    navigation.navigate('VideoFullscreen', item.videoPath);
  };

  const Progress = () => {
    return (
      <View style={styles.progressBox}>
        <ProgressBar
          progress={rate}
          width={width * 0.7}
          height={10}
          color="#384BF5"
        />
        <Text style={styles.progressRate}>{Math.round(rate * 100)}%</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.finishText}>
        {nickName}님의 특별한 Vlog를 완성했어요!
      </Text>
      { isThumbNail
        ?<TouchableOpacity onPress={()=>setIsThumbNail(false)}>
          <Image source={{uri: item.thumbNailPath}} style={styles.thumbNail} />
        </TouchableOpacity>
        :<VideoPlayer
          source={{uri: item.videoPath}}
          style={styles.video}
          paused={paused}
          toggleResizeModeOnFullscreen={false}
          onExitFullscreen={onPressFullscreen}
          onEnterFullscreen={onPressFullscreen}
          disableBack
        />
      }
      <Text style={styles.tags}>
        {item.tags.map(tag => `#${tag} `)}
      </Text>
      <TextInput
        style={styles.inputTitle}
        placeholder="제목을 입력해주세요."
        placeholderTextColor="#C8CACD"
        onChangeText={text => dispatch(setTitle({title: text}))}></TextInput>
      <TouchableOpacity style={styles.inputButton} onPress={onPressUpload}>
        <Text style={styles.whiteText}>내 피드에 업로드</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.inputButton} onPress={onPressSave}>
        <Text style={styles.whiteText}>내 기기에 저장하기</Text>
      </TouchableOpacity>
      {rate !== 0 && Progress()}
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBFD',
    height: '80%',
    width: '100%',
    alignItems: 'center',
  },
  finishText: {
    marginVertical: 40,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  thumbNail: {
    width: width, 
    height: width * 0.56
  },
  video: {
    width: width,
    backgroundColor: 'black',
  },
  tags: {
    color: '#0222FE',
    fontWeight: 'bold',
    padding: 10,
    width: width * 0.95,
  },
  inputTitle: {
    width: width * 0.9,
    backgroundColor: '#F1F4F9',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#384BF5',
    padding: 15,
    margin: 15,
    fontSize: 16,
  },
  inputButton: {
    width: width * 0.9,
    color: 'white',
    backgroundColor: '#384BF5',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#384BF5',
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toastBox: {
    height: 45,
    width: '85%',
    backgroundColor: '#384BF5',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  toastText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  progressBox: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  progressRate: {
    color: '#384BF5',
    marginLeft: 5,
  },
});

export default GenerateVideo;
