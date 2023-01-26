import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text, Dimensions } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { getURL } from "../../api";

const FeedItem = ({ item, showToast }) => {
  const navigation = useNavigation();
  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.heart);
  const height = Dimensions.get('window').height;

  const onPressFeed = async () => {
    const baseURL = getURL + '/api/v1/video';
    const id = '63c7e9af8f429307d2f874c8.mp4';
    try {
      // const response = await axios.get(`${baseURL}/${id}`, {
      //   responseType: 'blob'
      // });
      //console.log(response)
      // const blob = new Blob([response.data])
      // const blob = new Blob([response.data._data], {
      //   type: 'video/mp4'
      // });
      // console.log(response.data._data.name)
      // console.log(response.config.env);
      navigation.navigate('FeedDetail', {...item, videoUri: `${baseURL}/${id}`});
    } catch(error) {
      console.log("ERROR>>", error); //fighting!!
    }
  }

  const onPressLike = () => {
    setLiked(!isLiked);
    setLikeCount(isLiked ? item.heart : item.heart + 1);
    showToast(isLiked);
  };

  return (
    <View style={styles.newBox}>
      <View style={styles.userInfo}>
        <Image source={require('../../assets/userPhoto.png')} style={styles.userImage}></Image>
        <View>
          <Text style={styles.contentTitle}>{ item.userName }</Text>
          <Text style={styles.userUploadTime}>{ item.uploadTime }</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressFeed}>
        <Image style={styles.video} source={{ uri: item.thumbnail }} />
      </TouchableOpacity>
      <View style={styles.hotBottomText}>
        <Text style={styles.newHashTag}>{ item.tags }</Text>
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
      <Text style={styles.videoTitle}>{ item.title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  newBox: {
    borderRadius: 10,
    backgroundColor: '#FFFBFD',
    marginBottom: 20,
    padding: 5
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
    width: 300,
    height: 180,
    backgroundColor: '#F1F4F9',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#F1F4F9',
    margin: 10
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  heartText: {
    color: '#FE646F',
    marginLeft: 5
  },
});

export default FeedItem;