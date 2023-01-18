import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const FeedItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.newBox} activeOpacity={0.8} onPress={() => navigation.navigate('FeedDetail', item)}>
      <View style={styles.userInfo}>
        <Image source={require('../../assets/userPhoto.png')} style={styles.userImage}></Image>
        <View>
          <Text style={styles.contentTitle}>{ item.userName }</Text>
          <Text style={styles.userUploadTime}>{ item.uploadTime }</Text>
        </View>
      </View>
      <Image style={styles.video} source={{ uri: item.thumbnail }} />
      <View style={styles.hotBottomText}>
        <Text style={styles.newHashTag}>{ item.tags }</Text>
        <View style={styles.heartBox}>
          <Icon name='heart' type='font-awesome' color='#FE646F' size={16}></Icon>
          <Text style={styles.heartText}>{ item.heart }</Text>
        </View>
      </View>
      <Text style={styles.videoTitle}>{ item.title }</Text>
    </TouchableOpacity>
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
    marginBottom: 10
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

export default FeedItem;