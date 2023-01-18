import React from "react";
import axios from "axios";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Icon } from "@rneui/themed";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Video from "react-native-video";
import Carousel from '../components/Carousel/Carousel';
import Feed from '../components/Feed/Feed';
import { dummyData } from '../datas/Data';

const FeedHome = ({ navigation }) => {

  const videoUri = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  const loadingUri = "/Users/in-yeong/iykim/videoDot/src/assets/videoLoadingGif.gif";
  const hashTags = '#V #목적없이떠나는여행 #꼬막비빔밥';

  const onPress = () => {
    navigation.navigate('FeedDetail');
  }

  return (  
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
      <Carousel data={dummyData.slice(0, 3)} />
      <Feed data={dummyData} />
    </ScrollView>
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
  hotBox: {
    marginHorizontal: wp('6%'),
    marginVertical: 20,
    backgroundColor: '#F4F6F9',
    borderRadius: 10,
    padding: 5,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
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
  scrollCircle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15
  },
  circle: {
    marginLeft: 5,
    marginRight: 5
  },
  newContainer: {
    backgroundColor: '#E5F0FF',
    paddingBottom: 30,
  },
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
  center: {
    alignItems: 'center'
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 0
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
    height: 200,
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
    marginBottom: 10
  }
});

export default FeedHome;