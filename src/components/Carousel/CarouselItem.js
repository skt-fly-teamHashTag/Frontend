import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { URL } from "../../api";
import { useDispatch, useSelector } from 'react-redux';
import { subLikeLists, addLikeLists } from "../../slices/feedSlice";

const { width, height } = Dimensions.get('window')


const CarouselItem = ({ item, index, showToast }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const likeLists = useSelector(state => state.feed.likeLists);
  const [isLiked, setLiked] = useState(likeLists.includes(item._id));
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const user = useSelector((state) => state.user);
  
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

  const onPressVideo = async() => {
    await axios.get(URL.getDetailFeed+item._id)
    .then((response) => navigation.navigate('FeedDetail', 
      {...response.data.body.detail, likeCount: likeCount}))
    .catch((error) => console.log(error))
  };

  return (
    <View style={styles.cardView}>
      <Text style={styles.contentTitle}>인기 급상승 영상 Top { index + 1 }</Text>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressVideo}>
        <Image style={styles.image} source={{ uri: item.thumbNailPath }} />
      </TouchableOpacity>
      <View style={styles.hotBottomText}>
        <Text style={styles.hashTag}>{ item.tags.map((item) => `#${item} `) }</Text>
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
        <Text style={styles.hotTitle}>{ item.title }</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    marginHorizontal: (width - 330) / 2,
    marginVertical: 10,
    marginTop: 20,
    padding: 5,
    paddingBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 300,
    height: 180,
    backgroundColor: '#F1F4F9',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#F1F4F9',
    margin: 10
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 0,
    color: '#111'
  },
  hotBottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 5,
    alignItems: 'center'
  },
  hashTag: {
    color: '#111'
  },
  heartBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  heartText: {
    color: '#FE646F',
    marginLeft: 5
  },
  hotTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 5,
    color: '#111'
  }
})

export default CarouselItem