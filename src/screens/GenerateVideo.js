import React, {useEffect} from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from '../slices/videoSlice';

const GenerateVideo = () => {
  const { title } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const videoUri = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  const posterUri = "https://avatars.githubusercontent.com/u/121754657?s=200&v=4";
  const showTag = '#V #목적없이떠나는여행 #꼬막비빔밥';

  // 내 기기에 저장하기 react-native-fs 이용
  const onPressSave = () => {
    
  };

  // axios 이용해서 fileData, tags, title 정보 POST
  const onPressUpload = () => {

  };

  return (
    <View style={styles.container}>
      <Text style={styles.finishText}>해시태그님의 특별한 Vlog를 완성했어요!</Text>
      <Video
        source={{ uri: videoUri }}
        paused={true}
        style={styles.video}
        controls={true}
        resizeMode={"cover"}
        // 썸네일 코드
        // audioOnly={true}
        // poster={posterUri}
        // posterResizeMode={"cover"} 
      />
      <Text style={styles.tags}>{showTag}</Text>
      <TextInput 
        style={styles.inputTitle} 
        placeholder="제목을 입력해주세요." 
        onChangeText={(text) => dispatch(setTitle({title: text}))}></TextInput>
      <TouchableOpacity style={styles.inputButton} onPress={onPressSave}>
        <Text style={styles.whiteText}>저장하기</Text>
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