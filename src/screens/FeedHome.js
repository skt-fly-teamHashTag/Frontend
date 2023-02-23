import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { Icon } from "@rneui/themed";
import Carousel from '../components/Carousel/Carousel';
import FeedItem from "../components/Feed/FeedItem";
import Toast from 'react-native-toast-message';
import { URL } from '../api';
import { useSelector } from "react-redux";
import SummaryText from "../components/Text/SummaryText";

const FeedHome = ({ navigation, route }) => {
  const summarizing = useSelector((state) => state.summary.summary);
  const updateData = useSelector((state) => state.feed);
  const [data, setData] = useState({...updateData});

  useEffect(() => {
    setData({...updateData});
  }, [updateData]);
  
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
  
  return (  
    <>
      { summarizing && <SummaryText /> }
      <FlatList
        style={styles.verticalScrollView}
        bounces={false}
        showsVerticalScrollIndicator={false}
        disableVirtualization={false} //비정상적인 스크롤 동작 방지
        data={data.recent}
        keyExtractor={(item)=>item._id}
        ListHeaderComponent={<>
          <View style={styles.hotContainer}>
            <View style={styles.topBox}>
              <View style={styles.myVlogText}>  
                <Text style={styles.screenTitle}>한뼘 사이 소셜 피드</Text>
                <Icon name='play-circle' type='font-awesome' size={24} color='#FE6788'></Icon>
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Search')}>
                <Icon name='search' type='feather' size={24} style={{justifyContent:'flex-end'}}></Icon>
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.hotText}>많은 친구들이 좋아하고 있어요</Text>
            <Carousel data={data.hot} showToast={showToast} />
          </View>
          <Text style={styles.newText}>친구들의 특별한 영상을 즐겨보세요!</Text>
        </>}
        renderItem={({item, index}) => <FeedItem item={item} index={index} showToast={showToast} />}
       />
      <Toast config={toastConfig} />
    </>
  );
};

const styles = StyleSheet.create({
  verticalScrollView: {
    backgroundColor: '#E5F0FF',
  },
  myVlogText:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotContainer: {
    backgroundColor: '#FFFBFD',
  },
  topBox: {
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  screenTitle: {
    fontSize: 22,
    color: '#384BF5',
    fontWeight: 'bold',
    marginRight: 5
  },
  line: {
    backgroundColor: '#F1F4F9',
    height: 10,
    marginTop: 5,
    marginBottom: 15
  },
  hotText: {
    marginLeft: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  newFeed: {
    alignItems: 'center'
  },
  newText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3A4563',
    margin: 20,
    marginBottom: 15,
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

export default FeedHome;