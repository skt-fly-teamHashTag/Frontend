import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Icon } from "@rneui/themed";
import Carousel from '../components/Carousel/Carousel';
import Feed from '../components/Feed/Feed';
import { dummyData } from '../datas/Data';
import Toast from 'react-native-toast-message';

const FeedHome = ({ navigation }) => {
  const [data, setData] = useState([]);

  const showToast = (isLiked) => {
    Toast.show({
      type: "info",
      text1: isLiked ? "좋아요를 취소했습니다." : "좋아요를 눌렀습니다.",
      position: "bottom"
    })
  }

  useEffect(() => {
    try {
      const response = axios.get('http://localhost:8900/api/v1/video');
      setData(response);
      console.log(response);
    } catch(error) {
      console.log("ERROR>>", error);
    }
  }, [])
  
  return (  
    <>
      <ScrollView
        showsVerticalScrollIndicator = {false}
        bounces = {false}
        style={styles.verticalScrollView}>
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
        <Carousel data={dummyData.slice(0, 3)} showToast={showToast} />
        <Feed data={dummyData} showToast={showToast} />
      </ScrollView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  verticalScrollView: {
    backgroundColor: '#FFFBFD',
  },
  myVlogText:{
    flexDirection: 'row',
    alignItems: 'center',
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
  },
});

export default FeedHome;