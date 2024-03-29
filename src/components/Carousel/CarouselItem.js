import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { URL } from "../../api";
import { useDispatch, useSelector } from 'react-redux';
import { subLikeLists, addLikeLists, subLikeCount, addLikeCount } from "../../slices/feedSlice";

const { width, height } = Dimensions.get('window')

const CarouselItem = ({ item, index, showToast }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const likeLists = useSelector(state => state.feed.likeLists);
  const [isLiked, setLiked] = useState(likeLists.includes(item._id));
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setLiked(likeLists.includes(item._id));
    setLikeCount(item.likeCount);
  }, [likeLists, item]);
  
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
      dispatch(subLikeCount(item._id));
      setLikeCount(likeCount-1);
    } else {
      dispatch(addLikeLists(item._id));
      dispatch(addLikeCount(item._id));
      setLikeCount(likeCount+1);
    }

    setLiked(!isLiked);
    showToast(isLiked);
  };

  const onPressVideo = async() => {
    await axios.get(URL.getDetailFeed+item._id)
    .then((response) => navigation.navigate('FeedDetail', response.data.body.detail))
    .catch((error) => console.log(error))
  };

  return (
    <View style={styles.cardView}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressVideo}>
        <Image style={styles.image} source={{ uri: item.thumbNailPath }} />
      </TouchableOpacity>
      <View style={styles.hotBottomText}>
        <Text style={styles.hashTag}>{ item.tags.map((item) => `#${item} `) }</Text>
        <TouchableOpacity onPress={onPressLike} style={styles.heartBox}>
          <Text style={styles.heartText}>{ likeCount }</Text>
          <Icon 
            name={isLiked ? 'heart': 'heart-o'} 
            type='font-awesome' 
            color='#FE646F' 
            size={16}
          />
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
    width: width - 75,
    height: (width - 75) * 0.56,
    backgroundColor: '#F1F4F9',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#F1F4F9',
    margin: 10
  },
  contentTitle: {
    fontSize: 18,
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
    marginRight: 5
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