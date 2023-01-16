import React from "react";
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from '../slices/searchSlice';
import Video from "react-native-video";

const SearchResult = ({ navigation }) => {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const videoUri = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  const loadingUri = "/Users/in-yeong/iykim/videoDot/src/assets/videoLoadingGif.gif";
  const hashTags = '#V #목적없이떠나는여행 #꼬막비빔밥';

  const onPressBack = () => {
    dispatch(setSearch({inputText: ''}));
    navigation.navigate('FeedHome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressBack} style={styles.back}>
          <Icon name='arrow-back-ios' type='material-icons' size={20}></Icon>
        </TouchableOpacity>
        <Text style={styles.headerText}>최신 영상</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputBox}>
          <Icon name='search' type='feather' size={20} style={styles.searchIcon}></Icon>
          <TextInput 
            placeholder="검색어를 입력해주세요." 
            style={styles.searchInput} 
            onChangeText={(text) => dispatch(setSearch({inputText: text}))} 
            value={search.inputText}
            onSubmitEditing={()=>navigation.navigate('SearchResult')}
            returnKeyType="search" />
          <TouchableOpacity onPress={() => dispatch(setSearch({inputText: ''}))}>
            <Icon 
              name='cancel' 
              type='material-icons' 
              size={18} 
              style={(search.inputText === '')? styles.hidden: styles.removeIcon} 
              color='lightgray'></Icon>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.resultContainer}
        showsVerticalScrollIndicator = {false}
        bounces={false}>
        <View style={styles.videoBox}>
          <View style={styles.userBox}>
            <View style={styles.commentUser}>
              <Image source={require('../assets/userPhoto.png')} style={styles.userImage}></Image>
              <View>
                <Text style={styles.contentTitle}>목적없이 떠나는 드라이브 VLOG</Text>
                <Text style={styles.userUploadTime}>해시태그닷 ・ 2023.01.16</Text>
              </View>
            </View>
            <Icon name='more-vertical' type='feather' size={20} color='gray'></Icon>
          </View>
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
        <View style={styles.hotBottomText}>
          <View style={styles.hashTagBox}>
            <Text style={styles.hashTag}>{hashTags}</Text>
            <Text style={[styles.hashTag, styles.searchTag]}> #남자친구</Text>
          </View>
          <View style={styles.heartBox}>
            <Icon name='heart' type='font-awesome' color='#FE646F' size={16}></Icon>
            <Text style={styles.heartText}>22</Text>
          </View>
        </View>
        <View style={styles.videoBox}>
          <View style={styles.userBox}>
            <View style={styles.commentUser}>
              <Image source={require('../assets/userPhoto.png')} style={styles.userImage}></Image>
              <View>
                <Text style={styles.contentTitle}>목적없이 떠나는 드라이브 VLOG</Text>
                <Text style={styles.userUploadTime}>해시태그닷 ・ 2023.01.16</Text>
              </View>
            </View>
            <Icon name='more-vertical' type='feather' size={20} color='gray'></Icon>
          </View>
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
        <View style={styles.hotBottomText}>
          <View style={styles.hashTagBox}>
            <Text style={styles.hashTag}>{hashTags}</Text>
            <Text style={[styles.hashTag, styles.searchTag]}> #남자친구</Text>
          </View>
          <View style={styles.heartBox}>
            <Icon name='heart' type='font-awesome' color='#FE646F' size={16}></Icon>
            <Text style={styles.heartText}>22</Text>
          </View>
        </View>
        <View style={styles.videoBox}>
          <View style={styles.userBox}>
            <View style={styles.commentUser}>
              <Image source={require('../assets/userPhoto.png')} style={styles.userImage}></Image>
              <View>
                <Text style={styles.contentTitle}>목적없이 떠나는 드라이브 VLOG</Text>
                <Text style={styles.userUploadTime}>해시태그닷 ・ 2023.01.16</Text>
              </View>
            </View>
            <Icon name='more-vertical' type='feather' size={20} color='gray'></Icon>
          </View>
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
        <View style={styles.hotBottomText}>
          <View style={styles.hashTagBox}>
            <Text style={styles.hashTag}>{hashTags}</Text>
            <Text style={[styles.hashTag, styles.searchTag]}> #남자친구</Text>
          </View>
          <View style={styles.heartBox}>
            <Icon name='heart' type='font-awesome' color='#FE646F' size={16}></Icon>
            <Text style={styles.heartText}>22</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBFD'
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 15,
    top: 17
  },
  headerText: {
    fontSize: 20
  },
  searchContainer: {
    backgroundColor: '#F4F6F9',
    height: 90
  },
  inputBox: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    alignItems: 'center'
  },
  searchInput: {
    flex: 1,
  },
  searchIcon: {
    margin: 15,
  },
  removeIcon: {
    margin: 15,
  },
  hidden: {
    display: 'none'
  },
  resultContainer: {
    backgroundColor: '#FFFBFD',
    height: '80%',
    marginBottom: 10
  },
  videoBox: {
    padding: 10
  },
  userBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comment: {
    marginLeft: 60,
    fontSize: 15
  },
  userImage: {
    width: 50,
    height: 50
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 0
  },
  userUploadTime: {
    color: 'gray',
    marginLeft: 10,
    marginTop: 3,
    fontSize: 12
  },
  video: {
    width: '100%',
    height: 230,
    backgroundColor: '#F1F4F9',
    borderRadius: 10,
  },
  hotBottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  hashTagBox: {
    flexDirection: 'row'
  },
  hashTag: {
    fontWeight: 'bold'
  },
  searchTag: {
    color: '#384BF5'
  },
  heartBox: {
    flexDirection: 'row'
  },
  heartText: {
    color: '#FE646F',
    marginLeft: 5
  },
});

export default SearchResult;