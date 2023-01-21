import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, KeyboardAvoidingView, NativeModules } from "react-native";
import { Icon } from "@rneui/themed";
import Video from "react-native-video";
import Toast from 'react-native-toast-message';

const { StatusBarManager } = NativeModules;

const FeedDetail = ({ navigation, route }) => {
  const data = route.params
  const loadingUri = "/Users/in-yeong/iykim/videoDot/src/assets/videoLoadingGif.gif";
  const videoUri = data.video;
  // const videoUri = data.videoUri;
  const hashTags = data.tags;
  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(data.heart);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(()=>{
    console.log('FeedDetail>>', videoUri);
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

  const onPressLike = () => {
    setLiked(!isLiked);
    setLikeCount(isLiked ? data.heart : data.heart + 1);
    showToast(isLiked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.back}>
          <Icon name='arrow-back-ios' type='material-icons' size={20}></Icon>
        </TouchableOpacity>
        <Text style={styles.headerText}>{ data.userName }님의 영상</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <Image source={require('../assets/userPhoto.png')} style={styles.userImage}></Image>
          <View>
            <Text style={styles.contentTitle}>{ data.userName }</Text>
            <Text style={styles.userUploadTime}>{ data.uploadTime }</Text>
          </View>
        </View>
        <Video
          source={{ uri: videoUri }}
          ref={(ref) => {
            this.player = ref
          }}
          style={styles.video}
          controls={true}
          resizeMode={"cover"}
          audioOnly={false} 
          poster={loadingUri}
          posterResizeMode={"center"}
        />
        <View style={styles.hotBottomText}>
          <Text style={styles.newHashTag}>{hashTags}</Text>
          <TouchableOpacity onPress={onPressLike} style={styles.heartBox}>
            <Text style={styles.heartText}>좋아요 {likeCount}개 </Text>
            <Icon 
              name={isLiked ? 'heart': 'heart-o'} 
              type='font-awesome' 
              color='#FE646F' 
              size={16}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.videoTitle}>목적없이 떠나는 드라이브 VLOG</Text>
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
    fontSize: 18
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
    marginBottom: 0
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
    flexDirection: 'row'
  },
  heartText: {
    color: '#FE646F',
    marginLeft: 5
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 15
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
    marginLeft: 15
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
    fontSize: 15
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