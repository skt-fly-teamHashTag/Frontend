import React from "react";
import axios from "axios";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Video from "react-native-video";

const FeedHome = () => {
  const videoUri = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  const loadingUri = "/Users/in-yeong/iykim/videoDot/src/assets/videoLoadingGif.gif";
  const hashTags = '#V #목적없이떠나는여행 #꼬막비빔밥';

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.myVlogText}>
          <Text style={styles.screenTitle}>나만의 Vlog</Text>
          <Icon name='play-circle' type='font-awesome' size={24} color='#FE6788'></Icon>
        </View>
        <TouchableOpacity>
          <Icon name='search' type='feather' size={24} style={{justifyContent:'flex-end'}}></Icon>
        </TouchableOpacity>
      </View>
      <Text style={styles.hotText}>이번주 Hot 랭킹을 확인해보세요!!</Text>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator = {false}
          pagingEnabled
          style={styles.horizontalScrollView}>
          <View style={styles.hotBox}>
            <Text style={styles.contentTitle}>인기 급상승 영상 Top 1</Text>
            <Video
              source={{ uri: videoUri }}
              paused={true}
              style={styles.video}
              controls={true}
              resizeMode={"cover"}
              audioOnly={false} // true로 주면 비디오 로딩되어도 poster 안사라짐
              poster={loadingUri} // 썸네일이 아니라 비디오 로딩 화면
              posterResizeMode={"center"} 
            />
            <View style={styles.hotBottomText}>
              <Text style={styles.hashTag}>{hashTags}</Text>
              <View style={styles.heartBox}>
              <Icon name='heart' type='font-awesome' color='#FE646F' size={16}></Icon>
                <Text style={styles.heartText}>22</Text>
              </View>
            </View>
          </View>
          <View style={styles.hotBox}>
            <Text style={styles.contentTitle}>인기 급상승 영상 Top 2</Text>
            <Video
              source={{ uri: videoUri }}
              paused={true}
              style={styles.video}
              controls={true}
              resizeMode={"cover"}
              audioOnly={false} // true로 주면 비디오 로딩되어도 poster 안사라짐
              poster={loadingUri} // 썸네일이 아니라 비디오 로딩 화면
              posterResizeMode={"center"} 
            />
            <View style={styles.hotBottomText}>
              <Text style={styles.hashTag}>{hashTags}</Text>
              <View style={styles.heartBox}>
              <Icon name='heart' type='font-awesome' color='#FE646F' size={16}></Icon>
                <Text style={styles.heartText}>22</Text>
              </View>
            </View>
          </View>
          <View style={styles.hotBox}>
            <Text style={styles.contentTitle}>인기 급상승 영상 Top 3</Text>
            <Video
              source={{ uri: videoUri }}
              paused={true}
              style={styles.video}
              controls={true}
              resizeMode={"cover"}
              audioOnly={false} 
              poster={loadingUri}
              posterResizeMode={"center"} 
            />
            <View style={styles.hotBottomText}>
              <Text style={styles.hashTag}>{hashTags}</Text>
              <View style={styles.heartBox}>
              <Icon name='heart' type='font-awesome' color='#FE646F' size={16}></Icon>
                <Text style={styles.heartText}>22</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.scrollCircle}>
        <Icon name='circle' type="font-awesome" color='#384BF5' size={9} style={styles.circle} />
        <Icon name='circle' type="font-awesome" color='#D9D9D9' size={9} style={styles.circle} />
        <Icon name='circle' type="font-awesome" color='#D9D9D9' size={9} style={styles.circle} />
      </View>
      <View style={styles.verticalScrollView}>
        <Text style={styles.newText}>최신 영상을 확인해보세요!</Text>
        <ScrollView
          showsVerticalScrollIndicator = {false}>
          <View style={styles.center}>
            <View style={styles.newBox}>
              <Text style={styles.contentTitle}>최신 영상</Text>
              <Video
                source={{ uri: videoUri }}
                paused={true}
                style={styles.video}
                controls={true}
                resizeMode={"cover"}
                audioOnly={false} 
                poster={loadingUri}
                posterResizeMode={"center"} 
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 5,
          height: 5,
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
    padding: 15,
    paddingTop: 0,
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
  verticalScrollView: {
    backgroundColor: '#E5F0FF',
    width: '100%',
    height: hp('35%'),
  },
  newBox: {
    borderRadius: 10,
    backgroundColor: '#FFFBFD',
    marginBottom: 20,
    padding: 5
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
  newText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3A4563',
    margin: 20,
    marginBottom: 15
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
});

export default FeedHome;