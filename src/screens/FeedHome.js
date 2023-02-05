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
  const [data, setData] = useState({...route.params});
  const summarizing = useSelector((state) => state.summary.summary);

  useEffect(() => {
    navigation.addListener('focus', () => {
      console.log('render');
    });
  }, [navigation]);
  
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
        data={data.recent}
        keyExtractor={(item)=>item._id}
        ListHeaderComponent={<>
          <View style={styles.hotContainer}>
            <View style={styles.topBox}>
              <View style={styles.myVlogText}>  
                <Text style={styles.screenTitle}>나만의 Vlog</Text>
                <Icon name='play-circle' type='font-awesome' size={24} color='#FE6788'></Icon>
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Search')}>
                <Icon name='search' type='feather' size={24} style={{justifyContent:'flex-end'}}></Icon>
              </TouchableOpacity>
            </View>
            <Text style={styles.hotText}>이번주 Hot 랭킹을 확인해보세요!!</Text>
            <Carousel data={data.hot} showToast={showToast} />
          </View>
          <Text style={styles.newText}>최신 영상을 확인해보세요!</Text>
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
    margin: 10,
    marginHorizontal: 30,
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
  hotText: {
    marginLeft: 30,
    fontSize: 20,
    color: '#111'
  },
  newFeed: {
    alignItems: 'center'
  },
  newText: {
    fontWeight: 'bold',
    fontSize: 20,
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