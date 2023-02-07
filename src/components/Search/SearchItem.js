import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text, Dimensions } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { URL } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { subLikeLists, addLikeLists } from "../../slices/feedSlice";

const { width, height } = Dimensions.get('window');

const SearchItem = ({ item, showToast }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const user = useSelector((state) => state.user);
  const likeLists = useSelector(state => state.feed.likeLists);

  useEffect(() => {
    setLiked(likeLists.includes(item._id));
  }, [likeLists]);

  const onPressVideo = async() => {
    await axios.get(URL.getDetailFeed+item._id)
    .then((response) => navigation.navigate('FeedDetail', response.data.body.detail))
    .catch((error) => console.log(error))
  };

  const onPressLike = async() => {
    const putData = {
      videoId: item._id,
      userId: user.userId,
    };

    try {
      const response = await axios.put(URL.putLike, putData);
    } catch(error) {
      console.log(error);
    }
    if (isLiked) {
      dispatch(subLikeLists(item._id));
      setLikeCount(likeCount-1);
    } else {
      dispatch(addLikeLists(item._id));
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
    <View style={styles.newBox}>
      <View style={styles.userInfo}>
        <Image source={require('../../assets/userPhoto.png')} style={styles.userImage}></Image>
        <View>
          <Text style={styles.contentTitle}>{ item.nickName }</Text>
          <Text style={styles.userUploadTime}>{ getUploadedAt() }</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressVideo}>
        <Image style={styles.video} source={{ uri: item.thumbNailPath }} />
      </TouchableOpacity>
      <View style={styles.hotBottomText}>
        <Text style={styles.newHashTag}>{ item.tags.map((tag)=>`#${tag} `) }</Text>
        <TouchableOpacity onPress={onPressLike} style={styles.heartBox}>
          <Icon 
            name={isLiked ? 'heart': 'heart-o'} 
            type='font-awesome' 
            color='#FE646F' 
            size={16}
          />
          <Text style={styles.heartText}>{ likeCount }</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressVideo}>
        <Text style={styles.videoTitle}>{ item.title }</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  newBox: {
    borderRadius: 10,
    backgroundColor: '#FFFBFD',
    padding: 5,
    borderTopColor: '#F4F6F9',
    borderTopWidth: 2
  },
  newText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3A4563',
    margin: 25,
    marginBottom: 15
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 0,
    color: '#111'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    marginBottom: 0
  },
  userImage: {
    width: 50,
    height: 50
  },
  userUploadTime: {
    color: 'gray',
    marginLeft: 10,
    marginTop: 3,
    fontSize: 12
  },
  video: {
    height: width * 0.6,
    borderRadius: 10,
    margin: 10,
  },
  newHashTag: {
    color: '#384BF5',
    fontWeight: 'bold'
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 10,
    color: '#111'
  },
  hotBottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 5,
    alignItems: 'center'
  },
  heartBox: {
    flexDirection: 'row'
  },
  heartText: {
    color: '#FE646F',
    marginLeft: 5
  },
});

export default SearchItem;