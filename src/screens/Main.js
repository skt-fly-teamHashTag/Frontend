import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, Modal } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { URL } from '../api';
import { RNS3 } from 'react-native-aws3';
import { aws } from "../Keys";
import { useDispatch, useSelector } from "react-redux";
import SummaryText from "../components/Text/SummaryText";
import { setSummary } from "../slices/summarySlice";
import { setFeedData } from "../slices/feedSlice";
import EventSource from "react-native-sse";

const Main = ({ navigation }) => {
  const dispatch = useDispatch();
  const summarizing = useSelector((state) => state.summary.summary);
  const data = useSelector((state) => state.feed.data);
  const user = useSelector((state) => state.user);
  const [visibility, setVideoSelected] = useState(false);
  const category = ['문화생활', '가족', '음식', '스터디', '직장인', '반려동물', '연애/결혼', '운동/스포츠', '여행', '뷰티'];
  const [selectedIdx, setSelectedIdx] = useState([]);

  const showCameraRoll = async() => {
    const pickVideo = await launchImageLibrary({ 
      mediaType: 'video',
      selectionLimit: 10
    });
    if (pickVideo.didCancel) {
      console.log('User cancelled video picker');
    } else if (pickVideo.errorCode) {
      console.log('ImagePicker Error: ', pickVideo.errorCode);
    } else if (pickVideo) {
      if (summarizing) {
        Alert.alert(
          "비디오 요약 실패",
          "지금은 다른 비디오를 요약중입니다.",
          [{text: "확인"}]
        );
        dispatch(setSummary({summary: false}));
      } else {
        setVideoSelected(true);
      }
    }
  };

  const onPressVideoGenerate = async() => {
    setSelectedIdx(-1);
    setVideoSelected(false);
    navigation.navigate('Loading');
    
    // event source
    const esOptions = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({userId: user.userId})
    }
    const es = new EventSource(URL.eventSource, esOptions);

    es.addEventListener("open", async(event) => {
      dispatch(setSummary({summary: true}));

      // [axios.post] location 정보를 백엔드에 전달하는 코드
      const postData = {
        userId: user.userId,
        nickName: user.nickName,
        videoPath: [
          'https://test-videodot-bucket.s3.ap-northeast-2.amazonaws.com/videos/test_1.mp4', 
          'https://test-videodot-bucket.s3.ap-northeast-2.amazonaws.com/videos/test_2.mp4'], // 여러개 선택한 비디오 경로
        category: selectedIdx.map(idx=>category[idx])
      };
      await axios.post(URL.postTestVideo, postData)
      .then((response)=>console.log(response.data))
      .catch((error)=>console.log(error));
      console.log("Open SSE connection.");
    });
    
    es.addEventListener("message", (event) => {
      console.log(`message event: ${event.data}`);
      dispatch(setSummary({summary: false}));
      if (event.data === '"SERVER_ERROR"') {
        Alert.alert(
          "비디오 요약 실패",
          "비디오 요약에 실패하였습니다.\n다시 영상을 선택해주세요.",
          [{text: "확인", onPress: () => {
            navigation.replace('Main');}}]
        );
      } else {
        Alert.alert(
          "비디오 요약 완료",
          "비디오 요약이 완료되었습니다.",
          [{text: "확인", onPress: () => {
            navigation.replace('GenerateVideo', event.data);}}]
        );
      }

      es.removeAllEventListeners();
      es.close();
    });
    
    es.addEventListener("error", (event) => {
      dispatch(setSummary({summary: false}));
      Alert.alert(
        "비디오 요약 실패",
        "비디오 요약에 실패하였습니다.\n다시 영상을 선택해주세요.",
        [{text: "확인", onPress: () => {
          navigation.replace('Main');}}]
      );
      if (event.type === "error") {
        console.error("Connection error:", event.message);
        
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
      es.removeAllEventListeners();
      es.close();
    });

    es.addEventListener("close", (event) => { 
      console.log("Close SSE connection.");
    });
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

  const ModalItem = ({ text, idx }) => {
    return (
      <TouchableOpacity 
        style={selectedIdx.includes(idx)? styles.selectedItem: styles.modalItem}
        onPress={()=>{
          selectedIdx.includes(idx)
            ? setSelectedIdx(selectedIdx.filter(selected=>selected !== idx))
            : selectedIdx.length < 2 && setSelectedIdx([...selectedIdx, idx])
          }}>
        <Text 
          style={selectedIdx.includes(idx)? styles.selectedText:styles.modalItemText}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  };

  const OptionModal = ({ visibility }) => {
    return (
      <Modal
        visible={visibility}
        transparent={true}>
        <View style={styles.modalBack}>
          <View style={styles.modalBox}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalMainTitle}>원하는 핵심 주제를 선택해주세요 </Text>
              <Text style={styles.modalSubTitle}>(최대 2개)</Text>
            </View>
            <View style={styles.modalItemList}>
              {category.map((item, idx) => <ModalItem text={item} key={idx} idx={idx} />)}
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=>{selectedIdx.length > 0 && onPressVideoGenerate()}}
              style={styles.modalButton}>
              <Text style={styles.modalButtonText}>특별한 일상 기록하러 가기 👉</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return(
    <>
      { summarizing && <SummaryText /> }
      <View style={styles.main}>
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            {`요약하고 싶은 \n영상을 앨범에서 \n선택해주세요.`}</Text>
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
      <OptionModal visibility={visibility} />
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  noticeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 30,
    color: '#111'
  },
  noticeGif: {
    width: 190,
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
  },
  // option modal
  modalBack: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    alignItems: 'center',
    backgroundColor: '#F4F6F9',
    width: '90%',
    borderRadius: 10,
    paddingVertical: 20
  },
  modalTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalMainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  modalItemList: {
    flexDirection: 'row',
    marginTop:10,
    flexWrap: 'wrap',
    width: '90%'
  },
  modalItem: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white'
  },
  selectedItem: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#384BF5'
  },
  modaItemText: {
    color: 'black'
  },
  selectedText: {
    color: '#384BF5',
    fontWeight: 'bold'
  },
  modalButton: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#384BF5',
    borderRadius: 10,
    marginTop: 25
  },
  modalButtonText: {
    color: 'white', 
    margin: 15,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Main;