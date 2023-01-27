import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from "react-redux";
import SummaryText from "../components/Text/SummaryText";
import axios from "axios";
import { URL } from "../api";

const MyFeed = ({ navigation }) => {
  const summarizing = useSelector((state) => state.summary.summary);
  const [myFeeds, setMyFeeds] = useState([]);
  
  useEffect(() => {
    axios.get(URL.getMyFeeds)
    .then(response => setMyFeeds(response.data.body.imagePaths))
    .catch(error => console.log(error))
  }, []);

  return (
    <View style={styles.container}>
      { summarizing && <SummaryText />}
      <Image source={require('../assets/userPhoto.png')} style={styles.userImage} />
      <Text style={styles.userName}>해시태그닷</Text>
      <ScrollView style={styles.feedScroll} bounces={false}>
        <View style={styles.userVideoBox}>
        { myFeeds.map((item, index) => 
          <Image 
            key={'key' + index} 
            source={{ uri: item }}
            style={styles.userThumbNail} />)
        }
        </View>
      </ScrollView>
      <View style={styles.feedBox}>
        <TouchableOpacity style={styles.feedButton} onPress={()=>navigation.navigate('Main')}>
          <Text style={styles.feedText}>비디오 홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feedButton} onPress={()=>navigation.navigate('FeedHome')}>
          <Text style={styles.feedText}>피드 구경하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBFD',
    height: '100%',
    alignItems: 'center'
  },
  userImage: {
    width: 80,
    height: 70,
    margin: 20,
    marginBottom: 0
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 15,
    color: '#111'
  },
  feedScroll: {
    height: '80%',
    width: '100%',
  },
  userVideoBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userThumbNail: {
    width: '33%',
    height: wp('30%'),
    backgroundColor: '#F4F6F9',
    margin: 0.5
  },
  feedBox: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  feedButton: {
    height: 40,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#384BF5',
    borderWidth: 1,
    borderRadius: 50,
    margin: 10,
  }, 
  feedText: {
    color: '#384BF5',
    fontWeight: 'bold'
  }
});

export default MyFeed;