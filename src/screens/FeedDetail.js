import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, KeyboardAvoidingView, NativeModules } from "react-native";
import { Icon } from "@rneui/themed";
import Video from "react-native-video";
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from "react-redux";
import SummaryText from "../components/Text/SummaryText";
import axios from "axios";
import { URL } from "../api";
import { addLikeLists, subLikeLists } from "../slices/feedSlice";

const { StatusBarManager } = NativeModules;

const FeedDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const item = route.params;
  const loadingUri = "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif";
  const likeLists = useSelector(state => state.feed.likeLists);
  const [isLiked, setLiked] = useState(likeLists.includes(item.videoId));
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const summarizing = useSelector((state) => state.summary.summary);

  useEffect(()=>{
    Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
      }) : null
  }, []);

  const toastConfig = {
    likeToast: ({ text1, props }) => (
      <View style={styles.toastBox}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    )
  };

  const showToast = (isLiked) => {
    Toast.show({
      type: "likeToast",
      text1: isLiked ? "좋아요를 취소했습니다." : "좋아요를 눌렀습니다.",
      position: "bottom",
      visibilityTime: 2000
    })
  }

  const onPressLike = async() => {
    const putData = {
      videoId: '1120',
      userId: '1123',
    };

    try {
      const response = await axios.put(URL.putLike, putData);
    } catch(error) {
      console.log(error);
    }

    if (isLiked) {
      dispatch(subLikeLists(item.videoId));
      setLikeCount(likeCount-1);
    } else {
      dispatch(addLikeLists(item.videoId));
      setLikeCount(likeCount+1);
    }
    
    setLiked(!isLiked);
    showToast(isLiked);
  };

  const getUploadedAt = () => {
    const milliSeconds = item.uploadedAt;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.back}>
          <Icon name='arrow-back-ios' type='material-icons' size={20}></Icon>
        </TouchableOpacity>
        <Text style={styles.headerText}>{ item.nickName }님의 영상</Text>
      </View>
      { summarizing && <SummaryText /> }
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <Image source={require('../assets/userPhoto.png')} style={styles.userImage}></Image>
          <View>
            <Text style={styles.contentTitle}>{ item.nickName }</Text>
            <Text style={styles.userUploadTime}>{ getUploadedAt() }</Text>
          </View>
        </View>
        <Video
          source={{ uri: 'https://test-videodot-bucket.s3.ap-northeast-2.amazonaws.com/videos/'+item.videoPaths }}
          style={styles.video}
          controls={true}
          audioOnly={false} 
          poster={loadingUri}
          posterResizeMode={"center"}
        />
        <View style={styles.hotBottomText}>
          <Text style={styles.newHashTag}>{ item.tags.map(tag => `#${tag} `) }</Text>
          <TouchableOpacity onPress={onPressLike} style={styles.heartBox}>
            <Text style={styles.heartText}>좋아요 {likeCount}개 </Text>
            <Icon 
              name={isLiked ? 'heart': 'heart-o'} 
              type='font-awesome' 
              color='#FE646F' 
              size={16}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <View style={styles.line}></View>
        <Text style={styles.commentCount}>댓글 3개</Text>
        <View style={styles.commentBox}>
          <View style={styles.userBox}>
            <View style={styles.commentUser}>
              <Image source={require('../assets/userPhoto.png')} style={styles.userImage}></Image>
              <View>
                <Text style={styles.contentTitle}>해시태그닷</Text>
                <Text style={styles.userUploadTime}>1분 전</Text>
              </View>
            </View>
            <Icon name='more-vertical' type='feather' size={20} color='gray'></Icon>
          </View>
          <Text style={styles.comment}>너무 재미있어요~!</Text>
        </View>
        <View style={styles.commentBox}>
          <View style={styles.userBox}>
            <View style={styles.commentUser}>
              <Image source={require('../assets/userPhoto.png')} style={styles.userImage}></Image>
              <View>
                <Text style={styles.contentTitle}>플라이닷</Text>
                <Text style={styles.userUploadTime}>1분 전</Text>
              </View>
            </View>
            <Icon name='more-vertical' type='feather' size={20} color='gray'></Icon>
          </View>
          <Text style={styles.comment}>떠나요~ 둘이서~ 모든 걸 훌훌 버리고~</Text>
        </View>
        <View style={styles.commentBox}>
          <View style={styles.userBox}>
            <View style={styles.commentUser}>
              <Image source={require('../assets/userPhoto.png')} style={styles.userImage}></Image>
              <View>
                <Text style={styles.contentTitle}>쿠크닷스</Text>
                <Text style={styles.userUploadTime}>1분 전</Text>
              </View>
            </View>
            <Icon name='more-vertical' type='feather' size={20} color='gray'></Icon>
          </View>
          <Text style={styles.comment}>{`완전 멋져 >_<`}</Text>
        </View>
        <View style={{height: 50}}></View>
      </ScrollView>
      <KeyboardAvoidingView 
        behavior="padding" style={styles.commentWriteBox}
        keyboardVerticalOffset={statusBarHeight+44}>
        <TextInput style={styles.commentInput} placeholder='댓글 달기...' placeholderTextColor='#C8CACD' />
        <TouchableOpacity opacity='0.9' style={styles.commentSend}>
          <Icon name='send' type='feather' color='#384BF5' />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.bottomEmpty}></View>
      <Toast config={toastConfig} />
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBFD',
    width: '100%',
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#F4F6F9',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 15,
    top: 15
  },
  headerText: {
    fontSize: 18,
    color: '#111'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    marginTop: 10
  },
  userImage: {
    width: 50,
    height: 50
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 0,
    color: '#111'
  },
  userUploadTime: {
    color: 'gray',
    marginLeft: 10,
    marginTop: 3,
    fontSize: 12
  },
  video: {
    width: '100%',
    height: 250,
    backgroundColor: '#F1F4F9',
    marginBottom: 10,
  },
  hotBottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
    alignItems: 'center'
  },
  newHashTag: {
    color: '#384BF5',
    fontWeight: 'bold'
  },
  heartBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  heartText: {
    color: '#FE646F',
    marginLeft: 5
  },
  heartIcon: {
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 15,
    color: '#111'
  },
  line: {
    borderBottomColor: '#F4F6F9',
    borderBottomWidth: 5,
  },
  commentBox: {
    marginBottom: 10
  },
  commentCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 15,
    color: '#111'
  },
  userBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    marginBottom: 0
  },
  commentUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comment: {
    marginLeft: 70,
    fontSize: 15,
    color: '#111'
  },
  commentWriteBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopColor: '#F4F6F9',
    borderTopWidth: 1.5,
    backgroundColor: '#FFFBFD'
  },
  commentInput: {
    backgroundColor: '#F4F6F9',
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginVertical: 5,
  },
  commentSend: {
    justifyContent: 'center'
  }, 
  bottomEmpty: {
    backgroundColor: '#FFFBFD',
    height: 20
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
  }
});

export default FeedDetail;